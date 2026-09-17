# reactnativemagic

Created from [React Native Magic](https://github.com/fadyshawky/ReactNativeMagic) and styled with the **Fady Shawky design system**.

## Run it

```bash
npm install
cd ios && pod install && cd ..

npm start
npm run ios                          # or: npm run android:development:debug
```

Sign in with the built-in mock API: phone `011111111111`, password `testpass`, OTP `111111`.

## Connect your backend

1. Copy `.env.example` to `.env`.
2. Set `API_BASE_URL`.

While the URL is still a `*.example.com` placeholder, requests are answered from `src/core/api/mocks/mockApi.json`. Add a route there whenever you add an API call and have no backend yet:

```json
"GET /orders": [{"status": 200, "body": {"data": []}}]
```

For a route with several outcomes, list the success response first, with a `when` condition that must match the request body. Put the error response last.

## The theme in one minute

- **Read tokens, never hex values.** Get colours from `useTheme()`, as in `theme.colors.accent` and `theme.text.h1`.
- **One blue accent per screen**, cool slate neutrals, and a 1px border on every surface.
- **Corners:** 6px for buttons and inputs, 12px for cards, 16px for sheets. No pill shapes, no gradients.
- **Geist for text, Geist Mono for numbers.** Sentence case everywhere.
- **Space between components with `CommonSizes.layout`**, putting the gap on the parent:
  - `section` 20 between the blocks of a screen
  - `stack` 16 in forms
  - `list` 12 between cards
  - `related` 10 inside a block
  - `titleToBody` 8
  - `field` 6
- **Screen gutters:** `gutter` 16, or `gutterAuth` 24 on sign-in. `Container` applies both the gutter and the `section` gap for you.

```tsx
const {theme} = useTheme();

<View style={{gap: CommonSizes.layout.stack}}>
  <RTLAwareText style={theme.text.h2}>{t('title', 'orders')}</RTLAwareText>
  <PrimaryButton label={t('refresh', 'orders')} type={ButtonType.solid} onPress={reload} />
</View>
```

Open `docs/design-system.html` in a browser to see every token and component.

## Where things live

| To change…                   | Edit                                                                      |
| ---------------------------- | ------------------------------------------------------------------------- |
| Colours                      | `src/core/theme/colors.ts`                                                |
| Fonts and text roles         | `src/core/theme/fonts.ts`, `src/core/theme/themes.ts`                     |
| Spacing, radii, sizes        | `src/core/theme/commonSizes.ts`                                           |
| Mock API responses           | `src/core/api/mocks/mockApi.json`                                         |
| Translations (EN / AR)       | `src/common/localization/translations/`                                   |
| Screens                      | `src/screens/`, registered in `src/navigation/AuthStack.tsx` / `MainStack.tsx` |
| Where a notification opens   | `src/core/notifications/routeFromNotificationData.ts`                     |
| App icon and launch screen   | [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md#app-icon-and-launch-screen) |

## Scripts

| Command                        | What it does                                                            |
| ------------------------------ | ----------------------------------------------------------------------- |
| `npm start`                    | Start Metro                                                             |
| `npm run ios`                  | Run on iOS                                                              |
| `npm run android:<env>:<type>` | Run on Android; `env` is `development`, `staging` or `prod`, `type` is `debug` or `release` |
| `npm test`                     | Jest                                                                    |
| `npm run typecheck`            | TypeScript                                                              |
| `npm run lint`                 | ESLint                                                                  |

## Guides

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): layers, data flow, provider order
- [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md): bundle ID, API, theme, new screen, slice or language, Firebase
- [docs/BEST_PRACTICES.md](docs/BEST_PRACTICES.md): code style, testing, security, upgrades

## Troubleshooting

| Problem                                        | Fix                                                                               |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| `pod install` fails                            | `cd ios && pod deintegrate && pod install`                                        |
| `undefined method '[]' for nil` in the Podfile | `node_modules` is incomplete: `rm -rf node_modules && npm ci`, then `pod install` |
| Android: "SDK location not found"              | Set `ANDROID_HOME`, or add `sdk.dir` to `android/local.properties`                |
| iOS still shows the old launch screen          | Delete the app from the simulator or device and run again                         |

Requirements: Node 22.13+, JDK 17+, Xcode 26+, Android SDK 37. Built on React Native 0.87 (New Architecture) and React 19.2.
