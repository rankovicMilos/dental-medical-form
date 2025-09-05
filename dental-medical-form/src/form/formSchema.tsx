// src/form/formSchema.ts
export type SectionId = "personal" | "medical" | "consent";

export type QuestionId =
  | "epilepsy"
  | "jaundice"
  | "hypertension"
  | "pastIllnesses"
  | "chronicDiseases"
  | "implants"
  | "infectionHistory"
  | "cut_bleed"
  | "allergies"
  | "bleedingDisorders"
  | "blood_clot"
  | "asthma"
  | "tuberculosisHistory"
  | "pepticUlcerSites"
  | "otherDiseases"
  | "medications"
  | "surgeries"
  | "cigarettes"
  | "alcohol"
  | "drugs";

export type AnswerId =
  | "pastIllnesses_a"
  | "pastIllnesses_b"
  | "pastIllnesses_c"
  | "chronicDiseases_a"
  | "chronicDiseases_b"
  | "chronicDiseases_c"
  | "chronicDiseases_d"
  | "implants_a"
  | "implants_b"
  | "implants_c"
  | "implants_d"
  | "infectionHistory_a"
  | "infectionHistory_b"
  | "infectionHistory_c"
  | "cut_bleed"
  | "allergies_a"
  | "allergies_b"
  | "allergies_c"
  | "bleedingDisorders_a"
  | "bleedingDisorders_b"
  | "bleedingDisorders_c"
  | "bleedingDisorders_d"
  | "tuberculosisHistory_a"
  | "tuberculosisHistory_b"
  | "pepticUlcerSites_a"
  | "pepticUlcerSites_b"
  | "otherDiseases"
  | "medications"
  | "surgeries"
  | "cigarettes"
  | "alcohol"
  | "drugs";

export type FieldId =
  | "firstName"
  | "lastName"
  | "dateOfBirth"
  | "phone"
  | "email"
  | "details";

export type Field = {
  id: FieldId;
  type: "text" | "date" | "tel" | "email" | "textarea" | "number" | "checkbox";
  required?: boolean;
  placeholderKey?: string; // e.g., fields.phone.placeholder
};

export type Question =
  | {
      id: QuestionId;
      type: "multi"; // checkbox group
      answerIds: AnswerId[];
      required?: boolean;
    }
  | {
      id: QuestionId;
      type: "single"; // radio group
      answerIds: AnswerId[];
      required?: boolean;
    }
  | {
      id: QuestionId;
      type: "boolean" | "text" | "number";
      required?: boolean;
    };

export const sections: {
  id: SectionId;
  questionIds: QuestionId[];
  fieldIds?: FieldId[];
}[] = [
  {
    id: "personal",
    questionIds: [],
    fieldIds: [
      "firstName",
      "lastName",
      "dateOfBirth",
      "phone",
      "email",
      "details",
    ],
  },
  {
    id: "medical",
    questionIds: [
      "epilepsy",
      "jaundice",
      "hypertension",
      "pastIllnesses",
      "chronicDiseases",
      "implants",
      "infectionHistory",
      "cut_bleed",
      "allergies",
      "bleedingDisorders",
      "blood_clot",
      "asthma",
      "tuberculosisHistory",
      "pepticUlcerSites",
      "otherDiseases",
      "medications",
      "surgeries",
      "cigarettes",
      "alcohol",
      "drugs",
    ],
  },
  {
    id: "consent",
    questionIds: [],
  },
] as const;

export const fields: Field[] = [
  { id: "firstName", type: "text", required: true },
  { id: "lastName", type: "text", required: true },
  { id: "dateOfBirth", type: "date", required: true },
  {
    id: "phone",
    type: "tel",
    required: true,
    placeholderKey: "fields.phone.placeholder",
  },
  { id: "email", type: "email", required: true },
];

export const questions: Question[] = [
  {
    id: "epilepsy",
    type: "boolean",
  },
  {
    id: "jaundice",
    type: "boolean",
  },
  {
    id: "hypertension",
    type: "boolean",
  },
  {
    id: "pastIllnesses",
    type: "multi",
    answerIds: ["pastIllnesses_a", "pastIllnesses_b", "pastIllnesses_c"],
  },
  {
    id: "chronicDiseases",
    type: "multi",
    answerIds: [
      "chronicDiseases_a",
      "chronicDiseases_b",
      "chronicDiseases_c",
      "chronicDiseases_d",
    ],
  },
  {
    id: "implants",
    type: "multi",
    answerIds: ["implants_a", "implants_b", "implants_c", "implants_d"],
  },
  {
    id: "infectionHistory",
    type: "multi",
    answerIds: [
      "infectionHistory_a",
      "infectionHistory_b",
      "infectionHistory_c",
    ],
  },
  { id: "cut_bleed", type: "boolean" },
  {
    id: "allergies",
    type: "multi",
    answerIds: ["allergies_a", "allergies_b", "allergies_c"],
  },
  {
    id: "bleedingDisorders",
    type: "multi",
    answerIds: [
      "bleedingDisorders_a",
      "bleedingDisorders_b",
      "bleedingDisorders_c",
      "bleedingDisorders_d",
    ],
  },
  { id: "blood_clot", type: "boolean" },
  { id: "asthma", type: "boolean" },
  {
    id: "tuberculosisHistory",
    type: "multi",
    answerIds: ["tuberculosisHistory_a", "tuberculosisHistory_b"],
  },
  {
    id: "pepticUlcerSites",
    type: "single",
    answerIds: ["pepticUlcerSites_a", "pepticUlcerSites_b"],
  },
  { id: "otherDiseases", type: "text" },
  { id: "medications", type: "text" },
  { id: "surgeries", type: "text" },
  { id: "cigarettes", type: "number" },
  { id: "alcohol", type: "boolean" },
  { id: "drugs", type: "boolean" },
];
