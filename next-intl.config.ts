// src/next-intl.config.ts
export const locales = ['fr', 'en'];
export const defaultLocale = 'en';
export const localePrefix = 'as-needed'; // Ou 'always', 'never'
export const localeCookieName = 'NEXT_LOCALE';

export default {
  locales,
  defaultLocale,
  localePrefix,
  localeCookieName,
}; 