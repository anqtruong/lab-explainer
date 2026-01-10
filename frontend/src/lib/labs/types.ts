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

type LabTest = {
    name: string;
    result: LabResult; 
}

type LabResult = NumericResult | QualitativeResult;

type NumericResult = {
    kind: "numeric";
    value: number;
    unit: string;
    range?: ReferenceRange;
}

type QualitativeValue = "Positive" | "Negative" | "Detected" | "Not Detected";

type QualitativeResult = {
    kind: "qualitative";
    value: QualitativeValue; //Positive or Negative
}

//not all tests have reference ranges, hence we make it optional.
type ReferenceRange = {
    high?: number;
    low?: number;
}
