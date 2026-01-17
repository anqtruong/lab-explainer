//Parameters for handling lab data

/*
Each test contains a:
name, result

Numeric Results:
-value
-unit
-optional reference range (high/low)

Qualitative Results:
-value (Positive/Negative)
-CANNOT have reference units, reference ranges

TODO: standardize units across different labs (e.g., mg/dL vs mmol/L)
*/ 

export type LabTest = {
    name: string;
    result: LabResult; 
}

export type FlaggedLabTest = {
    test: LabTest;
    flag: FlagStatus;
    reason: string;
}

export type FlaggedLabReport = {
    tests: FlaggedLabTest[];//array of flagged lab tests!
}

export type LabResult = QualitativeResult | NumericResult;

type QualitativeResult = {
    kind: "qualitative";
    value: QualitativeValue;
}
export type QualitativeValue = Present | Absent | "UNKNOWN";
export type QualitativeType = "Present" | "Absent" | "UNKNOWN";



export type NumericResult = {
    kind: "numeric";
    value: number;
    unit: string;
    range?: ReferenceRange;
}

//not all tests have reference ranges, hence we make it optional.
export type ReferenceRange = {
    high?: number;
    low?: number;
}



export type FlagStatus = QualitativeFlag | NumericFlag;
export type QualitativeFlag = Present | Absent | "UNKNOWN";
export type Present = "Positive" | "Detected" | "Reactive" | "Present";
export type Absent = "Negative" | "Not Detected" | "Non-Reactive" | "Absent";
export type NumericFlag = "HIGH" | "LOW" | "NORMAL" | "UNKNOWN";
