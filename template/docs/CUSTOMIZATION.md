# Customization

## App name and bundle ID

Set at project creation:

```bash
npx @react-native-community/cli init YourAppName --template @fadyshawky/react-native-magic --package-name com.yourcompany.yourapp
```

- **App name**: Replaces the template placeholder in `app.json` and file names.
- **Bundle ID** (`--package-name`): Sets Android `applicationId` and iOS `PRODUCT_BUNDLE_IDENTIFIER` and restructures Android package folders.

If you omit `--package-name`, the template will **prompt you** after init to enter a package name (e.g. `com.company.app`). You can enter it then, or press Enter to skip and set `APP_ID` / `ANDROID_APP_ID` in `.env` later and the iOS bundle ID in Xcode or via [react-native-rename](https://www.npmjs.com/package/react-native-rename).

## API base URL and environment

1. Copy `.env.example` to `.env`.
2. Set `API_BASE_URL` (and any other keys) for your backend.
3. The app reads these via `react-native-config`; `src/core/config/index.ts` re-exports them for type-safe use as `API_BASE_URL` and `ENV` (the environment name; falls back to a legacy `ENVIRONMENT` var). Route all env access through this module.

Optional: use multiple env files (e.g. `.env.development`, `.env.staging`, `.env.production`) and build variants so each build uses the right URL.

## Theme & branding

The template ships a futuristic **"Indigo → Cyan"** system (primary indigo `#5B6CFF`, accent cyan `#22E0D6`, deep ink `#0B1020`). Edit these files for your brand — token *keys* are stable across the app, so changing the hex values rebrands everything (no need to touch components):

- **Colors**: `src/core/theme/colors.ts`
- **Fonts**: `src/core/theme/fonts.ts`
- **Sizes / spacing**: `src/core/theme/commonSizes.ts`
- **Gradients & glow**: `src/core/theme/brand.ts` — `BrandColors`, `BrandGradients` (e.g. `BrandGradients.primary = ['#5B6CFF', '#22E0D6']`), `GradientDirection`, and `Glow` (ready-to-spread `ViewStyle` shadows). Gradient surfaces use `react-native-linear-gradient`.

These tokens are also re-exported from the `src/design-system` barrel.

### Light / dark / system theming

`ThemeProvider` (`src/core/theme/ThemeProvider.tsx`) exposes `useTheme()` and **follows the OS color scheme by default** — `App.tsx` renders `<ThemeProvider>` with no forced theme. Both light and dark are supported, and the Profile screen includes a manual toggle. To force one theme, pass it to `<ThemeProvider>` in `App.tsx`.

### Logo

The brand mark is a forward-leaning **"FS" monogram**:

- React component: `src/common/components/Logo.tsx` — `<Logo size={96} variant="gradient" />`, built on `react-native-svg`. Variants: `gradient` (default), `mono`, `light`, `mark`. It is wired into Splash, Login, Home, and Profile.
- Raw SVGs: `src/assets/brand/` (`logo-primary.svg`, `logo-mono.svg`, `logo-mark.svg`, `wordmark-dark.svg`).

To use your own mark, replace the paths in `Logo.tsx` (and the SVGs) — the rest of the app references the component, not the assets directly.

### Visual references

Two static reference pages ship with the template:

- **[`docs/design-system.html`](./design-system.html)** — color ramps, gradients, glow, and logo variants.
- **[`docs/wireframes.html`](./wireframes.html)** — the screen flow.

## Adding a new language

1. Add a new translation file under `src/common/localization/translations/`, e.g. `frLocalization.ts`, following the same shape as `commonLocalization.ts` or `loginLocalization.ts`.
2. In `src/common/localization/localization.ts`, import the new file and add it to the `localization` object, e.g. `fr: new LocalizedStrings(frLocalization)`.
3. Add the language to the `Languages` enum in `localization.ts` if you use it for switching (e.g. `fr = 'fr'`).
4. Use the new keys in your components via the existing `t(key, section)` or the relevant `localization.*` object.

## Adding a screen

The template ships real, branded screens: **Splash** (the Auth stack entry, which hands off to Login), **Login** (logo + phone/password), **OTP** (verifies via a `verifyOTP` thunk), **Home** (greeting + gradient hero card + a categories list), and **Profile** (user card + language toggle + theme toggle + logout). Use any of them as a starting point.

1. Create a folder under `src/screens/<Feature>/` with `Feature.tsx` and optional `components/` and `hooks/`.
2. Register the screen in the right stack in `src/navigation/` (the Auth stack or the Main stack).
3. Add the route to `RootStackParamList` in `src/navigation/types.ts` (currently `Splash`, `Login`, `OTP`, `Main`, `Account`) and add the component to the stack's screen list.

## Adding a Redux slice

1. Create a folder under `src/core/store/<domain>/` with `*State.ts`, `*Slice.ts`, and optionally `*Actions.ts`.
2. Add the slice to `src/core/store/rootReducer.ts`.
3. If the slice should persist, add a `createWhitelistFilter('<domain>', ['field1', 'field2'])` entry in `src/core/store/store.tsx` persist config.

The `categories` slice (`src/core/store/categories/`) is a complete, copyable example of the house pattern: a `newState` reducer helper, a `LoadState` enum for request status, and a `createAsyncThunk` that calls the `get()` API helper. The Home screen's `useHomeData` hook dispatches it and renders the result through `FlatListWrapper`.

## Feature flags / app config

Toggle features or app-level constants in `src/core/config/index.ts` or via env vars read there (e.g. `enableRTL`).

## Firebase / push notifications (FCM)

The template ships with `@react-native-firebase/{app,messaging,analytics}` wired into `src/core/notifications/`. Listeners are started from `App.tsx` and the background handler is registered in `index.js`. To make this work on a real device you need to add your Firebase project credentials.

### iOS

1. In the [Firebase console](https://console.firebase.google.com), add an iOS app using your `BUNDLE_ID`.
2. Download `GoogleService-Info.plist` and drag it into `ios/<YourApp>/` in Xcode (Copy items if needed, target = your app).
3. In `ios/Podfile`, ensure modular headers are enabled near the top:
   ```ruby
   use_modular_headers!
   ```
4. In `ios/<YourApp>/AppDelegate.swift`, configure Firebase at startup:
   ```swift
   import FirebaseCore
   // …
   func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
     FirebaseApp.configure()
     // …
   }
   ```
5. Enable **Push Notifications** + **Background Modes → Remote notifications** in the target's Signing & Capabilities.
6. Upload your APNs auth key in Firebase project settings → Cloud Messaging.
7. Run `cd ios && pod install`.

### Android

1. In the Firebase console, add an Android app using your `ANDROID_APP_ID`.
2. Download `google-services.json` and drop it into `android/app/`.
3. In `android/build.gradle`, add the Google services classpath:
   ```gradle
   buildscript {
     dependencies {
       classpath("com.google.gms:google-services:4.4.2")
     }
   }
   ```
4. In `android/app/build.gradle`, apply the plugin at the very bottom:
   ```gradle
   apply plugin: "com.google.gms.google-services"
   ```
5. Rebuild: `cd android && ./gradlew clean`.

### Routing taps

Notification taps route via `src/core/notifications/routeFromNotificationData.ts`. Send `data.screen` (and optionally `data.params` as a JSON string) in the FCM payload — the router calls `navigate(screen, params)`. Extend that file with `data.type`/`data.target` switches for richer flows.

## React Native 0.85.x

The template is on RN 0.85.2. If you upgrade your generated app to a newer RN later, use the [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) — select your current RN version on the left and the target on the right, then apply the suggested diffs to `package.json`, `ios/`, `android/`, and config files.

`react-native-reanimated` 4.x requires `react-native-worklets` and the `react-native-worklets/plugin` babel plugin (already in `babel.config.js`). Do not also add `react-native-reanimated/plugin` — only one of the two.

## Path aliases

The template wires these aliases through `babel.config.js`, `tsconfig.json`, and `jest.config.js`. **They are configured but not used by the shipped code** — `src/` imports relatively. They are here if you prefer aliases; opt in per file.

| Alias | Path |
|-------|------|
| `@core/*` | `src/core/*` |
| `@common/*` | `src/common/*` |
| `@navigation/*` | `src/navigation/*` |
| `@screens/*` | `src/screens/*` |
| `@sheetManager/*` | `src/sheetManager/*` |
| `@design-system` | `src/design-system` |
| `@types/*` | `src/types/*` |
| `@utils/*` | `src/utils/*` |

Add new aliases in all three files together — Babel rewrites imports at build time, TS resolves them for the editor, Jest resolves them for tests.

## CI / version bumping

`scripts/ci-sync-env.cjs` writes/updates `KEY=value` pairs in an env file. Use it in CI to inject Play Store / App Store auto-incremented build numbers:

```bash
node scripts/ci-sync-env.cjs .env.production \
  ANDROID_VERSION_CODE=42 \
  IOS_BUILD_NUMBER=42
```

Then run your release build — Gradle and the iOS scheme pick up the values via `react-native-config`.

## Git hooks

`husky` v9 + `lint-staged` are wired. Hooks live in `.husky/`. The pre-commit hook runs `lint-staged`, which applies `eslint --fix` and `prettier --write` to staged files only. To skip once (rare): `git commit --no-verify`.
