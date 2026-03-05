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
3. The app reads these via `react-native-config`; `src/core/config/index.ts` re-exports them for type-safe use.

Optional: use multiple env files (e.g. `.env.development`, `.env.staging`, `.env.production`) and build variants so each build uses the right URL.

## Theme

Edit these files for your brand (no need to touch components):

- **Colors**: `src/core/theme/colors.ts`
- **Fonts**: `src/core/theme/fonts.ts`
- **Sizes / spacing**: `src/core/theme/commonSizes.ts`

## Adding a new language

1. Add a new translation file under `src/common/localization/translations/`, e.g. `frLocalization.ts`, following the same shape as `commonLocalization.ts` or `loginLocalization.ts`.
2. In `src/common/localization/localization.ts`, import the new file and add it to the `localization` object, e.g. `fr: new LocalizedStrings(frLocalization)`.
3. Add the language to the `Languages` enum in `localization.ts` if you use it for switching (e.g. `fr = 'fr'`).
4. Use the new keys in your components via the existing `t(key, section)` or the relevant `localization.*` object.

## Adding a screen

1. Create a folder under `src/screens/<Feature>/` with `Feature.tsx` and optional `components/` and `hooks/`.
2. Register the screen in the right stack in `src/navigation/` (e.g. `AuthStack.tsx` or `MainStack.tsx`).
3. Add the route and component to the stack’s screen list.

## Adding a Redux slice

1. Create a folder under `src/core/store/<domain>/` with `*State.ts`, `*Slice.ts`, and optionally `*Actions.ts`.
2. Add the slice to `src/core/store/rootReducer.ts`.
3. If the slice should persist, add a `createWhitelistFilter('<domain>', ['field1', 'field2'])` entry in `src/core/store/store.tsx` persist config.

## Feature flags / app config

Toggle features or app-level constants in `src/core/config/index.ts` or via env vars read there (e.g. `enableRTL`).
