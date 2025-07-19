# Multilingual Support Implementation

This project now supports three languages:

- **English** (en) - Default
- **Arabic** (ar) - RTL support included
- **French** (fr)

## 🚀 Features

✅ **Complete i18n Setup** with react-intl
✅ **RTL Support** for Arabic
✅ **Language Switcher** component
✅ **Persistent Language Selection** (localStorage)
✅ **Browser Language Detection**
✅ **Comprehensive Translation Files**
✅ **Custom Hooks** for easy translation access
✅ **RTL CSS Support** with proper styling adjustments

## 🔧 Usage

### Basic Translation

```tsx
import { useIntl } from "react-intl";

function MyComponent() {
  const intl = useIntl();

  return <h1>{intl.formatMessage({ id: "homepage.welcome" })}</h1>;
}
```

### Using the Translation Hook

```tsx
import { useTranslatedMessages } from "@/hooks/useTranslatedMessages";

function MyComponent() {
  const messages = useTranslatedMessages();

  return (
    <div>
      <h1>{messages.welcome}</h1>
      <button>{messages.save}</button>
    </div>
  );
}
```

### Language Switcher

```tsx
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

## 📁 File Structure

```
src/
├── components/
│   ├── IntlProvider.tsx      # Main i18n provider
│   └── LanguageSwitcher.tsx  # Language switcher component
├── hooks/
│   └── useTranslatedMessages.ts  # Translation helper hook
├── lib/
│   └── i18n.ts              # i18n utilities
└── messages/
    ├── en.json              # English translations
    ├── ar.json              # Arabic translations
    └── fr.json              # French translations
```

## 🌐 Adding New Translations

1. Add the translation key to all language files:

   ```json
   // en.json
   {
     "myNewKey": "Hello World"
   }

   // ar.json
   {
     "myNewKey": "مرحبا بالعالم"
   }

   // fr.json
   {
     "myNewKey": "Bonjour le monde"
   }
   ```

2. Use it in your component:
   ```tsx
   const message = intl.formatMessage({ id: "myNewKey" });
   ```

## 🎨 RTL Styling

The project includes automatic RTL support for Arabic. CSS classes automatically adjust for:

- Text direction
- Margins and padding
- Positioning
- Flexbox direction

## 🚀 Quick Start

1. The language provider is already setup in `providers.tsx`
2. Add `LanguageSwitcher` component anywhere you want language selection
3. Use `useTranslatedMessages()` hook or `useIntl()` for translations
4. Add new translations to all three language files

## 📝 Translation Categories

- **common**: Loading, buttons, actions
- **navigation**: Menu items, navigation
- **homepage**: Landing page content
- **dashboard**: Dashboard specific content
- **user**: User management
- **donations**: Donation related content
- **auth**: Authentication
- **notifications**: Notification messages
- **language**: Language selection

## 🎯 Best Practices

1. **Always add translations to ALL language files** when adding new keys
2. **Use semantic key names** like `user.firstName` instead of generic ones
3. **Keep translations organized** by feature/page
4. **Test RTL layout** when adding new components
5. **Use the translation hook** for commonly used messages

Your project is now fully multilingual and ready for the hackathon! 🏆
