"use client";

import { IntlProvider } from "react-intl";
import { ReactNode, useState, useEffect } from "react";
import { Locale, getDirection } from "@/lib/i18n";

// Import all message files
import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";
import frMessages from "@/messages/fr.json";

const messages = {
  en: enMessages,
  ar: arMessages,
  fr: frMessages,
};

interface Props {
  children: ReactNode;
}

export function IntlProviderWrapper({ children }: Props) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    // Get locale from localStorage or browser preference
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && ["en", "ar", "fr"].includes(savedLocale)) {
      setLocale(savedLocale);
    } else {
      // Try to detect from browser
      const browserLang = navigator.language.split("-")[0];
      if (["en", "ar", "fr"].includes(browserLang)) {
        setLocale(browserLang as Locale);
      }
    }
  }, []);

  const direction = getDirection(locale);

  // Flatten nested messages for react-intl
  const flattenMessages = (
    nestedMessages: any,
    prefix = ""
  ): Record<string, string> => {
    let flattened: Record<string, string> = {};

    for (const key in nestedMessages) {
      const value = nestedMessages[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "object" && value !== null) {
        flattened = { ...flattened, ...flattenMessages(value, newKey) };
      } else {
        flattened[newKey] = value;
      }
    }

    return flattened;
  };

  const flattenedMessages = flattenMessages(messages[locale]);

  return (
    <IntlProvider
      locale={locale}
      messages={flattenedMessages}
      onError={() => {}} // Ignore missing translation errors in development
    >
      <div dir={direction} className={direction === "rtl" ? "rtl" : "ltr"}>
        {children}
      </div>
    </IntlProvider>
  );
}

// Context for language switching
import { createContext, useContext } from "react";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: Props) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // Get locale from localStorage or browser preference
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && ["en", "ar", "fr"].includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // Try to detect from browser
      const browserLang = navigator.language.split("-")[0];
      if (["en", "ar", "fr"].includes(browserLang)) {
        setLocaleState(browserLang as Locale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    // Update document direction
    document.documentElement.dir = getDirection(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        locale={locale}
        messages={flattenMessages(messages[locale])}
        onError={() => {}}
      >
        <div
          dir={getDirection(locale)}
          className={getDirection(locale) === "rtl" ? "rtl" : "ltr"}
        >
          {children}
        </div>
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Helper function to flatten messages
function flattenMessages(
  nestedMessages: any,
  prefix = ""
): Record<string, string> {
  let flattened: Record<string, string> = {};

  for (const key in nestedMessages) {
    const value = nestedMessages[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null) {
      flattened = { ...flattened, ...flattenMessages(value, newKey) };
    } else {
      flattened[newKey] = value;
    }
  }

  return flattened;
}
