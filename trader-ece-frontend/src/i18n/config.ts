import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en/translation.json';
import trTranslation from '../locales/tr/translation.json';
import thTranslation from '../locales/th/translation.json';
import idTranslation from '../locales/id/translation.json';
import zhTranslation from '../locales/zh/translation.json';
import viTranslation from '../locales/vi/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  tr: {
    translation: trTranslation,
  },
  th: {
    translation: thTranslation,
  },
  id: {
    translation: idTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
  vi: {
    translation: viTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
