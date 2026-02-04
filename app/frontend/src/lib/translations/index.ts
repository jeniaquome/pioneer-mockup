import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import all language translations
import { englishTranslations } from './languages/en'
import { spanishTranslations } from './languages/es'
import { frenchTranslations } from './languages/fr'
import { chineseTranslations } from './languages/zh'
import { arabicTranslations } from './languages/ar'
import { swahiliTranslations } from './languages/sw'
import { nepaliTranslations } from './languages/ne'
import { pashtoTranslations } from './languages/ps'
import { uzbekTranslations } from './languages/uz'
import { farsiTranslations } from './languages/fa'
import { japaneseTranslations } from './languages/ja'
import { germanTranslations } from './languages/de'
import { portugueseTranslations } from './languages/pt'
import { russianTranslations } from './languages/ru'
import { urduTranslations } from './languages/ur'

// Translation resources - modular structure for easy expansion
const resources = {
  en: {
    translation: englishTranslations
  },
  es: {
    translation: spanishTranslations
  },
  fr: {
    translation: frenchTranslations
  },
  zh: {
    translation: chineseTranslations
  },
  ar: {
    translation: arabicTranslations
  },
  sw: {
    translation: swahiliTranslations
  },
  ne: {
    translation: nepaliTranslations
  },
  ps: {
    translation: pashtoTranslations
  },
  uz: {
    translation: uzbekTranslations
  },
  fa: {
    translation: farsiTranslations
  },
  ja: {
    translation: japaneseTranslations
  },
  de: {
    translation: germanTranslations
  },
  pt: {
    translation: portugueseTranslations
  },
  ru: {
    translation: russianTranslations
  },
  ur: {
    translation: urduTranslations
  },
}

// Configure i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    
    interpolation: {
      escapeValue: false,
    },
  })

// Export translations object for custom translation context (if needed)
export const translations = {
  en: englishTranslations,
  es: spanishTranslations,
  fr: frenchTranslations,
  zh: chineseTranslations,
  ar: arabicTranslations,
  sw: swahiliTranslations,
  ne: nepaliTranslations,
  ps: pashtoTranslations,
  uz: uzbekTranslations,
  fa: farsiTranslations,
  ja: japaneseTranslations,
  de: germanTranslations,
  pt: portugueseTranslations,
  ru: russianTranslations,
  ur: urduTranslations,
}

// Export Translation type
export type Translation = typeof englishTranslations

export default i18n 