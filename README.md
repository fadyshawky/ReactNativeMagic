# React Native Magic

A React Native template that gives you a working app on day one: sign-in, OTP, home, profile, light and dark mode, English and Arabic, all styled with the **Fady Shawky design system**.

```bash
npx @react-native-community/cli init MyApp --template @fadyshawky/react-native-magic
```

---

## Quick start

```bash
# 1. Create the app (the bundle ID is optional; you're asked for one if you skip it)
npx @react-native-community/cli init MyApp --template @fadyshawky/react-native-magic --package-name com.mycompany.myapp
cd MyApp

# 2. Install
npm install
cd ios && pod install && cd ..

# 3. Run
npm start
npm run ios                          # or: npm run android:development:debug
```

No backend yet? No problem. The app answers every request from a local mock API, so you can sign in right away:

| Field    | Value          |
| -------- | -------------- |
| Phone    | `011111111111` |
| Password | `testpass`     |
| OTP      | `111111`       |

---

## What's inside

| Area          | What you get                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------ |
| Screens       | Splash → Login → OTP → Home (with a real data list) → Profile                                     |
| Theme         | Fady Shawky design system, light + dark, follows the phone's setting                             |
| State         | Redux Toolkit + redux-persist (you choose which fields survive a restart)                        |
| API           | One axios instance: adds the token and language, refreshes expired tokens once, and has a mock mode |
| Navigation    | React Navigation 7; logged-in vs logged-out is decided by the token, not by manual navigation    |
| Languages     | English and Arabic (RTL), switchable at runtime                                                  |
| Push          | Firebase Cloud Messaging, with a single file for "where does this notification open?"            |
| Lists         | FlashList wrapper with loading, empty, error and pull-to-refresh states built in                 |
| Brand         | FS app icon, launch screen and logo on iOS and Android                                           |

---

## The theme

The template uses the **Fady Shawky design system**: calm, precise and product-focused. Light and dark mode are treated equally, and the app follows the phone's appearance setting.

### The rules

- **One accent.** Electric blue marks the main action on a screen. If two things are blue, one of them is wrong.
- **Cool neutrals.** Every grey is a slate with a hint of blue.
- **Every surface has a 1px border.** Shadows are low and cool, and only hint at depth.
- **Soft corners, no pills.** 6px buttons and inputs, 12px cards, 16px sheets.
- **Flat colour only.** No gradients, glow or emoji.
- **Geist for text, Geist Mono for numbers.** Prices, codes, dates and counts use the mono font.
- **Sentence case.** "Sign in", not "Sign In" or "SIGN IN".
- **48px touch targets** for anything tappable.

### Colours

Use the token names in code, never hex values. Each token has a light and a dark value:

| Token           | Light     | Dark      | Use for                     |
| --------------- | --------- | --------- | --------------------------- |
| `bgCanvas`      | `#FFFFFF` | `#0A0D14` | Screen background           |
| `surfaceCard`   | `#FFFFFF` | `#111722` | Cards, inputs               |
| `borderDefault` | `#D8DEE8` | `#232C3B` | The 1px border on surfaces  |
| `textPrimary`   | `#0A0D14` | `#EEF2F7` | Headings, body text         |
| `textSecondary` | `#4D5868` | `#A2AEC0` | Descriptions, labels        |
| `accent`        | `#2563EB` | `#3B6EF6` | The primary action, links   |
| `success`       | `#15A46E` | `#22C58A` | Positive states             |
| `warning`       | `#C2820B` | `#E0A526` | Needs attention             |
| `danger`        | `#D8382F` | `#F05A50` | Errors, destructive actions |

### Typography

**Geist** (Regular, Medium, SemiBold) and **Geist Mono** (Regular, Medium) are bundled with the app. Pick a text role instead of setting font sizes by hand:

`displayLg` · `displayMd` · `displaySm` · `h1` · `h2` · `h3` · `h4` · `bodyLg` · `body` · `bodySm` · `label` · `caption` · `eyebrow` · `mono` · `amount`

### Spacing

Everything sits on a 4px grid. For space *between* components, use `CommonSizes.layout`. Put the gap on the parent; components never carry outer margins.

| Token          | Size | Use for                                     |
| -------------- | ---- | ------------------------------------------- |
| `gutter`       | 16   | Screen side padding                         |
| `gutterAuth`   | 24   | Side padding on sign-in and OTP             |
| `section`      | 20   | Between the main blocks of a screen         |
| `sectionLoose` | 24   | Between sections on feed screens like Home  |
| `stack`        | 16   | Between form fields and buttons             |
| `list`         | 12   | Between stacked cards                       |
| `related`      | 10   | Between lines inside one block              |
| `titleToBody`  | 8    | Heading → its description                   |
| `field`        | 6    | Label or error ↔ its input                  |
| `cardPadding`  | 12 / 20 / 24 | Card padding: `sm` / `md` / `lg`    |

`Container` (the screen wrapper) already applies the gutter and spaces its children `section` apart.

### Using it

```tsx
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ButtonType} from '../../../types';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {useTranslation} from '../../common/localization/LocalizationProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';

export function WelcomeCard(): JSX.Element {
  const {theme} = useTheme();
  const t = useTranslation();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surfaceCard,
          borderColor: theme.colors.borderDefault,
          boxShadow: theme.shadows.sm,
        },
      ]}>
      <RTLAwareText style={theme.text.h3}>{t('title', 'welcome')}</RTLAwareText>
      <RTLAwareText style={[theme.text.body, {color: theme.colors.textSecondary}]}>
        {t('subtitle', 'welcome')}
      </RTLAwareText>
      <PrimaryButton label={t('start', 'welcome')} type={ButtonType.solid} onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: CommonSizes.layout.cardPadding.md,
    gap: CommonSizes.layout.related,
    borderWidth: CommonSizes.borderWidth.hairline,
    borderRadius: CommonSizes.borderRadius.lg,
  },
});
```

- **Switch the theme:** `const {toggleTheme, setThemeMode} = useTheme();`
- **Buttons:** `ButtonType.solid` (primary) · `outline` (secondary) · `ghost` · `danger` · `borderless` (link)
- **Icons:** `<Icon name="search" />`, Lucide glyphs at the system's 1.75 stroke
- **Logo:** `<Logo size={32} variant="mark" />`, which follows light and dark mode

To see every token and component state, open [`docs/design-system.html`](template/docs/design-system.html) in a browser.

### Make it your brand

| To change…                       | Edit                                                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Colours                          | `src/core/theme/colors.ts`                                                                                              |
| Fonts and text roles             | `src/core/theme/fonts.ts`, `src/core/theme/themes.ts`                                                                   |
| Spacing, radii, sizes            | `src/core/theme/commonSizes.ts`                                                                                         |
| Shadows and motion               | `src/core/theme/shadows.ts`, `src/core/theme/motion.ts`                                                                 |
| Logo                             | `src/common/components/Logo.tsx`, `src/assets/brand/`                                                                   |
| App icon and launch screen       | See [Customization → App icon and launch screen](template/docs/CUSTOMIZATION.md#app-icon-and-launch-screen)              |

---

## Mock API

Until you point the app at a real backend, requests are answered from **`src/core/api/mocks/mockApi.json`**:

```json
"POST /login": [
  {"when": {"mobile_number": "011111111111", "mpin": "testpass"}, "status": 200, "body": {"message": "Code sent"}},
  {"status": 401, "body": {"error": "Wrong phone number or password"}}
]
```

- Keys are `"METHOD /path"`.
- The first response whose `when` fields match the request body is used, so put the success case first and the error last.
- Routes that aren't listed return a 404.

**Connect a real backend:** copy `.env.example` to `.env` and set `API_BASE_URL`. Any address that isn't `*.example.com` switches the mock off.

---

## Project structure

```
src/
├── screens/         Splash, Login, OTP, Home, Profile (+ a Components gallery)
├── common/          Shared components, localization (EN/AR), hooks, validations
├── core/
│   ├── api/         Axios instance, interceptors, mock API
│   ├── store/       Redux slices (app, user, categories) and persistence
│   ├── theme/       Design-system tokens and ThemeProvider
│   ├── config/      Environment values (API_BASE_URL, ENV)
│   └── notifications/  Push notification listeners and routing
├── navigation/      Auth stack, main tabs, navigation ref
└── assets/brand/    FS logos and app icon (SVG)
```

Imports are relative. Path aliases (`@core/*`, `@common/*`, …) are configured if you prefer them.

---

## Scripts

| Command                         | What it does                                                            |
| ------------------------------- | ----------------------------------------------------------------------- |
| `npm start`                     | Start Metro                                                             |
| `npm run ios`                   | Run on iOS                                                              |
| `npm run android:<env>:<type>`  | Run on Android; `env` is `development`, `staging` or `prod`, `type` is `debug` or `release` |
| `npm test`                      | Jest                                                                    |
| `npm run typecheck`             | TypeScript                                                              |
| `npm run lint`                  | ESLint                                                                  |

---

## Guides

- **[Architecture](template/docs/ARCHITECTURE.md)**: layers, data flow, provider order
- **[Customization](template/docs/CUSTOMIZATION.md)**: app name, bundle ID, API, theme, adding a screen, slice or language, Firebase
- **[Best practices](template/docs/BEST_PRACTICES.md)**: code style, testing, security, upgrades
- **[Design system](template/docs/design-system.html)** and **[wireframes](template/docs/wireframes.html)**: open in a browser

> **Push notifications** need your own Firebase files (`GoogleService-Info.plist`, `google-services.json`). See [Customization → Firebase](template/docs/CUSTOMIZATION.md#firebase--push-notifications-fcm).

---

## Requirements

- Node.js **22.13+**
- JDK **17+**
- Xcode **26+** and CocoaPods (iOS). Verified with Xcode 27 and the iOS 27 simulator.
- Android Studio with SDK **37** (Android)

Built on React Native **0.87** (New Architecture) and React **19.2**.

## Troubleshooting

| Problem                                        | Fix                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------ |
| `pod install` fails                            | `cd ios && pod deintegrate && pod install`                                     |
| `undefined method '[]' for nil` in the Podfile | `node_modules` is incomplete: `rm -rf node_modules && npm ci`, then `pod install` |
| Android: "SDK location not found"              | Set `ANDROID_HOME`, or add `sdk.dir` to `android/local.properties`             |
| iOS still shows the old launch screen          | Delete the app from the simulator or device and run again                      |
| Upgrading React Native                         | Use the [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT. See [LICENSE.md](LICENSE.md).

## Author

**Fady Shawky**: [GitHub](https://github.com/fadyshawky)
