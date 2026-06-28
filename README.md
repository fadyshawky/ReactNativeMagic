# React Native Magic

> A production-ready React Native template — TypeScript, Redux Toolkit, a single-instance API layer, token-gated navigation, push, i18n/RTL, and a futuristic Indigo → Cyan design system. Scaffold a real app in one command.

```bash
npx @react-native-community/cli init YourAppName --template @fadyshawky/react-native-magic
```

The generated project boots with branded screens already wired (Splash → Login → OTP → Home → Profile), a working example feature (a `categories` data flow), and sensible defaults: it follows the **system color scheme** and ships in **English / LTR**, with **Arabic / RTL** fully wired and switchable at runtime.

## Features

- **TypeScript** end to end, with strict, typed Redux hooks.
- **Redux Toolkit + redux-persist** using the house `newState` / `LoadState` slice pattern; persistence is opt-in per slice via explicit whitelists.
- **Single-axios API layer** (`get` / `post` / `put` / `deleteApi`) with a request interceptor that injects auth + locale, and a response interceptor that **dedups concurrent 401s** behind one in-flight refresh and retries the original request.
- **React Navigation 7**, with a token-gated split between the Auth stack and the Main app — set or clear the access token and the navigator switches; no imperative login navigation.
- **Firebase Cloud Messaging** wired for foreground, background, and cold-start, with **tap-routing** centralized in one file and a background-tap queue that flushes after login.
- **i18n + RTL** (English and Arabic out of the box) with runtime language switching.
- **FlashList-backed lists** via a single `FlatListWrapper` so heavy lists stay smooth.
- **Futuristic Indigo → Cyan design system**: recolored tokens (primary indigo `#5B6CFF`, accent cyan `#22E0D6`, deep-ink backgrounds), gradient + glow brand tokens, and a forward-leaning **"FS" monogram** logo built on `react-native-svg`.
- **Light / dark / system theming** — the app follows the OS by default and exposes a manual toggle.

## Quick start

```bash
# 1. Generate the app
npx @react-native-community/cli init YourAppName --template @fadyshawky/react-native-magic
cd YourAppName

# 2. Install dependencies (runs patch-package + husky)
npm install

# 3. Configure your backend
cp .env.example .env        # then set API_BASE_URL

# 4. iOS only — install pods
cd ios && pod install && cd ..

# 5. Run it
npm start
npm run ios                 # or an Android variant (see Scripts)
```

Optionally set your bundle ID at creation time:

```bash
npx @react-native-community/cli init YourAppName --template @fadyshawky/react-native-magic --package-name com.yourcompany.yourapp
```

If you omit `--package-name`, the template prompts you for one after init (or press Enter to set it later).

> **Push notifications** need your own Firebase config files (`GoogleService-Info.plist`, `google-services.json`) — they are not shipped in the template. Add them and apply the small native snippets in [CUSTOMIZATION.md](template/docs/CUSTOMIZATION.md#firebase--push-notifications-fcm) before building on a device.

## Requirements

- **Node.js >= 20** ([download](https://nodejs.org/en/download/))
- JDK >= 11 ([download](https://www.oracle.com/java/technologies/downloads/))
- Ruby >= 2.7.5 (for iOS pods)
- Xcode (iOS) / Android Studio (Android)

## Project structure (in your app)

```
src/
├── common/          # Shared components (ErrorBoundary, NetworkBanner, SnackbarProvider, FlatListWrapper),
│                    # localization (i18n + RTL), hooks, helpers, validations
├── core/
│   ├── api/         # Single axios instance + interceptors (auth, locale, 401-refresh dedup)
│   ├── store/       # Redux Toolkit slices (app, user, categories) + redux-persist whitelists
│   ├── theme/       # colors.ts, fonts.ts, commonSizes.ts, brand.ts, ThemeProvider
│   ├── config/      # Env-driven config (API_BASE_URL, ENV, feature toggles)
│   └── notifications/  # FCM listeners + tap-routing
├── design-system/   # Token + brand re-exports and the theme provider (barrel)
├── navigation/      # Auth stack, main stack, root navigation ref
├── screens/         # Splash, Login, OTP, Home, Profile
└── assets/brand/    # Logo SVGs (logo-primary, logo-mono, logo-mark, wordmark-dark)
```

> Note: feature code uses **relative imports**. Path aliases (`@core/*`, `@common/*`, `@design-system`, …) are configured in `babel.config.js`, `tsconfig.json`, and `jest.config.js` and are available if you prefer them, but the shipped code does not use them.

## Customization

| Want to change… | Edit |
|-----------------|------|
| Brand colors | `src/core/theme/colors.ts` |
| Fonts | `src/core/theme/fonts.ts` |
| Sizes / spacing | `src/core/theme/commonSizes.ts` |
| Gradients & glow shadows | `src/core/theme/brand.ts` (`BrandGradients`, `Glow`) |
| Logo | `src/assets/brand/*.svg` + the `Logo` component in `src/common/components/Logo.tsx` |
| API base URL / env | `.env` (read through `src/core/config`) |

Two visual references ship with the template:

- **[Design system](template/docs/design-system.html)** — the color ramps, gradients, glow, and logo variants.
- **[Wireframes](template/docs/wireframes.html)** — the screen flow.

Full guides:

- **[docs/ARCHITECTURE.md](template/docs/ARCHITECTURE.md)** — layers, folder map, data flow, provider order, SOLID mapping.
- **[docs/CUSTOMIZATION.md](template/docs/CUSTOMIZATION.md)** — app name, bundle ID, API, theme, adding a screen / slice / language, Firebase.
- **[docs/BEST_PRACTICES.md](template/docs/BEST_PRACTICES.md)** — code style, structure, testing, security, upgrades.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler |
| `npm run ios` | Run on iOS |
| `npm run android:development:debug` | Run Android (development, debug) |
| `npm run android:development:release` | Run Android (development, release) |
| `npm run android:staging:debug` | Run Android (staging, debug) |
| `npm run android:staging:release` | Run Android (staging, release) |
| `npm run android:prod:debug` | Run Android (production, debug) |
| `npm run android:prod:release` | Run Android (production, release) |
| `npm test` | Run tests (Jest) |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run lint` | Lint code (ESLint) |
| `node scripts/ci-sync-env.cjs <envFile> KEY=value …` | Write/update env keys for CI (versionCode, buildNumber, …) |

## Versions

- **React Native** 0.85.x
- **React** 19.2.x
- **Node** >= 20 (LTS)

## Common issues

**iOS — Pod install fails**

```bash
cd ios && pod deintegrate && pod install && cd ..
```

**Android — Gradle / SDK**

- Run `./gradlew clean` in `android/`.
- Ensure `android/local.properties` has `sdk.dir` set to your Android SDK path.

**Upgrading React Native** — use the [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) (select current → target version) and apply the suggested changes.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to run the template locally and open a pull request. This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT — see [LICENSE.md](LICENSE.md).

## Author

Fady Shawky — [GitHub](https://github.com/fadyshawky)
