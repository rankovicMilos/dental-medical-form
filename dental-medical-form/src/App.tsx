import { CheckCircle } from "lucide-react";
import i18n from "./i18n";
import logo from "./assets/confident.svg";
import { useState } from "react";
import "./App.css";
import { FormRenderer } from "./form/FormRenderer";
import { useTranslation } from "react-i18next";
/* TODO
  - Make the illness checkboxes controlled components
  - Add form validation and error handling
  - Check if only one checkbox per illness question can be selected
  */

type Lang = "en" | "rs";

//     brand: "ConfiDental",
//     headerTitle: "Patient Medical Form",
//     subtitle: "Please fill out all required information",
//     step: "Step",
//     of: "of",
//     percent: "Complete",
//     sections: [
//       "Personal Information",
//       "Medical Details",
//       "Emergency Contact",
//       "How You Found Us",
//       "Consent & Review",
//     ],
//     fields: {
//       firstName: "First Name *",
//       lastName: "Last Name *",
//       dateOfBirth: "Date of Birth *",
//       phone: "Phone Number *",
//       phonePh: "e.g., +381 63 386 382",
//       email: "Email Address *",
//       medicalQuestions: [
//         {
//           question: "",
//           name: "epilepsy-jaundice",
//           answers: [
//             { answer: "I suffer from epilepsy", name: "epilepsy" },
//             { answer: "I had jaundice", name: "jaundice" },
//             { answer: "I have high blood pressure", name: "hypertension" },
//           ],
//         },
//         { question: "I had?", name: "illness1", answers: [] },
//         {
//           question: "I had?",
//           name: "illness1",
//           answers: [
//             { answer: "Rheumatic fever", name: "illness1-a" },
//             { answer: "Bacterial endocarditis", name: "illness1-b" },
//             {
//               answer: "Myocardial infarction (heart attack)",
//               name: "illness1-c",
//             },
//           ],
//         },
//         {
//           question: "I suffer from",
//           name: "illness2",
//           answers: [
//             { answer: "Diabetes", name: "illness2-a" },
//             { answer: "Addison's disease", name: "illness2-b" },
//             { answer: "Hyperthyroidism", name: "illness2-c" },
//             { answer: "AIDS", name: "illness2-d" },
//           ],
//         },
//         {
//           question: "I have an implant",
//           name: "implants",
//           answers: [
//             { answer: "Artificial heart valve", name: "implants-a" },
//             { answer: "Pacemaker", name: "implants-b" },
//             { answer: "Artificial hip/artificial knees", name: "implants-c" },
//             { answer: "AIDS", name: "implants-d" },
//           ],
//         },
//         {
//           question: "I had",
//           name: "illness3",
//           answers: [
//             { answer: "Herpes simplex", name: "illness3-a" },
//             { answer: "Herpes zoster (shingles)", name: "illness3-b" },
//             { answer: "Viral infection", name: "illness3-c" },
//           ],
//         },
//         { question: "I bleed longer after cuts", name: "cut-bleed" },
//         {
//           question: "I am allergic to",
//           name: "alergies",
//           answers: [
//             { answer: "Medications", name: "alergies-a" },
//             { answer: "Food", name: "alergies-b" },
//             { answer: "Other", name: "alergies-c" },
//           ],
//         },
//         {
//           question: "I suffer from",
//           name: "illness4",
//           answers: [
//             { answer: "Hemophilia", name: "illness4-a" },
//             { answer: "Thrombocytopenia", name: "illness4-b" },
//             { answer: "Leukemia", name: "illness4-c" },
//             { answer: "Von Willebrand disease", name: "illness4-d" },
//           ],
//         },
//         {
//           question: "I suffer from excessive blood clotting",
//           name: "blood-cloth",
//         },
//         { question: "I suffer from bronchial asthma", name: "asthma" },
//         {
//           question: "I had",
//           name: "illness5",
//           answers: [
//             { answer: "Pulmonary tuberculosis", name: "illness5-a" },
//             { answer: "Tuberculosis of other organs", name: "illness5-b" },
//           ],
//         },
//         {
//           question: "I suffer from an ulcer of the",
//           name: "illness6",
//           answers: [
//             { answer: "Stomach", name: "illness6-a" },
//             { answer: "Duodenum", name: "illness6-b" },
//           ],
//         },
//         {
//           question: "I suffer from diseases not listed in this questionnaire?",
//           name: "illness7",
//         },
//         {
//           question: "I am currently taking the following medications:",
//           name: "medications",
//         },
//         {
//           question: "",
//           name: "illness8",
//           answer: "So far I have had surgeries:",
//         },
//         {
//           question: "",
//           name: "cigarettes",
//           answer: "I smoke ____ cigarettes per day",
//         },
//         {
//           question: "",
//           name: "alcohol",
//           answer: "I drink alcohol daily",
//         },
//         {
//           question: "",
//           name: "drugs",
//           answer: "I use drugs",
//         },
//       ],

//       notBeenIll: "I have not been ill",

//       details: "Additional Details (Optional)",
//       detailsPh: "Provide any additional details...",
//     },
//     review: {
//       title: "Review Your Information",
//       name: "Name",
//       dob: "Date of Birth",
//       phone: "Phone",
//       email: "Email",
//       emergency: "Emergency Contact",
//       heard: "Heard About Us",
//     },
//     consent: {
//       hipaa:
//         "I acknowledge that I have received and understand the HIPAA Privacy Notice and consent to the use and disclosure of my protected health information for treatment, payment, and healthcare operations.",
//       treatment:
//         "I consent to examination and treatment by the dentist and understand that no guarantee has been made regarding the outcome of treatment.",
//     },
//     success: {
//       title: "Thank You!",
//       text: "Your information has been submitted successfully. Please have a seat and we'll call you shortly.",
//       newForm: "New form",
//     },
//     buttons: { prev: "Previous", next: "Next", submit: "Submit Form" },
//     langs: { en: "EN", sr: "SR" },
//   },
//   sr: {
//     brand: "ConfiDental",
//     headerTitle: "Formular za prijem pacijenta",
//     subtitle: "Molimo popunite obavezna polja",
//     step: "Korak",
//     of: "od",
//     percent: "",
//     sections: [
//       "Lični podaci",
//       "Medicinski podaci",
//       "Kontakt za hitne slučajeve",
//       "Kako ste čuli za nas",
//       "Saglasnost i pregled",
//     ],
//     fields: {
//       firstName: "Ime *",
//       lastName: "Prezime *",
//       dateOfBirth: "Datum rođenja *",
//       phone: "Broj telefona *",
//       phonePh: "npr. +381 63 386 382",
//       email: "Email adresa *",
//       medicalQuestions: [
//         {
//           question: "",
//           name: "epilepsy",
//           answers: [
//             { answer: "Bolujem od epilepsije", name: "epilepsy" },
//             { answer: "Prelezao/la sam zuticu", name: "jaundice" },
//           ],
//         },
//         {
//           question: "Prelezao/la sam?",
//           name: "illness1",
//           answers: [
//             { answer: "Reumatsku goroznicu", name: "illness1-a" },
//             { answer: "Bakterijski endokardit", name: "illness1-b" },
//             { answer: "Infarkt miokarda", name: "illness1-c" },
//           ],
//         },
//         {
//           question: "Bolujem od",
//           name: "illness2",
//           answers: [
//             { answer: "Dijabetesa", name: "illness2-a" },
//             { answer: "Adisonove bolesti", name: "illness2-b" },
//             { answer: "Hipertireoze", name: "illness2-c" },
//             { answer: "Od side (AIDS)", name: "illness2-d" },
//           ],
//         },
//         {
//           question: "Imam ugradjen",
//           name: "implants",
//           answers: [
//             { answer: "Veštački zalistak", name: "implants-a" },
//             { answer: "Pace maker", name: "implants-b" },
//             { answer: "Veštački kuk/ veštačka kolena", name: "implants-c" },
//             { answer: "Od side (AIDS)", name: "implants-d" },
//           ],
//         },
//         {
//           question: "Prelezao/la sam",
//           name: "illness3",
//           answers: [
//             { answer: "Herpes simplex", name: "illness3-a" },
//             { answer: "Herpes zoster", name: "illness3-b" },
//             { answer: "virusnu infekciju", name: "illness3-c" },
//           ],
//         },
//         { question: "Duze krvarim posle posekotine", name: "cut-bleed" },
//         {
//           question: "Alergican/na sam na",
//           name: "alergies",
//           answers: [
//             { answer: "Lekove", name: "alergies-a" },
//             { answer: "Hranu", name: "alergies-b" },
//             { answer: "Ostalo", name: "alergies-c" },
//           ],
//         },
//         {
//           question: "Bolujem od ",
//           name: "illness4",
//           answers: [
//             { answer: "Hemofilije", name: "illness4-a" },
//             { answer: "Trombocitopenije", name: "illness4-b" },
//             { answer: "Leukemije", name: "illness4-c" },
//             { answer: "Von Willebrandove bolesti", name: "illness4-d" },
//           ],
//         },
//         {
//           question: "Bolujem od prekomernog zgrušavanja krvi",
//           name: "blood-cloth",
//         },
//         { question: "Bolujem od bronhijalne astme", name: "asthma" },
//         {
//           question: "Prelezeo/la sam",
//           name: "illness5",
//           answers: [
//             { answer: "TBC pluca", name: "illness5-a" },
//             { answer: "drugih organa", name: "illness5-b" },
//           ],
//         },
//         {
//           question: "Bolujem od cira na",
//           name: "illness6",
//           answers: [
//             { answer: "želucu", name: "illness6-a" },
//             { answer: "dvanaestopalačnom crevu", name: "illness6-b" },
//           ],
//         },
//         {
//           question: "Bolujem od bolesti koje nisu navedene u upitniku?",
//           name: "illness7",
//         },
//         {
//           question: "Trenutno uzimam sledece lekove:",
//           name: "medications",
//         },
//         {
//           question: "",
//           name: "illness8",
//           answer: "Do sada sam imao/la operacije:",
//         },
//         {
//           question: "",
//           name: "cigarettes",
//           answer: "Pušim ____ cigareta dnevno",
//         },
//         {
//           question: "",
//           name: "alcohol",
//           answer: "Svakodnevno pijem alkohol",
//         },
//         {
//           question: "",
//           name: "drugs",
//           answer: "Uzimam drogu",
//         },
//       ],
//       notBeenIll: "Niste bili bolesni",
//       hearQ: "Kako ste čuli za našu kliniku? *",
//       hearOpts: {
//         empty: "Izaberite opciju",
//         fam: "Preporuka prijatelja ili porodice",
//         google: "Pretraga na Google-u",
//         social: "Društvene mreže",
//         insurance: "Preko osiguranja",
//         yellow: "Žute stranice",
//         newspaper: "Novine",
//         radio: "Radio",
//         drove: "Prolazeći pored ordinacije",
//         other: "Drugo",
//       },
//       details: "Dodatni detalji (opciono)",
//       detailsPh: "Unesite dodatne informacije...",
//     },
//     review: {
//       title: "Proverite vaše podatke",
//       name: "Ime i prezime",
//       dob: "Datum rođenja",
//       phone: "Telefon",
//       email: "Email",
//       emergency: "Kontakt za hitne slučajeve",
//       heard: "Kako ste čuli za nas",
//     },
//     consent: {
//       hipaa:
//         "Potvrđujem da sam primio/la i razumem HIPAA obaveštenje o privatnosti i dajem saglasnost za upotrebu i otkrivanje mojih zdravstvenih podataka u svrhe lečenja, plaćanja i rada zdravstvene ustanove.",
//       treatment:
//         "Dajem saglasnost za pregled i lečenje od strane stomatologa i razumem da ne postoji garancija ishoda lečenja.",
//     },
//     success: {
//       title: "Hvala vam!",
//       text: "Vaši podaci su uspešno poslati. Molimo vas, sačekajte — pozvaćemo vas uskoro.",
//       newForm: "Novi formular",
//     },
//     buttons: { prev: "Prethodno", next: "Sledeće", submit: "Pošalji formular" },
//     langs: { en: "EN", sr: "SR" },
//   },
// };

export default function ConfidentMedicalForm() {
  const [lang, setLang] = useState<Lang>("en");
  const { t } = useTranslation("form");

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="conf-wrapper" data-lang={lang}>
        <div className="conf-container">
          <div className="conf-card conf-center">
            <div className="conf-success-circle">
              <CheckCircle size={40} />
            </div>
            <h2 className="conf-title">{t("header.title")}</h2>
            <p className="conf-text">{t("header.subtitle")}</p>
            <button
              className="btn btn-primary button primary-btn conf-btn conf-btn-primary"
              onClick={() => {
                setIsSubmitted(false);
              }}
            >
              "asd asd asd"
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
              <h1 className="conf-title">{t("header.title")}</h1>
              <p className="conf-subtitle">{t("header.subtitle")}</p>
            </div>
            <div className="conf-header-right">
              <img src={logo} alt="Confident Logo" className="h-8" />
              <fieldset
                className="conf-lang-switch"
                aria-label="Language switch"
              >
                <button
                  type="button"
                  className={`conf-lang-btn ${
                    lang === "en" ? "is-active" : ""
                  }`}
                  aria-pressed={lang === "en"}
                  onClick={() => {
                    setLang("en");
                    i18n.changeLanguage("en");
                  }}
                >
                  {t("langs.en")}
                </button>
                <button
                  type="button"
                  className={`conf-lang-btn ${
                    lang === "rs" ? "is-active" : ""
                  }`}
                  aria-pressed={lang === "rs"}
                  onClick={() => {
                    setLang("rs");
                    i18n.changeLanguage("rs");
                  }}
                >
                  {t("langs.rs")}
                </button>
              </fieldset>
            </div>
          </div>

          <FormRenderer />
        </div>
      </div>
    </div>
  );
}
