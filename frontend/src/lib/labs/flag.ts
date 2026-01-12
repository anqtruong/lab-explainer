//GOAL: Correctly flag lab test results based on reference ranges.
/*

For now, we will mark Qualitative results as UNKNOWN
If numeric result has no reference range, we will also mark it as UNKNOWN

If range exists:
If high exists and value > high => HIGH
If low exists and value < low => LOW
Otherwise NORMAL

If range has no bounds, we will mark it as UNKNOWN

*/
//Import types LabTest and FlagStatus from types.ts
import type {LabTest, FlagStatus, FlaggedLabReport, FlaggedLabTest} from "./types";

export function getFlagStatus(test: LabTest): FlagStatus {

    //LabTest is either qualitative or numeric
    if (test.result.kind === "qualitative") return "UNKNOWN";
    
    //If this line is reached, test is numeric.

    const range = test.result.range;
    const value = test.result.value;

    //no range provided, return UNKNOWN
    if (!range) return "UNKNOWN";
    //range exists but no bounds, return UNKNOWN
    else if (range.high == undefined && range.low == undefined) return "UNKNOWN";

    else {
        //range exists and result > high => HIGH
        if (range.high !== undefined && value > range.high) {
            return "HIGH";
        }
        //range exists and result < low => LOW
        if (range.low !== undefined && value < range.low) {
            return "LOW";
        }
        //otherwise NORMAL :D
        return "NORMAL";
    }
}
/*
Flagged Lab Test:
test: LabTest;
flag: FlagStatus;
reason: string;
*/
export function getReason(FlaggedTest: FlaggedLabTest): string {//TODO: clean up reasoning for each flag for consistency

    //TODO: add support for qualitative results
    //Reasoning for qualitative flag
    if (FlaggedTest.test.result.kind === "qualitative") return "Qualitative result cannot be compared to a numeric reference range.";

    //If this line is reached, test is numeric.
    const range = FlaggedTest.test.result.range;
    const value = FlaggedTest.test.result.value;
    const unit = FlaggedTest.test.result.unit;
    const flag = FlaggedTest.flag;

    //Unknown flags
    if (flag === "UNKNOWN") {
        if (!range) {
            return "No reference range was provided for this test.";
        }
        if (range.low === undefined && range.high === undefined) {
            return "No reference range bounds were provided for this test.";
        }
    }
    
    /*
    COMPLETED:
    If flag == UNKNOWN 
    If flag == HIGH
    If flag == LOW  
    If flag == NORMAL
    */
    else {

    if (flag === "HIGH") {
        return `The result of ${value} ${unit} is higher than the reference high of ${range.high} ${unit}.`;
    }

    if (flag === "LOW") {
        return `The result of ${value} ${unit} is lower than the reference low of ${range.low} ${unit}.`;
    }

    if (flag === "NORMAL" && range.low !== undefined && range.high === undefined) return `${value} ${unit} is at or above the lower bound of ${range.low} ${unit}.`;
    if (flag === "NORMAL" && range.high !== undefined && range.low === undefined) return `${value} ${unit} is at or below the upper bound of ${range.high} ${unit}.`;
    if (flag === "NORMAL") return `The result of ${value} ${unit} is within the reference range.`;
    }

    return "Insufficient reference range information to determine test status.";
}
/*
Flagged
*/
export function flagTest(test: LabTest): FlaggedLabTest {

    const flag = getFlagStatus(test);

    const FlaggedTest: FlaggedLabTest = {
        test: test,
        flag: flag,
        reason: "",
    }

    const reason = getReason(FlaggedTest);
    FlaggedTest.reason = reason;

    return FlaggedTest;
}
//TODO: implement flagTests to handle array of LabTests
export function flagTests(test: LabTest[]): FlaggedLabReport {
    
}