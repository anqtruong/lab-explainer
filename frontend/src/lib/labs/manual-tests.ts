//Test cases for flagTest and getReason functions

import { flagTest } from "./flag";
import type { LabTest } from "./types";

const cases: LabTest[] = [
  { name: "COVID", result: { kind: "qualitative", value: "Positive" } },

  { name: "Vitamin D", result: { kind: "numeric", value: 30, unit: "ng/mL" } },
  { name: "Calcium", result: { kind: "numeric", value: 9.2, unit: "mg/dL", range: {} } },

  { name: "ALT (normal)", result: { kind: "numeric", value: 20, unit: "U/L", range: { high: 40 } } },
  { name: "ALT (high)", result: { kind: "numeric", value: 55, unit: "U/L", range: { high: 40 } } },

  { name: "eGFR (normal)", result: { kind: "numeric", value: 95, unit: "mL/min/1.73m²", range: { low: 60 } } },
  { name: "eGFR (low)", result: { kind: "numeric", value: 45, unit: "mL/min/1.73m²", range: { low: 60 } } },

  { name: "Glucose (low)", result: { kind: "numeric", value: 60, unit: "mg/dL", range: { low: 70, high: 99 } } },
  { name: "Glucose (normal)", result: { kind: "numeric", value: 85, unit: "mg/dL", range: { low: 70, high: 99 } } },
  { name: "Glucose (high)", result: { kind: "numeric", value: 110, unit: "mg/dL", range: { low: 70, high: 99 } } },

  { name: "Glucose (=low)", result: { kind: "numeric", value: 70, unit: "mg/dL", range: { low: 70, high: 99 } } },
  { name: "Glucose (=high)", result: { kind: "numeric", value: 99, unit: "mg/dL", range: { low: 70, high: 99 } } },
];

for (const t of cases) {
  const flagged = flagTest(t);
  console.log(`${flagged.test.name}: ${flagged.flag} — ${flagged.reason}`);
}
