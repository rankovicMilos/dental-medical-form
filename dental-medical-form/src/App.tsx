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
      "Contact Details",
      "Emergency Contact",
      "How You Found Us",
      "Consent & Review",
    ],
    fields: {
      firstName: "First Name *",
      lastName: "Last Name *",
      dateOfBirth: "Date of Birth *",
      gender: "Gender *",
      genderOpts: {
        empty: "Select Gender",
        male: "Male",
        female: "Female",
        other: "Other",
        prefer: "Prefer not to say",
      },
      phone: "Phone Number *",
      phonePh: "e.g., +381 63 386 382",
      email: "Email Address *",
      medicalQuestions: [
        { question: "Have you been ill with?", name: "illness1" },
        { question: "Do you have any allergies?", name: "allergies" },
        {
          question: "Are you currently taking any medications?",
          name: "medications",
        },
        {
          question: "Do you have any chronic conditions?",
          name: "chronicConditions",
        },
        { question: "Have you had any surgeries?", name: "surgeries" },
        {
          question: "Do you have any dental concerns?",
          name: "dentalConcerns",
        },
      ],
      medicalAnswers: [
        { answer: "Virus 1", name: "illness1" },
        { answer: "Virus 2", name: "illness2" },
        { answer: "Virus 3", name: "illness3" },
        { answer: "Virus 4", name: "illness4" },
        { answer: "Virus 5", name: "illness5" },
        { answer: "Virus 6", name: "illness6" },
        { answer: "Virus 7", name: "illness7" },
        { answer: "Virus 8", name: "illness8" },
        { answer: "Virus 9", name: "illness9" },
        { answer: "Virus 10", name: "illness10" },
        { answer: "Virus 11", name: "illness11" },
        { answer: "Virus 12", name: "illness12" },
        { answer: "Virus 13", name: "illness13" },
        { answer: "Virus 14", name: "illness14" },
        { answer: "Virus 15", name: "illness15" },
        { answer: "Virus 16", name: "illness16" },
        { answer: "Virus 17", name: "illness17" },
        { answer: "Virus 18", name: "illness18" },
        { answer: "Virus 19", name: "illness19" },
        { answer: "Virus 20", name: "illness20" },
        { answer: "Virus 21", name: "illness21" },
        { answer: "Virus 22", name: "illness22" },
        { answer: "Virus 23", name: "illness23" },
        { answer: "Virus 24", name: "illness24" },
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
      gender: "Pol *",
      genderOpts: {
        empty: "Izaberite pol",
        male: "Muški",
        female: "Ženski",
        other: "Drugo",
        prefer: "Ne želim da navedem",
      },
      phone: "Broj telefona *",
      phonePh: "npr. +381 63 386 382",
      email: "Email adresa *",
      medicalQuestions: [
        { question: "Da li ste bili bolesni od?", name: "illness1" },
        { question: "Da li imate alergije?", name: "allergies" },
        {
          question: "Da li trenutno uzimate neke lekove?",
          name: "medications",
        },
        {
          question: "Da li imate hronične bolesti?",
          name: "chronicConditions",
        },
        { question: "Da li ste imali operacije?", name: "surgeries" },
        {
          question: "Da li imate neke stomatološke probleme?",
          name: "dentalConcerns",
        },
      ],
      medicalAnswers: [
        { answer: "Corona-19", name: "virus1" },
        { answer: "Male boginje", name: "virus2" },
        { answer: "Ospice", name: "virus3" },
        { answer: "Rubeola", name: "virus4" },
        { answer: "Mumps", name: "virus5" },
        { answer: "Varicella", name: "virus6" },
        { answer: "Herpes Zoster", name: "virus7" },
        { answer: "Virus 8", name: "virus8" },
        { answer: "Virus 9", name: "virus9" },
        { answer: "Virus 10", name: "virus10" },
        { answer: "Virus 11", name: "virus11" },
        { answer: "Virus 12", name: "virus12" },
        { answer: "Virus 13", name: "virus13" },
        { answer: "Virus 14", name: "virus14" },
        { answer: "Virus 15", name: "virus15" },
        { answer: "Virus 16", name: "virus16" },
        { answer: "Virus 17", name: "virus17" },
        { answer: "Virus 18", name: "virus18" },
        { answer: "Virus 19", name: "virus19" },
        { answer: "Virus 20", name: "virus20" },
        { answer: "Virus 21", name: "virus21" },
        { answer: "Virus 22", name: "virus22" },
        { answer: "Virus 23", name: "virus23" },
        { answer: "Virus 24", name: "virus24" },
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

interface PatientData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  beenIll: boolean;

  // Emergency Contact
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;

  // Referral Information
  hearAboutUs: string;
  referralDetails: string;

  // Medical History - Illness checkboxes
  illnesses: {
    virus1: boolean;
    virus2: boolean;
    virus3: boolean;
    virus4: boolean;
    virus5: boolean;
    virus6: boolean;
    virus7: boolean;
    virus8: boolean;
    virus9: boolean;
    virus10: boolean;
    virus11: boolean;
    virus12: boolean;
    virus13: boolean;
    virus14: boolean;
    virus15: boolean;
    virus16: boolean;
    virus17: boolean;
    virus18: boolean;
    virus19: boolean;
    virus20: boolean;
    virus21: boolean;
    virus22: boolean;
    virus23: boolean;
    virus24: boolean;
    notIll1: boolean;
    notIll2: boolean;
    notIll3: boolean;
    notIll4: boolean;
    notIll5: boolean;
    notIll6: boolean;
    notIll7: boolean;
    notIll8: boolean;
  };

  // Consent
  hipaaConsent: boolean;
  treatmentConsent: boolean;
}

export default function ConfidentMedicalForm() {
  const [lang, setLang] = useState<Lang>("en");
  const sigCanvas = useRef(null);
  const handleClearSignature = (evn) => sigCanvas.current?.clear();
  const [formData, setFormData] = useState<PatientData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelationship: "",
    hearAboutUs: "",
    beenIll: false,
    referralDetails: "",
    illnesses: {
      virus1: false,
      virus2: false,
      virus3: false,
      virus4: false,
      virus5: false,
      virus6: false,
      virus7: false,
      virus8: false,
      virus9: false,
      virus10: false,
      virus11: false,
      virus12: false,
      virus13: false,
      virus14: false,
      virus15: false,
      virus16: false,
      virus17: false,
      virus18: false,
      virus19: false,
      virus20: false,
      virus21: false,
      virus22: false,
      virus23: false,
      virus24: false,
      notIll1: false,
      notIll2: false,
      notIll3: false,
      notIll4: false,
      notIll5: false,
      notIll6: false,
      notIll7: false,
      notIll8: false,
    },
    hipaaConsent: false,
    treatmentConsent: false,
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
      illnesses: {
        ...prev.illnesses,
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
                  gender: "",
                  phone: "",
                  email: "",
                  emergencyName: "",
                  emergencyPhone: "",
                  emergencyRelationship: "",
                  hearAboutUs: "",
                  beenIll: false,
                  referralDetails: "",
                  illnesses: {
                    virus1: false,
                    virus2: false,
                    virus3: false,
                    virus4: false,
                    virus5: false,
                    virus6: false,
                    virus7: false,
                    virus8: false,
                    virus9: false,
                    notIll1: false,
                    notIll2: false,
                    notIll3: false,
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

              {/* Contact Details */}
              <div className="conf-subsection">
                <h3 className="conf-subsection-title">{t.sections[1]}</h3>
                <div className="conf-grid">
                  {/** Virus 1 section */}
                  <div className="conf-field">
                    <label className="conf-question-label">
                      {t.fields.medicalQuestions[0].question}
                      <div className="conf-checkbox  ">
                        <input
                          id="virus-1"
                          type="checkbox"
                          name="virus1"
                          checked={formData.illnesses.virus1}
                          onChange={handleIllnessChange}
                        />
                        <label htmlFor="virus-1" className="conf-question-text">
                          {t.fields.medicalAnswers[0].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input
                          id="virus-2"
                          type="checkbox"
                          name="virus2"
                          checked={formData.illnesses.virus2}
                          onChange={handleIllnessChange}
                        />
                        <label htmlFor="virus-2" className="conf-question-text">
                          {t.fields.medicalAnswers[1].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox  ">
                        <input
                          id="virus-3"
                          type="checkbox"
                          name="virus3"
                          checked={formData.illnesses.virus3}
                          onChange={handleIllnessChange}
                        />
                        <label htmlFor="virus-3" className="conf-question-text">
                          {t.fields.medicalAnswers[2].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input
                          id="not-ill-1"
                          type="checkbox"
                          name="notIll1"
                          checked={formData.illnesses.notIll1}
                          onChange={handleIllnessChange}
                        />
                        <label
                          htmlFor="not-ill-1"
                          className="conf-question-text"
                        >
                          {t.fields.notBeenIll}
                        </label>
                      </div>
                    </label>
                  </div>
                  {/** Virus 2 section */}
                  <div className="conf-field">
                    <label className="conf-question-label">
                      {t.fields.medicalQuestions[1].question}
                      <div className="conf-checkbox">
                        <input
                          id="virus-4"
                          type="checkbox"
                          name="virus4"
                          checked={formData.illnesses.virus4}
                          onChange={handleIllnessChange}
                        />
                        <label htmlFor="virus-4" className="conf-question-text">
                          {t.fields.medicalAnswers[3].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input
                          id="virus-5"
                          type="checkbox"
                          name="virus5"
                          checked={formData.illnesses.virus5}
                          onChange={handleIllnessChange}
                        />
                        <label htmlFor="virus-5" className="conf-question-text">
                          {t.fields.medicalAnswers[4].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox ">
                        <input
                          id="virus-6"
                          type="checkbox"
                          name="virus6"
                          checked={formData.illnesses.virus6}
                          onChange={handleIllnessChange}
                        />
                        <label htmlFor="virus-6" className="conf-question-text">
                          {t.fields.medicalAnswers[5].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input
                          id="not-ill-2"
                          type="checkbox"
                          name="notIll2"
                          checked={formData.illnesses.notIll2}
                          onChange={handleIllnessChange}
                        />
                        <label
                          htmlFor="not-ill-2"
                          className="conf-question-text"
                        >
                          {t.fields.notBeenIll}
                        </label>
                      </div>
                    </label>
                  </div>

                  {/** Virus 3 section */}
                  <div className="conf-field">
                    <label className="conf-question-label">
                      {t.fields.medicalQuestions[2].question}
                      <div className="conf-checkbox  ">
                        <input
                          id="virus-7"
                          type="checkbox"
                          name="virus7"
                          checked={formData.illnesses.virus7}
                          onChange={handleIllnessChange}
                        />
                        <label htmlFor="virus-7" className="conf-question-text">
                          {t.fields.medicalAnswers[6].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox  ">
                        <input
                          id="virus-8"
                          type="checkbox"
                          name="virus8"
                          checked={formData.illnesses.virus8}
                          onChange={handleIllnessChange}
                        />
                        <label htmlFor="virus-8" className="conf-question-text">
                          {t.fields.medicalAnswers[7].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox  ">
                        <input
                          id="virus-9"
                          type="checkbox"
                          name="virus9"
                          checked={formData.illnesses.virus9}
                          onChange={handleIllnessChange}
                        />
                        <label htmlFor="virus-9" className="conf-question-text">
                          {t.fields.medicalAnswers[8].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input
                          id="not-ill-3"
                          type="checkbox"
                          name="notIll3"
                          checked={formData.illnesses.notIll3}
                          onChange={handleIllnessChange}
                        />
                        <label
                          htmlFor="not-ill-3"
                          className="conf-question-text"
                        >
                          {t.fields.notBeenIll}
                        </label>
                      </div>
                    </label>
                  </div>
                  {/** Virus 4 section */}
                  <div className="conf-field">
                    <label className="conf-question-label">
                      {t.fields.medicalQuestions[3].question}
                      <div className="conf-checkbox ">
                        <input id="virus-10" type="checkbox" value="" />
                        <label
                          htmlFor="virus-10"
                          className="conf-question-text"
                        >
                          {t.fields.medicalAnswers[9].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input id="virus-11" type="checkbox" value="" />
                        <label
                          htmlFor="virus-11"
                          className="conf-question-text"
                        >
                          {t.fields.medicalAnswers[10].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input id="virus-12" type="checkbox" value="" />
                        <label
                          htmlFor="virus-12"
                          className="conf-question-text"
                        >
                          {t.fields.medicalAnswers[11].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input id="not-ill-4" type="checkbox" value="" />
                        <label
                          htmlFor="not-ill-4"
                          className="conf-question-text"
                        >
                          {t.fields.notBeenIll}
                        </label>
                      </div>
                    </label>
                  </div>

                  {/** Virus 5 section */}
                  <div className="conf-field">
                    <label className="conf-question-label">
                      {t.fields.medicalQuestions[0].question}
                      <div className="conf-checkbox  ">
                        <input id="virus-13" type="checkbox" value="" />
                        <label
                          htmlFor="virus-13"
                          className="conf-question-text"
                        >
                          {t.fields.medicalAnswers[12].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input id="virus-14" type="checkbox" value="" />
                        <label
                          htmlFor="virus-14"
                          className="conf-question-text"
                        >
                          {t.fields.medicalAnswers[13].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox  ">
                        <input id="virus-15" type="checkbox" value="" />
                        <label
                          htmlFor="virus-15"
                          className="conf-question-text"
                        >
                          {t.fields.medicalAnswers[14].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input id="not-ill-5" type="checkbox" value="" />
                        <label
                          htmlFor="not-ill-5"
                          className="conf-question-text"
                        >
                          {t.fields.notBeenIll}
                        </label>
                      </div>
                    </label>
                  </div>
                  {/** Virus 6 section */}
                  <div className="conf-field">
                    <label className="conf-question-label">
                      {t.fields.medicalQuestions[1].question}
                      <div className="conf-checkbox">
                        <input id="virus-4" type="checkbox" value="" />
                        <label htmlFor="virus-4" className="conf-question-text">
                          {t.fields.medicalAnswers[15].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input id="virus-5" type="checkbox" value="" />
                        <label htmlFor="virus-5" className="conf-question-text">
                          {t.fields.medicalAnswers[16].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox ">
                        <input id="virus-6" type="checkbox" value="" />
                        <label htmlFor="virus-6" className="conf-question-text">
                          {t.fields.medicalAnswers[17].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input id="not-ill-6" type="checkbox" value="" />
                        <label
                          htmlFor="not-ill-6"
                          className="conf-question-text"
                        >
                          {t.fields.notBeenIll}
                        </label>
                      </div>
                    </label>
                  </div>

                  {/** Virus 7 section */}
                  <div className="conf-field">
                    <label className="conf-question-label">
                      {t.fields.medicalQuestions[2].question}
                      <div className="conf-checkbox  ">
                        <input id="virus-19" type="checkbox" value="" />
                        <label
                          htmlFor="virus-19"
                          className="conf-question-text"
                        >
                          {t.fields.medicalAnswers[18].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox  ">
                        <input id="virus-20" type="checkbox" value="" />
                        <label
                          htmlFor="virus-20"
                          className="conf-question-text"
                        >
                          {t.fields.medicalAnswers[19].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox  ">
                        <input id="virus-21" type="checkbox" value="" />
                        <label
                          htmlFor="virus-21"
                          className="conf-question-text"
                        >
                          {t.fields.medicalAnswers[20].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input id="not-ill-7" type="checkbox" value="" />
                        <label
                          htmlFor="not-ill-7"
                          className="conf-question-text"
                        >
                          {t.fields.notBeenIll}
                        </label>
                      </div>
                    </label>
                  </div>
                  {/** Virus 8 section */}
                  <div className="conf-field">
                    <label className="conf-question-label">
                      {t.fields.medicalQuestions[3].question}
                      <div className="conf-checkbox ">
                        <input id="virus-22" type="checkbox" value="" />
                        <label
                          htmlFor="virus-22"
                          className="conf-question-text"
                        >
                          {t.fields.medicalAnswers[21].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input id="virus-23" type="checkbox" value="" />
                        <label
                          htmlFor="virus-23"
                          className="conf-question-text"
                        >
                          {t.fields.medicalAnswers[22].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input id="virus-24" type="checkbox" value="" />
                        <label
                          htmlFor="virus-24"
                          className="conf-question-text"
                        >
                          {t.fields.medicalAnswers[23].answer}
                        </label>
                      </div>
                      <div className="conf-checkbox">
                        <input id="not-ill-8" type="checkbox" value="" />
                        <label
                          htmlFor="not-ill-8"
                          className="conf-question-text"
                        >
                          {t.fields.notBeenIll}
                        </label>
                      </div>
                    </label>
                  </div>
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
