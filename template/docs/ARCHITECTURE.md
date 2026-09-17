# Architecture

## Overview

This app uses a layered structure: **UI** (screens, components) → **navigation** → **core** (store, api, theme, config, notifications) and **common** (components, localization, helpers). A **design-system** layer re-exports the theme tokens (colors, type, sizes, shadows, motion) and the theme provider as a single barrel.

> Imports in `src/` are **relative**. Path aliases (`@core/*`, `@common/*`, `@design-system`, …) are configured in `babel.config.js`, `tsconfig.json`, and `jest.config.js` and are available if you prefer them, but the shipped code reaches into `core/theme/*` directly rather than going through the barrel.

## Folder map

| Folder | Purpose |
|--------|--------|
| `src/common/` | Shared UI components (incl. `ErrorBoundary`, `NetworkBanner`, `SnackbarProvider`), localization (i18n), helpers, validations, hooks, urls, utils |
| `src/core/api/` | Single axios instance + interceptors (auth, refresh-token dedup, locale, 401/402 handling) |
| `src/core/store/` | Redux Toolkit slices (`app`, `user`, `categories`) + persist (AsyncStorage, selective whitelist transforms) |
| `src/core/theme/` | `colors.ts` (ramps + semantic light/dark tokens), `fonts.ts`, `commonSizes.ts`, `shadows.ts`, `motion.ts`, `themes.ts` (text roles), `ThemeProvider.tsx`. Light/dark/system theming |
| `src/core/config/` | Env-driven config (`API_BASE_URL`, `ENV`, feature toggles) |
| `src/core/notifications/` | FCM listeners (`notificationService.ts`), tap-routing (`routeFromNotificationData.ts`), auth check |
| `src/design-system/` | Token re-exports + theme provider re-export (barrel; `@design-system` alias available but unused) |
| `src/navigation/` | Navigator setup, auth stack, main stack, root navigation ref, header components |
| `src/screens/` | Feature screens (Splash, Login, OTP, Home, Profile); each may have local `components/` and `hooks/` |
| `src/assets/brand/` | FS brand pack: marks, monograms, horizontal/stacked lockups, app icon, favicon |
| `src/sheetManager/` | Action sheet registration |

## Data flow

- **Auth**: Token is stored in Redux (`user.accessToken`). Navigation shows Auth stack when there is no token, Main stack when there is. `user.refreshToken` is persisted; the axios response interceptor dedups concurrent 401s via a single in-flight `refreshPromise`, then retries the original request. On refresh failure, `setLogout()` is dispatched.
- **API**: Single axios instance in `src/core/api/serverHeaders.ts`. Base URL comes from `src/core/config` (and `.env`). Request interceptor adds `Authorization: Bearer` and `locale`. Response interceptor handles 401 (refresh) and 402 (logout).
- **Redux**: Slices live under `src/core/store/<domain>/` (`app`, `user`, `categories`). Each follows the house pattern — a `newState` reducer helper, a `LoadState` enum for request status, and `createAsyncThunk` thunks that call the API helpers. `categories` is a worked example: its thunk GETs `/categories`, the slice tracks `LoadState`, and the Home screen's `useHomeData` hook renders the result through `FlatListWrapper` (a full data → thunk → slice → list demo). Persist whitelist (`store.tsx`) controls what survives a kill — `user`: `accessToken`, `refreshToken`, `fcmToken`, `user`; `app`: `language`, `isRTL`. The `app` slice defaults `language` to English (`Languages.en`); Arabic / RTL stay wired and switchable at runtime.
- **Notifications**: `index.js` registers the FCM background handler before app boot — it queues any incoming `data` payload into `pendingBackgroundNotificationData`. `App.tsx` mounts `startPushNotificationListeners()` which wires foreground/background/cold-start/token-refresh listeners, plus an `AppState` + store subscriber that flushes the pending route when the user is logged in and the navigator is ready.
- **Theming**: `useTheme().theme` carries `colors` (semantic `ColorTokens` — `LightColors` or `DarkColors` from `src/core/theme/colors.ts`), `text` (roles `h1`…`amount` from `themes.ts`) and `shadows` (RN `boxShadow` strings). Components read only these semantic tokens; spacing, radii and control heights come from `CommonSizes`. `ThemeProvider` **follows the system color scheme by default** (`App.tsx` renders `<ThemeProvider>` with no forced theme); the Profile screen offers a manual toggle. The brand `Logo` (`src/common/components/Logo.tsx`) renders the FS mark/monogram from `react-native-svg`; `variant="mark"` follows the theme.

## Provider order in `App.tsx`

Outer → inner:

1. `ErrorBoundary` (catches render errors with a retry fallback)
2. `Provider` (Redux store)
3. `PersistGate` (redux-persist)
4. `GestureHandlerRootView`
5. `SnackbarProvider`
6. `ThemeProvider`
7. `RTLInitializer` (must wrap `LocalizationProvider`)
8. `LocalizationProvider`
9. `SafeAreaProvider`
10. `SheetProvider` (react-native-actions-sheet)
11. `BottomSheetModalProvider` (@gorhom/bottom-sheet)
12. `AppNavigator`
13. `NetworkBanner` (sibling of navigator, fixed position)

Order is load-bearing: persist must be ready before redux-aware components mount; gesture-handler must wrap everything that uses gestures; RTL must initialize before localized text renders.

## SOLID mapping

- **SRP**: One domain per store folder; one primary concern per component file; theme split into colors, fonts, sizes, consts, styles.
- **OCP**: Extend by adding screens, slices, or routes without changing existing stack logic; extend theme by editing theme files; extend notifications by editing `routeFromNotificationData.ts` only.
- **DIP**: Core (API, store, notifications) does not depend on UI; screens depend on core via hooks/selectors; config abstracts environment.
