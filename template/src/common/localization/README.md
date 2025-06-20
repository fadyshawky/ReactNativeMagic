# Localization System

This document explains how to use the localization system in the application.

## Overview

The localization system is built using `react-native-localization` and provides a simple way to translate text throughout the application. It supports multiple languages (English and Arabic) and provides a consistent API for accessing translations. The system also includes RTL (Right-to-Left) support for Arabic language.

## Structure

The localization system consists of the following components:

- **LocalizationProvider**: A React context provider that manages the current language and provides translation functions.
- **Translation Files**: JSON files containing translations for different parts of the application.
- **Hooks**: Custom hooks for accessing translations in components.
- **RTL Components**: Utility components for handling RTL layouts.

## Translation Files

Translation files are organized by feature and stored in the `src/common/localization/translations` directory:

- `commonLocalization.ts`: Common translations used throughout the app
- `loginLocalization.ts`: Translations for the login screen
- `homeLocalization.ts`: Translations for the home screen
- `otpLocalization.ts`: Translations for the OTP verification screen
- `passwordLocalization.ts`: Translations for password-related screens
- `navigationLocalization.ts`: Translations for navigation elements (screen names, tab names)
- `mainNavigationLocalization.ts`: Translations for main navigation tabs and screens
- etc.

Each translation file follows this structure:

```typescript
export const featureLocalization = {
  en: {
    key1: 'Translation 1',
    key2: 'Translation 2',
    // Nested translations
    nestedSection: {
      key3: 'Translation 3',
    },
  },
  ar: {
    key1: 'الترجمة 1',
    key2: 'الترجمة 2',
    // Nested translations
    nestedSection: {
      key3: 'الترجمة 3',
    },
  },
};
```

## Using Translations in Components

### 1. Using the `useTranslation` Hook

The easiest way to use translations is with the `useTranslation` hook:

```typescript
import {useTranslation} from '../../common/localization/LocalizationProvider';

function MyComponent() {
  const t = useTranslation();

  return <Text>{t('welcome', 'login')}</Text>;
}
```

The `t` function takes two parameters:

- `key`: The translation key
- `section` (optional): The section/feature the translation belongs to (defaults to 'common')

### 2. Using Dot Notation for Nested Translations

For nested translations, you can use dot notation:

```typescript
// Access nestedSection.key3 in the login section
t('nestedSection.key3', 'login');
```

## Screen Label Localization

The application supports localized screen labels and tab names. This is implemented in the navigation configuration.

### 1. Screen Names in Navigation Stacks

Screen names are localized using the `navigation` translation section:

```typescript
// In AuthStack.tsx
import {useTranslation} from '../common/localization/LocalizationProvider';

export function AuthStack() {
  const t = useTranslation();

  const AuthScreens = [
    {
      id: 'Login',
      component: Login,
      options: {
        headerShown: false,
        title: t('screens.Login', 'navigation'), // Localized screen title
      },
    },
    // Other screens...
  ];

  // ...
}
```

### 2. Tab Names in Bottom Tab Navigator

Tab names are localized using the `mainNavigation` translation section:

```typescript
// In MainStack.tsx
import {useTranslation} from '../common/localization/LocalizationProvider';

function MainTabs() {
  const t = useTranslation();

  const MainScreens = [
    {
      id: 'Main',
      component: HomeScreen,
      options: {
        tabBarLabel: t('tabs.Main', 'mainNavigation'), // Localized tab label
        headerShown: false,
        icon: ImageResources.services,
        selectedIcon: ImageResources.services,
      },
    },
    // Other tabs...
  ];

  // ...
}
```

The TabBar component also supports localization by using the translation hook:

```typescript
// In TabBar.tsx
import {
  useTranslation,
  useRTL,
} from '../common/localization/LocalizationProvider';

export function TabBar({state, descriptors, navigation}) {
  const t = useTranslation();
  const isRTL = useRTL();

  // ...

  // Get localized tab name if not provided in options
  const localizedName = t(`tabs.${route.name}`, 'mainNavigation');

  // ...
}
```

### 3. RTL Support in TabBar

The TabBar component has full RTL support, automatically adjusting the tab order and layout for RTL languages:

```typescript
export function TabBar({state, descriptors, navigation}) {
  const isRTL = useRTL();

  // Create a copy of routes array to avoid modifying the original
  const routesToRender = [...state.routes];

  // If RTL, reverse the order of tabs
  if (isRTL) {
    routesToRender.reverse();
  }

  return (
    <RTLAwareView style={styles.container}>
      {routesToRender.map((route, index) => {
        // Calculate the correct index in the original array for focused state
        const originalIndex = isRTL ? state.routes.length - 1 - index : index;
        const isFocused = state.index === originalIndex;

        // ... render tab
      })}
    </RTLAwareView>
  );
}
```

This implementation ensures that:

- Tabs are displayed in the correct order for both LTR and RTL languages
- The focused state is preserved when switching between LTR and RTL
- Tab labels are properly aligned based on the text direction
- The entire tab bar layout adapts to the current language direction

### 4. Adding New Screen Names

To add a new screen name translation:

1. Add the screen name to the appropriate translation file:

```typescript
// For auth screens
export const navigationLocalization = {
  en: {
    screens: {
      NewScreen: 'New Screen',
      // Other screen names...
    },
  },
  ar: {
    screens: {
      NewScreen: 'شاشة جديدة',
      // Other screen names...
    },
  },
};

// For main navigation tabs
export const mainNavigationLocalization = {
  en: {
    tabs: {
      NewTab: 'New Tab',
      // Other tab names...
    },
  },
  ar: {
    tabs: {
      NewTab: 'تبويب جديد',
      // Other tab names...
    },
  },
};
```

2. Use the translation in your navigation configuration:

```typescript
{
  id: 'NewScreen',
  component: NewScreenComponent,
  options: {
    title: t('screens.NewScreen', 'navigation'),
    // For tabs
    tabBarLabel: t('tabs.NewTab', 'mainNavigation'),
  },
}
```

## RTL Support

The application supports Right-to-Left (RTL) languages like Arabic. The system automatically handles RTL layout when the language is set to Arabic.

### 1. Using RTL-aware Components

Use the provided RTL-aware components to automatically handle RTL layout:

```typescript
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {useRTL} from '../../common/localization/LocalizationProvider';

function MyComponent() {
  const isRTL = useRTL();

  return (
    <RTLAwareView style={{flexDirection: 'row'}}>
      <RTLAwareText style={{textAlign: 'left'}}>
        This text will be properly aligned in RTL mode
      </RTLAwareText>
    </RTLAwareView>
  );
}
```

### 2. Using the `useRTL` Hook

You can use the `useRTL` hook to check if the current language is RTL:

```typescript
import {useRTL} from '../../common/localization/LocalizationProvider';

function MyComponent() {
  const isRTL = useRTL();

  return (
    <View
      style={{
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
      }}>
      {/* Your content */}
    </View>
  );
}
```

### 3. Using the `rtlStyles` Helper

You can use the `rtlStyles` helper to create RTL-aware styles:

```typescript
import {useRTL} from '../../common/localization/LocalizationProvider';
import {rtlStyles} from '../../common/components/RTLAwareView';

function MyComponent() {
  const isRTL = useRTL();
  const rtlStyle = rtlStyles(isRTL);

  return (
    <View style={[rtlStyle.row, rtlStyle.textLeft]}>{/* Your content */}</View>
  );
}
```

### 4. RTL in Navigation Components

Navigation components like the TabBar have special RTL handling to ensure proper layout and interaction:

- Tab order is reversed in RTL mode
- Focus state is preserved when switching between LTR and RTL
- Text alignment is automatically adjusted
- Icons and other visual elements are properly positioned

## Adding New Translations

To add new translations:

1. Add the translation key and value to the appropriate translation file for both English and Arabic
2. If creating a new feature, create a new translation file in the `translations` directory
3. Register the new translation file in `localization.ts`

Example of adding a new translation file:

```typescript
// 1. Create the file: src/common/localization/translations/newFeatureLocalization.ts
export const newFeatureLocalization = {
  en: {
    title: 'New Feature',
    description: 'This is a new feature',
  },
  ar: {
    title: 'ميزة جديدة',
    description: 'هذه ميزة جديدة',
  },
};

// 2. Register in localization.ts
import {newFeatureLocalization} from './translations/newFeatureLocalization';

export const localization = {
  // Existing localizations...
  newFeature: new LocalizedStrings(newFeatureLocalization),
};
```

## Changing the Language

To change the application language:

```typescript
import {useLocalization} from '../../common/localization/LocalizationProvider';
import {Languages} from '../../common/localization/localization';

function LanguageSelector() {
  const {changeLanguage} = useLocalization();

  return (
    <>
      <Button title="English" onPressIn={() => changeLanguage(Languages.en)} />
      <Button title="العربية" onPressIn={() => changeLanguage(Languages.ar)} />
    </>
  );
}
```

### App Restart on Language Change

When changing between RTL and LTR languages (e.g., from English to Arabic or vice versa), the app will automatically restart to properly apply the layout changes. This is necessary because React Native requires a restart to fully apply RTL layout changes, especially on Android.

The restart is handled automatically by the `LocalizationProvider` when you call the `changeLanguage` function. No additional code is needed in your components to handle the restart.

```typescript
// Inside LocalizationProvider
const changeLanguage = (language: Languages) => {
  if (language !== currentLanguage) {
    setCurrentLanguage(language);

    // Set RTL configuration and restart the app
    const shouldBeRTL = language === Languages.ar;
    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);

      // Restart the app to apply RTL/LTR changes properly
      try {
        // Check if RNRestart is available
        if (RNRestart && typeof RNRestart.restart === 'function') {
          RNRestart.restart();
        } else if (Platform.OS === 'android') {
          // Fallback for Android using DevSettings
          const DevSettings = NativeModules.DevSettings;
          if (DevSettings && DevSettings.reload) {
            DevSettings.reload();
          }
        }
      } catch (error) {
        console.error('Failed to restart the app:', error);
      }
    }
  }
};
```

#### Confirmation Dialog

When changing the language in the Profile screen, a confirmation dialog is shown to inform the user that the app will restart:

```typescript
// In Profile.tsx
const handleLanguageToggle = () => {
  Alert.alert(
    t('changeLanguage', 'profile'),
    t('changeLanguageConfirmation', 'profile'),
    [
      {
        text: t('cancel', 'common'),
        style: 'cancel',
      },
      {
        text: t('change', 'common'),
        onPress: () => {
          changeLanguage(isArabic ? Languages.en : Languages.ar);
        },
      },
    ],
    {cancelable: true},
  );
};
```

This provides a better user experience by informing the user about the restart before it happens.

## Best Practices

1. **Use RTL-aware components**: Always use `RTLAwareText` and `RTLAwareView` instead of regular `Text` and `View` for content that needs to adapt to RTL languages.
2. **Use the translation hook**: Always use the `useTranslation` hook instead of directly accessing the localization object.
3. **Organize translations by feature**: Keep translations organized by feature to make them easier to maintain.
4. **Use meaningful keys**: Use descriptive keys that make it clear what the translation is for.
5. **Provide default values**: When a translation is missing, the key will be displayed as a fallback.
6. **Add comments**: Add comments to explain the context of translations when necessary.
7. **Test in both LTR and RTL modes**: Always test your UI in both Left-to-Right and Right-to-Left modes to ensure it looks correct in both.
8. **Localize screen labels**: Always localize screen titles and tab names for a consistent user experience.
9. **Separate navigation translations**: Keep auth navigation and main navigation translations separate for better organization.
10. **Handle RTL in navigation components**: Ensure navigation components like TabBar properly handle RTL layout and interaction.

## Adding a New Language

To add a new language:

1. Update the `Languages` enum in `localization.ts`:

```typescript
export enum Languages {
  en = 'en',
  fr = 'fr', // Add new language
}
```

2. Add translations for the new language in each translation file:

```typescript
export const commonLocalization = {
  en: {
    welcome: 'Welcome',
  },
  fr: {
    welcome: 'Bienvenue',
  },
};
```
