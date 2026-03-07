# ReactNativeMagic

**Plug and play** – create your app and start developing without hassle.

A production-ready React Native template with TypeScript, Redux, React Navigation, and a scalable architecture (Uprise-style). Use it to bootstrap new apps with one command.

## Requirements

- **Node.js >= 20** ([Download](https://nodejs.org/en/download/))
- JDK >= 11 ([Download](https://www.oracle.com/java/technologies/downloads/))
- Ruby >= 2.7.5 (for iOS)
- Xcode (for iOS) / Android Studio (for Android)

## Quick start

```bash
npx @react-native-community/cli init YourAppName --template @fadyshawky/react-native-magic
cd YourAppName
```

Optional: set your bundle ID at creation:

```bash
npx @react-native-community/cli init YourAppName --template @fadyshawky/react-native-magic --package-name com.yourcompany.yourapp
```

For iOS, install pods:

```bash
cd ios && pod install && cd ..
```

Then run:

```bash
npm start
npm run ios    # or an Android variant below
```

## First steps after creating your app

1. **App name & bundle ID** – Set at init (or you’ll be prompted for package name if you didn’t pass `--package-name`). See [CUSTOMIZATION.md](template/docs/CUSTOMIZATION.md#app-name-and-bundle-id).
2. **API** – Copy `.env.example` to `.env` and set `API_BASE_URL` (and other vars) for your backend.
3. **Theme** – Edit `src/core/theme/colors.ts` (and `fonts.ts`, `commonSizes.ts` if needed) for your brand.
4. **Config** – Optional: adjust `src/core/config/index.ts` for feature toggles or app-level constants.

## Documentation

In your generated project you’ll have:

- **[docs/ARCHITECTURE.md](template/docs/ARCHITECTURE.md)** – Layers, folder map, data flow, SOLID.
- **[docs/CUSTOMIZATION.md](template/docs/CUSTOMIZATION.md)** – App name, bundle ID, API, theme, adding a screen/slice/language.
- **[docs/BEST_PRACTICES.md](template/docs/BEST_PRACTICES.md)** – Code style, structure, testing, security, upgrades.

## Project structure (in your app)

```
src/
├── common/          # Shared components, localization, helpers, validations, utils
├── core/            # Store (Redux), API, theme, config
├── navigation/      # Auth stack, main stack, tabs
├── screens/         # Feature screens
└── sheetManager/    # Action sheets
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler |
| `npm run ios` | Run on iOS |
| `npm run android:prod:debug` | Run Android (production, debug) |
| `npm run android:prod:release` | Run Android (production, release) |
| `npm run android:staging:debug` | Run Android (staging, debug) |
| `npm run android:staging:release` | Run Android (staging, release) |
| `npm run android:development:debug` | Run Android (development, debug) |
| `npm run android:development:release` | Run Android (development, release) |
| `npm test` | Run tests |
| `npm run lint` | Lint code |

## Versioning

- **React Native**: ^0.84.x (current stable at release).
- **React**: ^19.2.x.
- **Node**: >= 20 (LTS).

Dependencies use **caret (^)** so your app can get patch/minor updates independently.

## Common issues

**iOS – Pod install fails**

```bash
cd ios && pod deintegrate && pod install && cd ..
```

**Android – Gradle / SDK**

- Run `./gradlew clean` in `android/`.
- Ensure `android/local.properties` has `sdk.dir` set to your Android SDK path.

**Upgrading React Native**

Use [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) (select current → target version) and apply the suggested changes.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get started, run the template locally, and open a pull request. This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT – see [LICENSE.md](LICENSE.md).

## Author

Fady Shawky – [GitHub](https://github.com/fadyshawky)
