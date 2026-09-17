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
   - `scripts/askPackageName.js`: runs in the **generated project's cwd** after init. If `--package-name` was passed, syncs the iOS bundle ID into `.env`/`.env.<env>` (`APP_ID`, `ANDROID_APP_ID`, `BUNDLE_ID`). If not, prompts and patches iOS `project.pbxproj` + env files. Either way it also applies the chosen id to **Android** via `applyAndroidPackage()` — rewriting the Gradle `namespace` + `defaultApplicationId`, moving the Kotlin sources into the new package dir, and updating their `package` declarations. Exports its helpers; `main()` only auto-runs as the post-init hook (`require.main === module`).
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
- `core/api/mockAdapter.ts` + `core/api/mocks/mockApi.json` — while `USE_MOCK_API` is on (exported by `core/config`: true while `API_BASE_URL` is a `*.example.com` placeholder), the axios instance uses this adapter instead of the network. Routes are keyed `"METHOD /path"`; responses are tried in order and the first whose `when` fields all equal the request body wins (happy path first, fallback error last). Demo login: phone `011111111111`, password `testpass`, OTP `111111`. Add a route here when you add a thunk. `refreshUserToken` uses bare axios, so it is never mocked (mocks never return 401 on authenticated routes).
- `core/config/index.ts` — re-exports `react-native-config` env (`API_BASE_URL`, `ENV`, `USE_MOCK_API`) with defaults. All env access flows through here. (The export is `ENV`, reading `config.ENV || config.ENVIRONMENT` — the `.env` files still use `ENVIRONMENT=`. `enableRTL` is exported but hardcoded `true`, not a real toggle.)
- `core/theme/` — the **Fady Shawky design system** (source: Claude Design project `67df55c5-6dfc-4d09-ab6c-1d414efdd59a`). `colors.ts`: raw ramps (`Slate`, `Blue`, `Green`, `Amber`, `Red`, `Silver`) + semantic `LightColors`/`DarkColors` typed as `ColorTokens`. `themes.ts`: builds `lightTheme`/`darkTheme` = `{mode, colors: ColorTokens, text: Record<TextRole, TextStyle>, shadows}`; text roles `displayLg/Md/Sm`, `h1`–`h4`, `bodyLg`, `body`, `bodySm`, `label`, `caption`, `eyebrow`, `mono`, `amount` (line height/tracking pre-computed to px). `fonts.ts`: Geist/Geist Mono PostScript names; the five static TTFs (v1.7.2, OFL) are bundled in `resources/fonts/` and linked — iOS via the *Fonts* group + Copy Bundle Resources on both app targets + `UIAppFonts` in both Info.plists, Android via `android/app/src/main/assets/fonts/`. File name must equal PostScript name. `commonSizes.ts`: 4px spacing (t-shirt keys), `borderRadius` `xs 4|sm 6|md 8|lg 12|xl 16|xxl 24|full`, `borderWidth.hairline`, `control` 32/40/48, `icon`, `touchMin`, `tabBarHeight`, and `layout` — the **rhythm between components** from the DS mobile kit (`gutter` 16, `gutterAuth` 24, `screenBottom` 32, `section` 20, `sectionLoose` 24, `stack` 16, `list` 12, `related` 10, `titleToBody` 8, `field` 6, `cardPadding` 12/20/24, `rowMinHeight` 52). Screens space blocks with gaps on the parent using `layout`; components carry no outer margins. `Container` pads with the gutter and spaces its direct children `layout.section` apart — pass `style` (not `contentContainerStyle`) to change a screen's gutter or gap. `shadows.ts`: RN `boxShadow` strings (needs New Architecture — enabled). `motion.ts`: durations/easings/`pressScale`. `ThemeProvider` exposes `useTheme()` and **follows the system color scheme by default**; manual toggle on Profile. **System rules components follow**: read semantic tokens only (never raw hex), 1px border on every surface, one accent per screen, 6px controls (no pills), no gradients/glow, 48px mobile touch targets, mono for numbers, sentence-case copy. `react-native-linear-gradient` is still a dependency but no longer used.
- `core/notifications/` — FCM. `notificationService.ts` exports `startPushNotificationListeners()` (called from `App.tsx` useEffect, returns cleanup). Wires `onMessage`/`onNotificationOpenedApp`/`getInitialNotification`/`onTokenRefresh`/`AppState` resume/store subscribe. Pending-route queue (`pendingBackgroundNotificationData`) seeded by `index.js` `setBackgroundMessageHandler` and by background taps before login; flushed when user logs in or app resumes. `routeFromNotificationData.ts` is the **only** place to extend tap-routing logic.
- `design-system/` — `tokens/{palette,typography-spacing,index}.ts` re-export the ramps, `LightColors`/`DarkColors`, `Fonts`, `CommonSizes`, `LightShadows`/`DarkShadows` and `Motion`. `index.ts` re-exports tokens + `ThemeProvider`/`useTheme`. This barrel exists so feature code *can* import from one place, but note the shipped `src/` uses **relative imports** throughout — it reaches into `core/theme/*` directly rather than via `@design-system`.
- `navigation/MainNavigation.tsx` — gate between `AuthStack` and `AppMainNavigator` is driven by presence of `state.user.accessToken`. No imperative login navigation — set/clear the token and the navigator switches. `RootNavigation.tsx` exposes `navigationRef` and `navigate()` used by the FCM router. `RootStackParamList` (`navigation/types.ts`) is trimmed to the actually-registered routes: `Splash`, `Login`, `OTP`, `Main`, `Account`. Screens are real (not stubs): **Splash** (branded, the AuthStack entry → hands off to Login), **Login** (logo + phone/password), **OTP** (works via a `verifyOTP` thunk), **Home** (greeting + flat accent hero card + a `categories` list via `FlatListWrapper`), and **Profile** (user card + language toggle + theme toggle + logout). The brand `Logo` (`common/components/Logo.tsx`, variants `mark` (theme-aware) | `mark-silver|white|black|blue` | `monogram-blue|white|black|silver`, drawn from the real FS geometry) is wired into Splash/Login/Home. `src/assets/brand/` holds the full FS SVG pack.
- `App.tsx` — provider order is load-bearing: `ErrorBoundary` → `redux Provider` → `PersistGate` → `GestureHandlerRootView` → `SnackbarProvider` → `ThemeProvider` → `RTLInitializer` → `LocalizationProvider` → `SafeAreaProvider` → `SheetProvider` (actions-sheet) → `BottomSheetModalProvider` (gorhom) → `AppNavigator`. `NetworkBanner` sits as a sibling of the navigator inside the safe-area view. Push listeners mount in a `ThemedApp` useEffect.
- `index.js` — registers `setBackgroundMessageHandler(getMessaging(), …)` **before** `AppRegistry.registerComponent`. `@react-native-firebase` is v26: **modular API only** (`getMessaging()` + free functions like `onMessage(messaging, …)`; no `messaging()` / `FirebaseMessagingTypes` — import types such as `RemoteMessage` from the package root). iOS Podfile sets `use_frameworks! :linkage => :static` (overridable via `USE_FRAMEWORKS`), `$RNFirebaseAsStaticFramework = true` and `$RNFirebaseDisableSPM = true` (RNFB's SPM resolution is incompatible with static linkage). Background taps land in the pending-route queue.

### Path aliases

Wired in `babel.config.js` (module-resolver), `tsconfig.json` (paths), `jest.config.js` (moduleNameMapper) — **all three must stay in sync** if you change them. Aliases: `@core/*`, `@common/*`, `@navigation/*`, `@screens/*`, `@sheetManager/*`, `@design-system` (+ `/*`), `@types/*`, `@utils/*`. **These are configured but not currently used** — the shipped code imports relatively. They are available if you prefer aliases.

### Conventions worth knowing before editing

- Status bar: iOS uses **view-controller-based** appearance (`UIViewControllerBasedStatusBarAppearance` YES in both Info.plists) — the `UIApplication` status bar APIs behind React Native's `StatusBar` are no-ops on iOS 27. `AppStatusBar` renders `StatusBar` on Android only; on iOS the style follows the window appearance, and `ThemeProvider.setThemeMode`/`toggleTheme` call `Appearance.setColorScheme` so a manual theme choice reaches it. Don't render `<StatusBar barStyle>` on iOS (it red-boxes in VC-based mode); use native-stack `statusBarStyle` for a per-screen override.
- RTL is native: `RTLInitializer` forces `I18nManager` to match the language, so React Native mirrors `row`, start/end, left/right and `textAlign`. Write layouts for LTR and never flip manually (`row-reverse`, swapped alignment) — that double-flips back to LTR. `RTLAwareView`/`RTLAwareText` are plain `View`/`Text`. Mirror only what native RTL can't: directional icons (`Icon`'s `DIRECTIONAL` set), `translateX` (see `AppSwitch`), horizontal scroll offsets (physical-left on both platforms — see `Carousel`'s `toOffset`/`toIndex`), and `TextInput` alignment (no native swap — use `inputTextAlign`). Under RTL the theme text roles set `writingDirection: 'rtl'` (iOS right-aligns natural text only by writing direction — un-roled `Text` stays left), drop tracking/uppercase, and the eyebrow switches to Geist; Geist Mono has no Arabic glyphs, so keep Arabic words out of `mono`/`amount`.
- Lists: use `src/common/components/FlatListWrapper.tsx` (FlashList-backed); set `estimatedItemSize`. Don't reintroduce raw `FlatList` for heavy lists.
- Adding a Redux slice: create `core/store/<domain>/{*State,*Slice,*Actions}.ts`, register in `rootReducer.ts`, and **if it should persist**, add a `createWhitelistFilter('<domain>', [...])` entry in `store.tsx`. Copy `core/store/categories/` as the reference (newState + LoadState + a `get()`-backed thunk).
- Adding a screen: folder in `screens/<Feature>/` (with local `components/`, `hooks/` as needed), register in `AuthStack.tsx` or `MainStack.tsx`.
- Adding a language: new file under `common/localization/translations/`, register in `common/localization/localization.ts`, extend the `Languages` enum.
- Env: copy `.env.example` → `.env`. The four env files (`.env`, `.env.development`, `.env.staging`, `.env.production`) are all patched by `scripts/askPackageName.js` for `APP_ID`/`ANDROID_APP_ID`/`BUNDLE_ID`. Keep new keys in sync across all four.
- Android applicationId: `android/app/build.gradle` resolves `applicationId` via `resolveApplicationId(key)`, which reads `APP_ID`/`ANDROID_APP_ID` from env but **falls back to `defaultApplicationId` (kept equal to `namespace`) when the value is empty or still the `com.yourcompany.*` placeholder**. This is what lets a fresh `init` (no `--package-name`) install *and* launch under one id — the RN CLI derives the launch package from `namespace`, so namespace and the installed applicationId must match. If you hardcode a per-env applicationId, make sure `namespace` matches it (askPackageName does this for you).
- Reanimated 4.x uses `react-native-worklets/plugin` in `babel.config.js` — **do not** also add `react-native-reanimated/plugin` (mutually exclusive).
- Firebase: native config files (`GoogleService-Info.plist`, `google-services.json`) are **not** shipped in the template. Each new project drops its own. See `template/docs/CUSTOMIZATION.md` for native config snippets.
- Husky v9 is wired via `prepare: husky` script. Hooks live in `template/.husky/`. Pre-commit runs lint-staged (eslint + prettier on staged files only).

## Docs

`template/docs/`: `ARCHITECTURE.md`, `CUSTOMIZATION.md` (Firebase native config, rebranding), `BEST_PRACTICES.md`. The `.claude/skills/react-native-magic/` skill is the deep-dive companion to this file — keep both in sync when patterns change.

## Versions

Node >= 22.13. React Native 0.87.1 (New Architecture only), React 19.2.3, TypeScript 6 (see `template/package.json`). iOS uses the **UIScene life cycle** (required for the iOS 27 SDK): `AppDelegate.swift` builds the `RCTReactNativeFactory`; `SceneDelegate.swift` creates the window and calls `startReactNative`; both Info.plists (`reactnativemagic/Info.plist` and `reactnativemagic copy-Info.plist` for the `-Development` target) declare `UIApplicationSceneManifest`. Put scene-level hooks (URL contexts, user activity) in `SceneDelegate`, not the app delegate. Icons are Lucide glyphs via `common/components/Icon.tsx` (`react-native-vector-icons` and `react-native-sfsymbols` were removed). Android is edge-to-edge (`edgeToEdgeEnabled=true`), compile/build-tools SDK 37, Gradle 9.4.1. Root `package.json` declares peer deps for React/RN and is published — bumping these is a breaking change for consumers.
