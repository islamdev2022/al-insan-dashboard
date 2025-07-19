"use client";

import { useIntl } from "react-intl";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Globe, Check } from "lucide-react";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { useLanguage } from "@/components/IntlProvider";

export function LanguageSwitcher() {
  const intl = useIntl();
  const { locale: currentLocale, setLocale } = useLanguage();

  const handleLanguageChange = (locale: Locale) => {
    setLocale(locale);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
        >
          <Globe className="w-4 h-4" />
          {localeNames[currentLocale]}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1" align="end">
        <div className="space-y-1">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLanguageChange(locale)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-100 ${
                currentLocale === locale
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700"
              }`}
            >
              <span>{localeNames[locale]}</span>
              {currentLocale === locale && (
                <Check className="w-4 h-4 text-green-600" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
