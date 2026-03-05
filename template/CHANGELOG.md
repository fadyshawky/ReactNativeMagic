# Changelog

## [Unreleased]

### Added

- Architecture aligned with Uprise-style layout: `common/`, `core/`, `navigation/`, `screens/`, `sheetManager/`.
- Single app config module (`src/core/config`) for API base URL and feature toggles; base URL from `.env` via react-native-config.
- `AppStatusBar` component to avoid deprecated Android status bar APIs.
- `.env.example` for API_BASE_URL and ENV; `.env` in `.gitignore`.
- Documentation: `docs/ARCHITECTURE.md`, `docs/CUSTOMIZATION.md`, `docs/BEST_PRACTICES.md`.

### Changed

- Dependencies updated to caret (^) versions; React Native ^0.84, React ^19.2; Node >= 20.
- Store persist simplified: whitelist only `user` (accessToken, user) and `app` (language, isRTL); removed CryptoJS/deviceId encryption.
- API layer uses `src/core/config` for base URL; request interceptor adds Bearer token and locale; response interceptor handles 401 (logout).
- Theme: added “Customize for your brand” comments in `colors.ts`, `fonts.ts`, `commonSizes.ts`.
- Bootstrap order: Provider → PersistGate → SnackbarProvider → ThemeProvider → ThemedApp (RTLInitializer → LocalizationProvider → SafeAreaProvider → AppStatusBar → SheetProvider → AppNavigator).
- `index.js` imports `./src/sheetManager/sheets` so sheets are registered.

### Template contract

- `template.config.js`: `placeholderName`, `titlePlaceholder`, `templateDir`.
- Bundle ID set at init via `--package-name`; app name and title replaced by CLI.
