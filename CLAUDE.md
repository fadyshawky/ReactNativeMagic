# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is **not** a React Native app — it is the **npm template package** `@fadyshawky/react-native-magic`, consumed by:

```bash
npx @react-native-community/cli init MyApp --template @fadyshawky/react-native-magic
```

Two distinct layers:

1. **Root** — template package metadata + post-init hook.
   - `package.json` (root): published package; `scripts.test` is a no-op stub. Do **not** add a build step here.
   - `template.config.js`: declares `templateDir: './template'` and `postInitScript: 'scripts/askPackageName.js'`.
   - `scripts/askPackageName.js`: runs in the **generated project's cwd** after init. If `--package-name` was passed, syncs the iOS bundle ID into `.env`/`.env.<env>` (`APP_ID`, `ANDROID_APP_ID`, `BUNDLE_ID`). If not, prompts and patches iOS `project.pbxproj` + env files.
2. **`template/`** — the actual scaffolded RN app users receive. All app development/testing happens here.

When editing, ask: is this a change to **how projects are bootstrapped** (root/scripts) or **what the bootstrapped app contains** (template/)? Most changes go in `template/`.

## Common commands

All app-level commands run from `template/`:

```bash
cd template
npm install                        # also runs postinstall: patch-package, prepare: husky
npm start                          # Metro
npm run ios                        # iOS
npm run android:development:debug  # variants: development|staging|prod × debug|release
npm test                           # Jest
npm run typecheck                  # tsc --noEmit
npm run lint                       # ESLint
```

Single test: `cd template && npx jest <pattern>`. Jest setup mocks `react-native-config`, `@react-native-firebase/messaging`, `NetInfo`, and `react-native-snackbar` (see `template/jest.setup.js`).

iOS pod install: `cd template/ios && pod install`.

CI env-bump helper (used in Codemagic/GH Actions to inject auto-incremented versionCode/buildNumber):

```bash
node template/scripts/ci-sync-env.cjs .env.production ANDROID_VERSION_CODE=42 IOS_BUILD_NUMBER=42
```

### Testing template changes end-to-end

Generate a fresh app from the local template and verify init + first run:

```bash
npx @react-native-community/cli init TestApp --template file:/absolute/path/to/ReactNativeMagic
cd TestApp && npm install
# add Firebase config files (see template/docs/CUSTOMIZATION.md → Firebase) before pod install
cd ios && pod install && cd ..
npm start
```

Pass `--package-name com.x.y` to exercise the bundle-ID branch of `scripts/askPackageName.js`; omit it to exercise the interactive prompt branch.

## Architecture (`template/src/`)

Layered: **UI** (screens, components) → **navigation** → **core** (store, api, theme, config, notifications) + **common** (shared) + **design-system** (token re-exports).

- `common/` — shared components incl. `ErrorBoundary`, `NetworkBanner`, `SnackbarProvider`, localization (i18n + RTL), helpers, hooks, urls, validations.
- `core/api/serverHeaders.ts` — **single axios instance**. Request interceptor injects `Authorization: Bearer <state.user.accessToken>` and `locale: <state.app.language>`. Response interceptor: on 401, dedups concurrent refreshes via a shared `refreshPromise`, retries original request with the new token; on refresh failure or 402, dispatches `setLogout()`. Auth endpoints (`/login`, `/auth/refresh`) bypass the retry. Helpers: `get`, `post`, `put`, `deleteApi`. Do not create additional axios instances elsewhere (token refresh uses a bare axios call internally to avoid recursion).
- `core/store/` — Redux Toolkit + redux-persist (AsyncStorage). Slices per domain (`app`, `user`, `categories`). `categories` is an **example feature** following the house pattern (`newState` helper + `LoadState` enum + a `createAsyncThunk` that calls the `get()` api helper) — a full data → thunk → slice → list demo, fetched by the Home screen's `useHomeData` hook. `rootReducer.ts` combines all slices; `store.tsx` wires persist with **explicit whitelists** via `createWhitelistFilter`. Current whitelist: `user`: `accessToken`, `refreshToken`, `fcmToken`, `user`; `app`: `language`, `isRTL`. Persist only what is whitelisted. The `app` slice defaults `language` to `Languages.en` (English / LTR by default; Arabic + RTL stay fully wired and switchable at runtime). Typed hooks (`useAppSelector`, `useAppDispatch`, `createAppAsyncThunk`) live in `core/store/reduxHelpers.ts`.
- `core/config/index.ts` — re-exports `react-native-config` env (`API_BASE_URL`, `ENV`) with defaults + feature toggles (`enableRTL`). All env access flows through here. (The export is `ENV`, falling back to a legacy `ENVIRONMENT` var.)
- `core/theme/` — split files: `colors.ts`, `fonts.ts`, `commonSizes.ts`, plus `brand.ts` for the gradient/glow tokens. `ThemeProvider` exposes `useTheme()`; brand changes happen here only. Light + dark themes are both supported and the app **follows the system color scheme by default** (`App.tsx` mounts `<ThemeProvider>` with no forced theme); a manual toggle lives on the Profile screen. The palette is the futuristic "Indigo → Cyan" system (primary indigo `#5B6CFF`, accent cyan `#22E0D6`, deep ink `#0B1020`). Gradient surfaces use `react-native-linear-gradient`; `brand.ts` exports `BrandColors`, `BrandGradients`, `GradientDirection`, and `Glow` (ready-to-spread shadow styles).
- `core/notifications/` — FCM. `notificationService.ts` exports `startPushNotificationListeners()` (called from `App.tsx` useEffect, returns cleanup). Wires `onMessage`/`onNotificationOpenedApp`/`getInitialNotification`/`onTokenRefresh`/`AppState` resume/store subscribe. Pending-route queue (`pendingBackgroundNotificationData`) seeded by `index.js` `setBackgroundMessageHandler` and by background taps before login; flushed when user logs in or app resumes. `routeFromNotificationData.ts` is the **only** place to extend tap-routing logic.
- `design-system/` — `tokens/{palette,typography-spacing,brand,index}.ts` re-export `Colors`, `Fonts`, `CommonSizes`, and the brand tokens (`BrandColors`, `BrandGradients`, `Glow`). `index.ts` re-exports tokens + `ThemeProvider`/`useTheme`. This barrel exists so feature code *can* import from one place, but note the shipped `src/` uses **relative imports** throughout — it reaches into `core/theme/*` directly rather than via `@design-system`.
- `navigation/MainNavigation.tsx` — gate between `AuthStack` and `AppMainNavigator` is driven by presence of `state.user.accessToken`. No imperative login navigation — set/clear the token and the navigator switches. `RootNavigation.tsx` exposes `navigationRef` and `navigate()` used by the FCM router. `RootStackParamList` (`navigation/types.ts`) is trimmed to the actually-registered routes: `Splash`, `Login`, `OTP`, `Main`, `Account`. Screens are real (not stubs): **Splash** (branded, the AuthStack entry → hands off to Login), **Login** (logo + phone/password), **OTP** (works via a `verifyOTP` thunk), **Home** (greeting + gradient hero card + a `categories` list via `FlatListWrapper`), and **Profile** (user card + language toggle + theme toggle + logout). The brand `Logo` (`common/components/Logo.tsx`, variants `gradient` | `mono` | `light` | `mark`) is wired into Splash/Login/Home/Profile.
- `App.tsx` — provider order is load-bearing: `ErrorBoundary` → `redux Provider` → `PersistGate` → `GestureHandlerRootView` → `SnackbarProvider` → `ThemeProvider` → `RTLInitializer` → `LocalizationProvider` → `SafeAreaProvider` → `SheetProvider` (actions-sheet) → `BottomSheetModalProvider` (gorhom) → `AppNavigator`. `NetworkBanner` sits as a sibling of the navigator inside the safe-area view. Push listeners mount in a `ThemedApp` useEffect.
- `index.js` — registers `messaging().setBackgroundMessageHandler(…)` **before** `AppRegistry.registerComponent`. Background taps land in the pending-route queue.

### Path aliases

Wired in `babel.config.js` (module-resolver), `tsconfig.json` (paths), `jest.config.js` (moduleNameMapper) — **all three must stay in sync** if you change them. Aliases: `@core/*`, `@common/*`, `@navigation/*`, `@screens/*`, `@sheetManager/*`, `@design-system` (+ `/*`), `@types/*`, `@utils/*`. **These are configured but not currently used** — the shipped code imports relatively. They are available if you prefer aliases.

### Conventions worth knowing before editing

- Lists: use `src/common/components/FlatListWrapper.tsx` (FlashList-backed); set `estimatedItemSize`. Don't reintroduce raw `FlatList` for heavy lists.
- Adding a Redux slice: create `core/store/<domain>/{*State,*Slice,*Actions}.ts`, register in `rootReducer.ts`, and **if it should persist**, add a `createWhitelistFilter('<domain>', [...])` entry in `store.tsx`. Copy `core/store/categories/` as the reference (newState + LoadState + a `get()`-backed thunk).
- Adding a screen: folder in `screens/<Feature>/` (with local `components/`, `hooks/` as needed), register in `AuthStack.tsx` or `MainStack.tsx`.
- Adding a language: new file under `common/localization/translations/`, register in `common/localization/localization.ts`, extend the `Languages` enum.
- Env: copy `.env.example` → `.env`. The four env files (`.env`, `.env.development`, `.env.staging`, `.env.production`) are all patched by `scripts/askPackageName.js` for `APP_ID`/`ANDROID_APP_ID`/`BUNDLE_ID`. Keep new keys in sync across all four.
- Reanimated 4.x uses `react-native-worklets/plugin` in `babel.config.js` — **do not** also add `react-native-reanimated/plugin` (mutually exclusive).
- Firebase: native config files (`GoogleService-Info.plist`, `google-services.json`) are **not** shipped in the template. Each new project drops its own. See `template/docs/CUSTOMIZATION.md` for native config snippets.
- Husky v9 is wired via `prepare: husky` script. Hooks live in `template/.husky/`. Pre-commit runs lint-staged (eslint + prettier on staged files only).

## Versions

Node >= 20. React Native 0.85.2, React 19.2.3 (see `template/package.json`). Root `package.json` declares peer deps for React/RN and is published — bumping these is a breaking change for consumers.
