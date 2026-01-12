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
import type {LabTest, FlagStatus} from "./types";

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
        else if (range.low !== undefined && value < range.low) {
            return "LOW";
        }
        //otherwise NORMAL :D
        return "NORMAL";
        
    }
}