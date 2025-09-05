export type PastIllness =
  | "rheumaticFever"
  | "bacterialEndocarditis"
  | "myocardialInfarction";

export type ChronicDisease =
  | "diabetes"
  | "addisonsDisease"
  | "hyperthyroidism"
  | "aids";

export type ImplantType =
  | "artificialValve"
  | "pacemaker"
  | "artificialHipOrKnees";

export type InfectionHistory =
  | "herpesSimplex"
  | "herpesZoster"
  | "viralInfection";

export type AllergyType = "medications" | "food" | "other";

export type BleedingDisorder =
  | "hemophilia"
  | "thrombocytopenia"
  | "leukemia"
  | "vonWillebrandDisease";

export type TuberculosisType = "pulmonary" | "otherOrgans";
export type UlcerSite = "stomach" | "duodenum";

// ===== Medical History payload that maps to your questionnaire =====
export interface MedicalHistory {
  // Epilepsy / jaundice
  epilepsy?: boolean;
  jaundice?: boolean;
  hypertension?: boolean;

  pastIllnesses?: PastIllness[];
  chronicDiseases?: ChronicDisease[];
  implants?: ImplantType[];
  infectionHistory?: InfectionHistory[];
  bleedsLongerAfterCuts?: boolean;
  bleedingDisorders?: BleedingDisorder[];

  hypercoagulableState?: boolean;
  bronchialAsthma?: boolean;

  tuberculosisHistory?: TuberculosisType[];
  pepticUlcerSites?: UlcerSite[];

  otherDiseases?: string;
  currentMedications?: string;
  surgeriesHistory?: string;

  cigarettesPerDay?: number | null;
  drinksAlcoholDaily?: boolean;
  usesDrugs?: boolean;
  _legacyNames?: Record<string, unknown>;
}

// ===== Your existing Patient model, extended with medicalHistory =====

// ===== Handy initializer for forms =====
export const emptyPatient: PatientData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  beenIll: false,

  emergencyName: "",
  emergencyPhone: "",
  emergencyRelationship: "",

  hearAboutUs: "",
  referralDetails: "",

  medicalHistory: {
    epilepsy: false,
    jaundice: false,
    hypertension: false,
    pastIllnesses: [],
    chronicDiseases: [],
    implants: [],
    infectionHistory: [],
    bleedsLongerAfterCuts: false,
    bleedingDisorders: [],
    hypercoagulableState: false,
    bronchialAsthma: false,
    tuberculosisHistory: [],
    pepticUlcerSites: [],
    otherDiseases: "",
    currentMedications: "",
    surgeriesHistory: "",
    cigarettesPerDay: 0,
    drinksAlcoholDaily: false,
    usesDrugs: false,
  },

  hipaaConsent: false,
  treatmentConsent: false,
};

export interface PatientData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  beenIll: boolean; // you can derive/keep this, or deprecate in favor of medicalHistory checks

  // Emergency Contact
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;

  // Referral Information
  hearAboutUs: string;
  referralDetails: string;

  // Medical History
  medicalHistory: MedicalHistory;

  // Consent
  hipaaConsent: boolean;
  treatmentConsent: boolean;
}
