import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import Translation Files
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import ru from "./locales/ru.json";

// Configure i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true, // Enable debug mode
    resources: {
      en: {translation: en},
      es: {translation: es},
      fr: {translation: fr},
      ru: {translation: ru},
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {escapeValue: false},
  });
// 🔹 Listen for language changes & update defaultParams
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;
