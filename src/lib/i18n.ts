import { createIntl, createIntlCache } from 'react-intl';

export const locales = ['en', 'ar', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
};

export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

export const getDirection = (locale: Locale): 'ltr' | 'rtl' => {
  return locale === 'ar' ? 'rtl' : 'ltr';
};

// Cache for intl instances
const cache = createIntlCache();

export const createIntlInstance = (locale: Locale, messages: Record<string, string>) => {
  return createIntl({
    locale,
    messages,
  }, cache);
};
