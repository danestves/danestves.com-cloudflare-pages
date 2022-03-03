// Dependencies
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import type { InitOptions } from 'i18next';

export let i18nOptions: InitOptions = {
  supportedLngs: ['en', 'es'],
  defaultNS: 'common',
  fallbackLng: 'en',
  react: { useSuspense: false },
};

export function initI18n(options?: InitOptions) {
  return i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      ...options,
      ...i18nOptions,
    });
}
