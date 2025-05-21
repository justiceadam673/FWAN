// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslation from "./locales/en/translation.json";
import haTranslation from "./locales/ha/translation.json";

// Define resources
const resources = {
  en: {
    translation: enTranslation,
  },
  ha: {
    translation: haTranslation,
  },
};

// Initialize i18n
i18n
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Bind react-i18next to React
  .init({
    resources,
    fallbackLng: "en", // Default to English
    debug: false,
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
