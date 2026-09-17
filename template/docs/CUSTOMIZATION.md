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

### Mock API

Until `API_BASE_URL` points at a real backend (any `*.example.com` host counts as a placeholder), requests are answered from `src/core/api/mocks/mockApi.json` by `src/core/api/mockAdapter.ts` — no network, same thunks, same interceptors. Sign in with phone `011111111111`, password `testpass`, then code `111111`; anything else returns the mock's error response.

Each key is `"METHOD /path"` and maps to a list of responses. The first response whose `when` fields all equal the request body is returned, so put the happy path first and a catch-all error (no `when`) last:

```json
"POST /orders": [
  {"when": {"sku": "NO-JKT-0148"}, "status": 201, "body": {"id": "ORD-1"}},
  {"status": 422, "body": {"error": "That item is out of stock"}}
]
```

Unmocked routes return 404 `No mock for …`. Set a real `API_BASE_URL` and the adapter is off.

Optional: use multiple env files (e.g. `.env.development`, `.env.staging`, `.env.production`) and build variants so each build uses the right URL.

## Theme & branding

The template ships the **Fady Shawky design system**: a cool navy-tinted slate ramp, **one** electric-blue accent (`#2563EB` light / `#3B6EF6` dark), Geist + Geist Mono, soft radii (6px controls, 12px cards, 16px dialogs), 1px borders on every surface, low cool shadows and no gradients. Components read **semantic tokens** only, so rebranding means changing values in these files — no component edits:

- **Colors**: `src/core/theme/colors.ts` — raw ramps (`Slate`, `Blue`, `Green`, `Amber`, `Red`) plus `LightColors` / `DarkColors`, the semantic `ColorTokens` (`bgCanvas`, `surfaceCard`, `borderDefault`, `textPrimary`, `accent`, `dangerFg`, …) components read via `useTheme().theme.colors`.
- **Type**: `src/core/theme/fonts.ts` (families) and the text roles in `src/core/theme/themes.ts` — spread `theme.text.h1`, `.body`, `.bodySm`, `.label`, `.eyebrow`, `.mono`, `.amount`, …
- **Sizes**: `src/core/theme/commonSizes.ts` — 4px spacing scale, `borderRadius` (`xs 4` · `sm 6` · `md 8` · `lg 12` · `xl 16`), `borderWidth.hairline`, `control` heights (32/40/48), icon sizes.
- **Spacing between components**: `CommonSizes.layout` — screen `gutter` 16 (`gutterAuth` 24 on sign-in/OTP), `section` 20 between a screen's top-level blocks (`sectionLoose` 24 on feeds), `stack` 16 between form fields and buttons, `list` 12 between stacked cards, `related` 10 between lines inside one block, `titleToBody` 8, `field` 6 (label/error ↔ input), `cardPadding` 12/20/24, `rowMinHeight` 52. Put the gap on the parent; don't give components outer margins. `Container` already applies the gutter and `section` gap to its children.
- **Elevation**: `src/core/theme/shadows.ts` — `theme.shadows.xs|sm|md|lg|dialog`, applied as RN `boxShadow` strings (New Architecture).
- **Motion**: `src/core/theme/motion.ts` — durations, easing curves (`standard`, `out`, `spring`), `pressScale`.

These tokens are also re-exported from the `src/design-system` barrel.

### Fonts

`fonts.ts` references Geist by PostScript name (`Geist-Regular`, `Geist-Medium`, `Geist-SemiBold`, `GeistMono-Regular`, `GeistMono-Medium`). The static TTFs from [Geist v1.7.2](https://github.com/vercel/geist-font/releases/tag/v1.7.2) ship with the template (SIL Open Font License — `resources/fonts/Geist-OFL.txt`) and are already linked:

- **iOS**: referenced from `resources/fonts/` in the Xcode project's *Fonts* group, added to Copy Bundle Resources for both app targets, and listed under `UIAppFonts` in both Info.plists.
- **Android**: copied to `android/app/src/main/assets/fonts/` (RN resolves `fontFamily` by file name).

To swap in another family: put the TTFs in `resources/fonts/`, run `npx react-native-asset` (or repeat the steps above by hand), remove the Geist files, and update the names in `fonts.ts`. Name each file after its PostScript name so iOS and Android resolve the same `fontFamily` string.

Geist has no Arabic glyphs; Arabic text falls back to the system font. If Arabic is a primary language, pair it with an Arabic face (e.g. Almarai) for `Languages.ar`.

### Light / dark / system theming

`ThemeProvider` (`src/core/theme/ThemeProvider.tsx`) exposes `useTheme()` and **follows the OS color scheme by default** — `App.tsx` renders `<ThemeProvider>` with no forced theme. Both light and dark are supported, and the Profile screen includes a manual toggle. To force one theme, pass it to `<ThemeProvider>` in `App.tsx`.

### Logo

The brand mark is the **FS monogram** — an angular interlocked F and S on a 14° slant:

- React component: `src/common/components/Logo.tsx` — `<Logo size={32} variant="mark" />`, built on `react-native-svg`. `mark` (default) follows the theme; `mark-silver` / `mark-white` / `mark-black` / `mark-blue` pin a contained mark; `monogram-blue` / `-white` / `-black` / `-silver` render the bare monogram (silver is dark-ground only). Wired into Splash, Login and Home.
- Raw SVGs: `src/assets/brand/` — the full pack: `fs-mark*`, `fs-monogram-*`, `fs-horizontal*` and `fs-stacked*` lockups, `fs-app-icon.svg` (512px store icon) and `favicon.svg`.

To use your own mark, replace the geometry in `Logo.tsx` (and the SVGs) — the rest of the app references the component, not the assets directly.

### App icon and launch screen

Both are rendered from the FS geometry, so they change with your brand, not with `Logo.tsx`:

- **App icon** — iOS: one 1024px `ios/reactnativemagic/Images.xcassets/AppIcon.appiconset/AppIcon.png` (Xcode derives the other sizes). Android: adaptive icon (`mipmap-anydpi-v26/ic_launcher*.xml` → `drawable/ic_launcher_background.xml` + `ic_launcher_foreground.xml`, art inside the 66dp safe zone) plus legacy `mipmap-*/ic_launcher*.png` for API 24–25.
- **Launch screen** — the contained mark at 88pt, dead centre on `bgCanvas`, light/dark aware: iOS `LaunchScreen.storyboard` (`SplashMark` image set + `SplashBackground` colour), Android `drawable/splash_background.xml` as the window background plus `windowSplashScreen*` in `values-v31/styles.xml` for Android 12+ (`splash_mark.xml` / `drawable-night/`, `@color/splash_background` in `values` / `values-night`). The JS `Splash` screen draws the same mark in the same spot, and iOS keeps the storyboard up as the root view's `loadingView` while JS loads, so launch → Splash doesn't jump. Keep the three in step if you change the mark, its size or the canvas colour.

### Visual references

Two static reference pages ship with the template:

- **[`docs/design-system.html`](./design-system.html)** — semantic colors (light + dark), text roles, spacing, radii, elevation, motion, brand marks and component states.
- **[`docs/wireframes.html`](./wireframes.html)** — the screen flow.

## Adding a new language

1. Add a new translation file under `src/common/localization/translations/`, e.g. `frLocalization.ts`, following the same shape as `commonLocalization.ts` or `loginLocalization.ts`.
2. In `src/common/localization/localization.ts`, import the new file and add it to the `localization` object, e.g. `fr: new LocalizedStrings(frLocalization)`.
3. Add the language to the `Languages` enum in `localization.ts` if you use it for switching (e.g. `fr = 'fr'`).
4. Use the new keys in your components via the existing `t(key, section)` or the relevant `localization.*` object.

## Adding a screen

The template ships real, branded screens: **Splash** (the Auth stack entry, which hands off to Login), **Login** (logo + phone/password), **OTP** (verifies via a `verifyOTP` thunk), **Home** (greeting + accent hero card + a categories list), and **Profile** (user card + language toggle + theme toggle + logout). Use any of them as a starting point.

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

The template ships with `@react-native-firebase/{app,messaging,analytics}` **v26** (modular API only — `getMessaging()` plus free functions such as `onMessage(messaging, …)`; requires the New Architecture, which RN 0.85 always uses) wired into `src/core/notifications/`. Listeners are started from `App.tsx` and the background handler is registered in `index.js`. To make this work on a real device you need to add your Firebase project credentials.

### iOS

1. In the [Firebase console](https://console.firebase.google.com), add an iOS app using your `BUNDLE_ID`.
2. Download `GoogleService-Info.plist` and drag it into `ios/<YourApp>/` in Xcode (Copy items if needed, target = your app).
3. `ios/Podfile` is already configured for Firebase: static frameworks (`use_frameworks! :linkage => :static`, override with the `USE_FRAMEWORKS` env var), `$RNFirebaseAsStaticFramework = true`, and `$RNFirebaseDisableSPM = true` (React Native Firebase v26 can't combine its Swift Package Manager resolution with static linkage). Don't add `use_modular_headers!`.
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

## React Native 0.87.x

The template is on RN 0.87.1 (New Architecture only; the iOS app delegate is the Swift `RCTReactNativeFactory` form from the upstream template).

TypeScript is 6.x: `tsconfig.json` has no `baseUrl` (deprecated in TS 6) — `paths` entries are relative to the config file. React Native 0.87's style types are `readonly`, so build mutable style objects instead of mutating `StyleSheet.flatten()` results. If you upgrade your generated app to a newer RN later, use the [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) — select your current RN version on the left and the target on the right, then apply the suggested diffs to `package.json`, `ios/`, `android/`, and config files.

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
