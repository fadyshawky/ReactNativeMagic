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

The TabBar needs no RTL code. Native RTL lays its row out right to left, so the first tab sits on the right in Arabic. Tabs keep their declared order, and focus is matched by route key.

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

RTL is **native**. `RTLInitializer` keeps `I18nManager` in step with the chosen language, restarting the app once when the direction changes. React Native then mirrors the whole layout for you:

- `flexDirection: 'row'` runs right to left
- `start` / `end` (`paddingStart`, `marginEnd`, …) and `left` / `right` swap sides
- Text aligns right, and `textAlign: 'left' | 'right'` is swapped

**Write every layout for LTR, and don't flip anything yourself.** A manual `isRTL ? 'row-reverse' : 'row'` mirrors the layout a second time and puts it back to LTR.

```typescript
function Row({title, value}: {title: string; value: string}) {
  const {theme} = useTheme();
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: CommonSizes.spacing.large}}>
      <Text style={[theme.text.body, {flex: 1}]}>{title}</Text>
      <Text style={theme.text.bodySm}>{value}</Text>
      <Icon name="chevron-right" size={16} />
    </View>
  );
}
```

In Arabic, the title sits on the right, the value on its left and the chevron at the far left, pointing left.

What still needs care:

- **Directional icons.** `Icon` mirrors `arrow-left`, `chevron-left` and `chevron-right` in RTL. Add any new directional glyph to its `DIRECTIONAL` set.
- **Text inputs.** React Native swaps `textAlign` for `Text`, not `TextInput`. Inputs use `inputTextAlign` (`core/theme/commonConsts`), which names the physical side under RTL; otherwise Arabic placeholders sit on the left.
- **Transforms and animations.** `translateX` is not mirrored. Negate the travel under `I18nManager.isRTL` (see `AppSwitch`).
- **Typography.** On iOS, text aligns by writing direction rather than layout direction, so the theme's text roles set `writingDirection: 'rtl'` in RTL. Text that doesn't use a `theme.text` role stays left-aligned; give it one. Arabic joins its letters, so the roles also drop letter-spacing and uppercase, and the eyebrow switches from Geist Mono to Geist. Don't set Arabic words in `mono`/`amount`: Geist Mono is for numbers and has no Arabic glyphs.
- **Behaviour, not layout.** `useRTL()` returns the stored direction, for logic such as choosing a keyboard language.

`RTLAwareView`, `RTLAwareText` and `RTLAwareTouchableOpacity` are plain `View` / `Text` / `TouchableOpacity`, kept so existing screens compile.

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

1. **Let native RTL do the mirroring**: write layouts for LTR with `start`/`end`; never add `row-reverse` or left/right swaps for RTL.
2. **Use the translation hook**: Always use the `useTranslation` hook instead of directly accessing the localization object.
3. **Organize translations by feature**: Keep translations organized by feature to make them easier to maintain.
4. **Use meaningful keys**: Use descriptive keys that make it clear what the translation is for.
5. **Provide default values**: When a translation is missing, the key will be displayed as a fallback.
6. **Add comments**: Add comments to explain the context of translations when necessary.
7. **Test in both LTR and RTL modes**: Always test your UI in both Left-to-Right and Right-to-Left modes to ensure it looks correct in both.
8. **Localize screen labels**: Always localize screen titles and tab names for a consistent user experience.
9. **Separate navigation translations**: Keep auth navigation and main navigation translations separate for better organization.
10. **Mirror only what native RTL can't**: directional icons and `translateX` animations.

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
