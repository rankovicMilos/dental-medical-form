import { CheckCircle } from "lucide-react";
import logo from "./assets/confident.svg";
import { useRef, useState } from "react";
import "./App.css";
import Signature from "@uiw/react-signature";

/* TODO
  - Make the illness checkboxes controlled components
  - Add form validation and error handling
  - Check if only one checkbox per illness question can be selected
  */

type Lang = "en" | "sr";
const translations: Record<Lang, any> = {
  en: {
    brand: "ConfiDental",
    headerTitle: "Patient Medical Form",
    subtitle: "Please fill out all required information",
    step: "Step",
    of: "of",
    percent: "Complete",
    sections: [
      "Personal Information",
      "Medical Details",
      "Emergency Contact",
      "How You Found Us",
      "Consent & Review",
    ],
    fields: {
      firstName: "First Name *",
      lastName: "Last Name *",
      dateOfBirth: "Date of Birth *",
      phone: "Phone Number *",
      phonePh: "e.g., +381 63 386 382",
      email: "Email Address *",
      medicalQuestions: [
        {
          question: "",
          name: "epilepsy-jaundice",
          answers: [
            { answer: "I suffer from epilepsy", name: "epilepsy" },
            { answer: "I had jaundice", name: "jaundice" },
            { answer: "I have high blood pressure", name: "hypertension" },
          ],
        },
        { question: "I had?", name: "illness1", answers: [] },
        {
          question: "I had?",
          name: "illness1",
          answers: [
            { answer: "Rheumatic fever", name: "illness1-a" },
            { answer: "Bacterial endocarditis", name: "illness1-b" },
            {
              answer: "Myocardial infarction (heart attack)",
              name: "illness1-c",
            },
          ],
        },
        {
          question: "I suffer from",
          name: "illness2",
          answers: [
            { answer: "Diabetes", name: "illness2-a" },
            { answer: "Addison's disease", name: "illness2-b" },
            { answer: "Hyperthyroidism", name: "illness2-c" },
            { answer: "AIDS", name: "illness2-d" },
          ],
        },
        {
          question: "I have an implant",
          name: "implants",
          answers: [
            { answer: "Artificial heart valve", name: "implants-a" },
            { answer: "Pacemaker", name: "implants-b" },
            { answer: "Artificial hip/artificial knees", name: "implants-c" },
            { answer: "AIDS", name: "implants-d" },
          ],
        },
        {
          question: "I had",
          name: "illness3",
          answers: [
            { answer: "Herpes simplex", name: "illness3-a" },
            { answer: "Herpes zoster (shingles)", name: "illness3-b" },
            { answer: "Viral infection", name: "illness3-c" },
          ],
        },
        { question: "I bleed longer after cuts", name: "cut-bleed" },
        {
          question: "I am allergic to",
          name: "alergies",
          answers: [
            { answer: "Medications", name: "alergies-a" },
            { answer: "Food", name: "alergies-b" },
            { answer: "Other", name: "alergies-c" },
          ],
        },
        {
          question: "I suffer from",
          name: "illness4",
          answers: [
            { answer: "Hemophilia", name: "illness4-a" },
            { answer: "Thrombocytopenia", name: "illness4-b" },
            { answer: "Leukemia", name: "illness4-c" },
            { answer: "Von Willebrand disease", name: "illness4-d" },
          ],
        },
        {
          question: "I suffer from excessive blood clotting",
          name: "blood-cloth",
        },
        { question: "I suffer from bronchial asthma", name: "asthma" },
        {
          question: "I had",
          name: "illness5",
          answers: [
            { answer: "Pulmonary tuberculosis", name: "illness5-a" },
            { answer: "Tuberculosis of other organs", name: "illness5-b" },
          ],
        },
        {
          question: "I suffer from an ulcer of the",
          name: "illness6",
          answers: [
            { answer: "Stomach", name: "illness6-a" },
            { answer: "Duodenum", name: "illness6-b" },
          ],
        },
        {
          question: "I suffer from diseases not listed in this questionnaire?",
          name: "illness7",
        },
        {
          question: "I am currently taking the following medications:",
          name: "medications",
        },
        {
          question: "",
          name: "illness8",
          answer: "So far I have had surgeries:",
        },
        {
          question: "",
          name: "cigarettes",
          answer: "I smoke ____ cigarettes per day",
        },
        {
          question: "",
          name: "alcohol",
          answer: "I drink alcohol daily",
        },
        {
          question: "",
          name: "drugs",
          answer: "I use drugs",
        },
      ],

      notBeenIll: "I have not been ill",
      hearQ: "How did you hear about our clinic? *",
      hearOpts: {
        empty: "Select an option",
        fam: "Friend or Family Referral",
        google: "Google Search",
        social: "Social Media",
        insurance: "Insurance Provider",
        yellow: "Yellow Pages",
        newspaper: "Newspaper",
        radio: "Radio",
        drove: "Drove By",
        other: "Other",
      },
      details: "Additional Details (Optional)",
      detailsPh: "Provide any additional details...",
    },
    review: {
      title: "Review Your Information",
      name: "Name",
      dob: "Date of Birth",
      phone: "Phone",
      email: "Email",
      emergency: "Emergency Contact",
      heard: "Heard About Us",
    },
    consent: {
      hipaa:
        "I acknowledge that I have received and understand the HIPAA Privacy Notice and consent to the use and disclosure of my protected health information for treatment, payment, and healthcare operations.",
      treatment:
        "I consent to examination and treatment by the dentist and understand that no guarantee has been made regarding the outcome of treatment.",
    },
    success: {
      title: "Thank You!",
      text: "Your information has been submitted successfully. Please have a seat and we'll call you shortly.",
      newForm: "New form",
    },
    buttons: { prev: "Previous", next: "Next", submit: "Submit Form" },
    langs: { en: "EN", sr: "SR" },
  },
  sr: {
    brand: "ConfiDental",
    headerTitle: "Formular za prijem pacijenta",
    subtitle: "Molimo popunite obavezna polja",
    step: "Korak",
    of: "od",
    percent: "",
    sections: [
      "Lični podaci",
      "Kontakt podaci",
      "Kontakt za hitne slučajeve",
      "Kako ste čuli za nas",
      "Saglasnost i pregled",
    ],
    fields: {
      firstName: "Ime *",
      lastName: "Prezime *",
      dateOfBirth: "Datum rođenja *",
      phone: "Broj telefona *",
      phonePh: "npr. +381 63 386 382",
      email: "Email adresa *",
      medicalQuestions: [
        {
          question: "",
          name: "epilepsy",
          answers: [
            { answer: "Bolujem od epilepsije", name: "epilepsy" },
            { answer: "Prelezao/la sam zuticu", name: "jaundice" },
          ],
        },
        {
          question: "Prelezao/la sam?",
          name: "illness1",
          answers: [
            { answer: "Reumatsku goroznicu", name: "illness1-a" },
            { answer: "Bakterijski endokardit", name: "illness1-b" },
            { answer: "Infarkt miokarda", name: "illness1-c" },
          ],
        },
        {
          question: "Bolujem od",
          name: "illness2",
          answers: [
            { answer: "Dijabetesa", name: "illness2-a" },
            { answer: "Adisonove bolesti", name: "illness2-b" },
            { answer: "Hipertireoze", name: "illness2-c" },
            { answer: "Od side (AIDS)", name: "illness2-d" },
          ],
        },
        {
          question: "Imam ugradjen",
          name: "implants",
          answers: [
            { answer: "Veštački zalistak", name: "implants-a" },
            { answer: "Pace maker", name: "implants-b" },
            { answer: "Veštački kuk/ veštačka kolena", name: "implants-c" },
            { answer: "Od side (AIDS)", name: "implants-d" },
          ],
        },
        {
          question: "Prelezao/la sam",
          name: "illness3",
          answers: [
            { answer: "Herpes simplex", name: "illness3-a" },
            { answer: "Herpes zoster", name: "illness3-b" },
            { answer: "virusnu infekciju", name: "illness3-c" },
          ],
        },
        { question: "Duze krvarim posle posekotine", name: "cut-bleed" },
        {
          question: "Alergican/na sam na",
          name: "alergies",
          answers: [
            { answer: "Lekove", name: "alergies-a" },
            { answer: "Hranu", name: "alergies-b" },
            { answer: "Ostalo", name: "alergies-c" },
          ],
        },
        {
          question: "Bolujem od ",
          name: "illness4",
          answers: [
            { answer: "Hemofilije", name: "illness4-a" },
            { answer: "Trombocitopenije", name: "illness4-b" },
            { answer: "Leukemije", name: "illness4-c" },
            { answer: "Von Willebrandove bolesti", name: "illness4-d" },
          ],
        },
        {
          question: "Bolujem od prekomernog zgrušavanja krvi",
          name: "blood-cloth",
        },
        { question: "Bolujem od bronhijalne astme", name: "asthma" },
        {
          question: "Prelezeo/la sam",
          name: "illness5",
          answers: [
            { answer: "TBC pluca", name: "illness5-a" },
            { answer: "drugih organa", name: "illness5-b" },
          ],
        },
        {
          question: "Bolujem od cira na",
          name: "illness6",
          answers: [
            { answer: "želucu", name: "illness6-a" },
            { answer: "dvanaestopalačnom crevu", name: "illness6-b" },
          ],
        },
        {
          question: "Bolujem od bolesti koje nisu navedene u upitniku?",
          name: "illness7",
        },
        {
          question: "Trenutno uzimam sledece lekove:",
          name: "medications",
        },
        {
          question: "",
          name: "illness8",
          answer: "Do sada sam imao/la operacije:",
        },
        {
          question: "",
          name: "cigarettes",
          answer: "Pušim ____ cigareta dnevno",
        },
        {
          question: "",
          name: "alcohol",
          answer: "Svakodnevno pijem alkohol",
        },
        {
          question: "",
          name: "drugs",
          answer: "Uzimam drogu",
        },
      ],
      notBeenIll: "Niste bili bolesni",
      hearQ: "Kako ste čuli za našu kliniku? *",
      hearOpts: {
        empty: "Izaberite opciju",
        fam: "Preporuka prijatelja ili porodice",
        google: "Pretraga na Google-u",
        social: "Društvene mreže",
        insurance: "Preko osiguranja",
        yellow: "Žute stranice",
        newspaper: "Novine",
        radio: "Radio",
        drove: "Prolazeći pored ordinacije",
        other: "Drugo",
      },
      details: "Dodatni detalji (opciono)",
      detailsPh: "Unesite dodatne informacije...",
    },
    review: {
      title: "Proverite vaše podatke",
      name: "Ime i prezime",
      dob: "Datum rođenja",
      phone: "Telefon",
      email: "Email",
      emergency: "Kontakt za hitne slučajeve",
      heard: "Kako ste čuli za nas",
    },
    consent: {
      hipaa:
        "Potvrđujem da sam primio/la i razumem HIPAA obaveštenje o privatnosti i dajem saglasnost za upotrebu i otkrivanje mojih zdravstvenih podataka u svrhe lečenja, plaćanja i rada zdravstvene ustanove.",
      treatment:
        "Dajem saglasnost za pregled i lečenje od strane stomatologa i razumem da ne postoji garancija ishoda lečenja.",
    },
    success: {
      title: "Hvala vam!",
      text: "Vaši podaci su uspešno poslati. Molimo vas, sačekajte — pozvaćemo vas uskoro.",
      newForm: "Novi formular",
    },
    buttons: { prev: "Prethodno", next: "Sledeće", submit: "Pošalji formular" },
    langs: { en: "EN", sr: "SR" },
  },
};

// ===== Enums / literal union types for stable options =====
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
  jaundiceHistory?: boolean;
  hypertension?: boolean;

  // Past illnesses (checkbox group: I had…)
  pastIllnesses?: PastIllness[]; // e.g., ["rheumaticFever", "myocardialInfarction"]

  // Ongoing conditions (checkbox group: I suffer from…)
  chronicDiseases?: ChronicDisease[]; // e.g., ["diabetes", "aids"]

  // Implants (checkbox group: I have an implant…)
  implants?: ImplantType[]; // e.g., ["pacemaker"]

  // Infections you previously had (checkbox group: I had…)
  infectionHistory?: InfectionHistory[]; // e.g., ["herpesZoster"]

  // Bleeding & coagulation
  bleedsLongerAfterCuts?: boolean;
  bleedingDisorders?: BleedingDisorder[]; // e.g., ["hemophilia"]
  hypercoagulableState?: boolean; // “I suffer from excessive blood clotting”

  // Respiratory
  bronchialAsthma?: boolean;

  // Tuberculosis
  tuberculosisHistory?: TuberculosisType[]; // e.g., ["pulmonary"]

  // Peptic ulcer site
  pepticUlcerSites?: UlcerSite[]; // e.g., ["duodenum"]

  // Free-text fields
  otherDiseases?: string; // “Diseases not listed…”
  currentMedications?: string; // “I am currently taking…”
  surgeriesHistory?: string; // “So far I have had surgeries:”

  // Lifestyle
  cigarettesPerDay?: number | null; // e.g., 0 if non-smoker, null if unknown
  drinksAlcoholDaily?: boolean;
  usesDrugs?: boolean;

  // Raw field-name mapping (optional): keep compatibility with original keys if needed
  // For example, to map UI components that still rely on legacy names.
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
    jaundiceHistory: false,
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
    cigarettesPerDay: null,
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

export default function ConfidentMedicalForm() {
  const [lang, setLang] = useState<Lang>("en");
  const sigCanvas = useRef(null);
  const handleClearSignature = (evn) => sigCanvas.current?.clear();
  const [formData, setFormData] = useState<PatientData>({
    ...emptyPatient,
  });

  const t = translations[lang];

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handler specifically for illness checkboxes
  const handleIllnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real submit
    console.log("Patient data submitted:", { lang, ...formData });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="conf-wrapper" data-lang={lang}>
        <div className="conf-container">
          <div className="conf-card conf-center">
            <div className="conf-success-circle">
              <CheckCircle size={40} />
            </div>
            <h2 className="conf-title">{t.success.title}</h2>
            <p className="conf-text">{t.success.text}</p>
            <button
              className="btn btn-primary button primary-btn conf-btn conf-btn-primary"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  firstName: "",
                  lastName: "",
                  dateOfBirth: "",
                  phone: "",
                  email: "",
                  emergencyName: "",
                  emergencyPhone: "",
                  emergencyRelationship: "",
                  hearAboutUs: "",
                  beenIll: false,
                  referralDetails: "",
                  medicalHistory: {
                    epilepsy: false,
                    jaundiceHistory: false,
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
                    cigarettesPerDay: null,
                    drinksAlcoholDaily: false,
                    usesDrugs: false,
                  },
                  hipaaConsent: false,
                  treatmentConsent: false,
                });
              }}
            >
              {t.success.newForm}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="confident-intake-root">
      <div className="conf-wrapper" data-lang={lang}>
        <div className="conf-container">
          {/* Header */}
          <div className="conf-card conf-header">
            <div>
              <h1 className="conf-title">{t.headerTitle}</h1>
              <p className="conf-subtitle">{t.subtitle}</p>
            </div>
            <div className="conf-header-right">
              <img src={logo} alt="Confident Logo" className="h-8" />
              <div
                className="conf-lang-switch"
                role="group"
                aria-label="Language switch"
              >
                <button
                  type="button"
                  className={`conf-lang-btn ${
                    lang === "en" ? "is-active" : ""
                  }`}
                  aria-pressed={lang === "en"}
                  onClick={() => setLang("en")}
                >
                  {t.langs.en}
                </button>
                <button
                  type="button"
                  className={`conf-lang-btn ${
                    lang === "sr" ? "is-active" : ""
                  }`}
                  aria-pressed={lang === "sr"}
                  onClick={() => setLang("sr")}
                >
                  {t.langs.sr}
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="conf-card conf-form">
            {/* Single Combined Section */}
            <div className="conf-section">
              <div className="conf-section-head">
                <h2 className="conf-section-title">{t.headerTitle}</h2>
              </div>

              {/* Personal Information */}
              <div className="conf-subsection">
                <h3 className="conf-subsection-title">{t.sections[0]}</h3>
                <div className="conf-grid">
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.firstName}</label>
                    <input
                      className="conf-input"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.lastName}</label>
                    <input
                      className="conf-input"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.dateOfBirth}</label>
                    <input
                      className="conf-input"
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.email}</label>
                    <input
                      className="conf-input"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Medical Details */}
              <div className="conf-subsection">
                <h3 className="conf-subsection-title">{t.sections[1]}</h3>
                <div className="conf-grid">
                  {/** Questions 1 */}
                  <div className="flex flex-col gap-4">
                    <div className="conf-field">
                      <div className="conf-checkbox  ">
                        <input
                          id="epilepsy"
                          type="checkbox"
                          name="epilepsy"
                          checked={formData.medicalHistory.epilepsy}
                          onChange={handleIllnessChange}
                        />
                        <label
                          htmlFor="epilepsy"
                          className="conf-question-text"
                        >
                          {t.fields.medicalQuestions[0].answers[0].answer}
                        </label>
                      </div>
                    </div>
                    <div className="conf-field">
                      <div className="conf-checkbox">
                        <input
                          id="jaundice"
                          type="checkbox"
                          name="jaundice"
                          checked={formData.medicalHistory.jaundiceHistory}
                          onChange={handleIllnessChange}
                        />
                        <label
                          htmlFor="jaundice"
                          className="conf-question-text"
                        >
                          {t.fields.medicalQuestions[0].answers[1].answer}
                        </label>
                      </div>
                    </div>
                    <div className="conf-field">
                      <div className="conf-checkbox">
                        <input
                          id="hypertension"
                          type="checkbox"
                          name="hypertension"
                          checked={formData.medicalHistory.hypertension}
                          onChange={handleIllnessChange}
                        />
                        <label
                          htmlFor="jaundice"
                          className="conf-question-text"
                        >
                          {t.fields.medicalQuestions[0].answers[2].answer}
                        </label>
                      </div>
                    </div>
                  </div>

                  {/** Questions 2 */}
                  <div className="flex flex-col gap-4">
                    <div className="conf-field">
                      <label className="conf-question-text">
                        {t.fields.medicalQuestions[1].question}
                      </label>
                      {t.fields.medicalQuestions[1].answers.map(
                        (answer, index) => (
                          <div className="conf-checkbox" key={index}>
                            <input
                              id={`medical-question-1-answer-${index}`}
                              type="checkbox"
                              name={`medical-question-1-answer-${index}`}
                              checked={
                                formData.medicalHistory[
                                  `medical-question-1-answer-${index}`
                                ]
                              }
                              onChange={handleIllnessChange}
                            />
                            <label
                              htmlFor={`medical-question-1-answer-${index}`}
                              className="conf-question-text"
                            >
                              {answer.answer}
                            </label>
                          </div>
                        )
                      )}
                      <div className="conf-checkbox  "></div>
                    </div>
                  </div>
                  <div className="conf-checkbox  "></div>
                </div>
              </div>

              {/* Consent & Review */}
              <div className="conf-subsection">
                <h3 className="conf-subsection-title">{t.sections[4]}</h3>

                <div className="conf-consent">
                  <label className="conf-checkbox">
                    <input
                      type="checkbox"
                      name="hipaaConsent"
                      checked={formData.hipaaConsent}
                      onChange={handleInputChange}
                      required
                    />
                    <span>{t.consent.hipaa}</span>
                  </label>

                  <label className="conf-checkbox">
                    <input
                      type="checkbox"
                      name="treatmentConsent"
                      checked={formData.treatmentConsent}
                      onChange={handleInputChange}
                      required
                    />
                    <span>{t.consent.treatment}</span>
                  </label>
                </div>

                <div className="conf-signature-container">
                  <div className="conf-signature">
                    <Signature
                      ref={sigCanvas}
                      options={{
                        size: 3,
                        smoothing: 0.46,
                        thinning: 0.73,
                        streamline: 0.5,
                        start: {
                          taper: 0,
                          cap: true,
                        },
                        end: {
                          taper: 0,
                          cap: true,
                        },
                      }}
                    />
                    <br />
                  </div>
                  <button
                    type="button"
                    className="conf-btn conf-btn-dark"
                    onClick={handleClearSignature}
                  >
                    Clear
                  </button>
                </div>
              </div>
              {/* Submit Button */}
              <div className="conf-actions">
                <button
                  type="submit"
                  className="btn btn-primary button primary-btn conf-btn conf-btn-primary conf-btn-lg"
                >
                  {t.buttons.submit}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
