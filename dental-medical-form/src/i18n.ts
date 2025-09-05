import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/form.json";
import rs from "./locales/rs/form.json";

// Basic i18n initialization

i18n.use(initReactI18next).init({
  resources: {
    en: { form: en },
    rs: { form: rs },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
