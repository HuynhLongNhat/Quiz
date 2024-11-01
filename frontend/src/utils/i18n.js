import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debugger: false,
    lng: "vi", // Ngôn ngữ mặc định
    fallbackLng: "en", // Ngôn ngữ dự phòng
    interpolation: {
      escapeValue: false, // React đã an toàn với XSS
    },
  });
export default i18n;
