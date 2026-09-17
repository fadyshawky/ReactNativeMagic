# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed
- **Adopted the Fady Shawky design system** (imported from Claude Design). Breaking for code built on the previous tokens:
  - `core/theme/colors.ts`: the `PrimaryColors` / `NaturalColors` / `AlertColors` / `BaseColors` enums are replaced by raw ramps (`Slate`, `Blue`, `Green`, `Amber`, `Red`, `Silver`) and semantic `LightColors` / `DarkColors` (`ColorTokens`). `theme.colors` is now the typed semantic set (`bgCanvas`, `surfaceCard`, `borderDefault`, `textPrimary`, `accent`, `dangerFg`, …).
  - `theme.text` roles are now `displayLg/Md/Sm`, `h1`–`h4`, `bodyLg`, `body`, `bodySm`, `label`, `caption`, `eyebrow`, `mono`, `amount` (was `header*` / `body*Regular|Bold` / legacy styles).
  - Fonts are Geist + Geist Mono (was Almarai). Geist v1.7.2 static TTFs (Regular/Medium/SemiBold + Mono Regular/Medium, SIL OFL) now ship in `resources/fonts/` and are linked for iOS (both app targets + both Info.plists) and Android (`assets/fonts/`). Adds ~1.4 MB to the package.
  - `CommonSizes`: `borderRadius` is `xs|sm|md|lg|xl|xxl|full`, `borderWidth` is `hairline|emphasis`, new `control`, `icon`, `touchMin`, `tabBarHeight`; `font` is the DS type scale; `lineHeight` / `letterSpacing` moved onto the text roles. Legacy spacing aliases (`xs`…`xl`) removed.
  - `shadows.ts` exports `LightShadows` / `DarkShadows` as RN `boxShadow` strings on `theme.shadows`; new `motion.ts`.
  - Removed `core/theme/brand.ts` (`BrandColors`, `BrandGradients`, `GradientDirection`, `Glow`), `createThemedStyles` / `CommonStyles`, and `theme.spacing` / `theme.borderRadius` / `theme.borderWidth` (use `CommonSizes`).
  - `ButtonType.outlineNegative` replaced by `ButtonType.danger`; new `ButtonType.ghost`. `PrimaryButton` gains `size` (`sm|md|lg`, default `lg`) and `fullWidth`; `rounded` removed.
  - `Badge` variants are `neutral|accent|success|warning|danger` with an optional `dot`.
  - `Logo` variants are `mark` (theme-aware) · `mark-silver|white|black|blue` · `monogram-blue|white|black|silver`, drawn from the real FS geometry.
- All shared components, the tab bar and every screen restyled to the system: 1px borders, 6px controls, 48px touch targets, one accent, no gradients or glow; switch/skeleton honour reduced motion.
- `src/assets/brand/` now ships the full FS pack (marks, monograms, lockups, app icon, favicon); `docs/design-system.html` and `docs/wireframes.html` rewritten for the new system.
- Copy: "Welcome back" (sentence case); hero eyebrow no longer hard-coded uppercase.
- **Upgraded `@react-native-firebase/{app,messaging,analytics}` 24.0.0 → 26.4.0** (latest published; v26 is TurboModule-based, New Architecture only, and removes the namespaced API). `index.js` and `core/notifications/notificationService.ts` now use the modular API (`getMessaging`, `onMessage`, `onNotificationOpenedApp`, `getInitialNotification`, `onTokenRefresh`, `getToken`, `setBackgroundMessageHandler`); `RemoteMessage` is imported from the package root; the Jest mock is modular. Code avoids the fields v27 changes (`notification.sound`, iOS `sentTime`/`badge`, `onMessageSent`). `requestPermission` is deprecated upstream in favour of `react-native-permissions` but still works.
- iOS `Podfile`: static frameworks by default (`USE_FRAMEWORKS` env still overrides), `$RNFirebaseAsStaticFramework` + `$RNFirebaseDisableSPM`, and a `post_install` step raising pod deployment targets to React Native's minimum (Xcode 27 rejects older ones). Without these, `pod install`/builds failed on a fresh checkout.

- **Upgraded to React Native 0.87.1** following the official upgrade diff, with every dependency moved to a mutually compatible version:
  - `react-native` 0.85.2 → 0.87.1; `@react-native/*` and `@react-native-community/cli*` → 0.87.1 / 20.2.0; React stays 19.2.3 (renderer pin); TypeScript 5.9 → 6.0.3; Node engine `>= 22.13.0` (template and package root); root `peerDependencies.react-native` → `>=0.87.0`.
  - `react-native-reanimated` 4.6.0 + `react-native-worklets` 0.12.2, `react-native-gesture-handler` 3.3.0, `react-native-screens` 4.28.0, `react-native-safe-area-context` 5.10.0, `react-native-svg` 15.15.5, `@gorhom/bottom-sheet` 5.2.14, `@shopify/flash-list` 2.3.2, `@react-native-async-storage/async-storage` 3.1.1, React Navigation 7.19/7.4, Redux Toolkit 2.12, react-redux 9.3, `react-native-config` 1.7.2, `react-native-permissions` 5.6.2, `react-native-haptic-feedback` 3.0.0, `react-native-restart` 0.0.29, axios 1.20, dayjs 1.11.23, Jest 30.5.1, Prettier 3.9.7. ESLint stays 8 and Babel 7 (what `@react-native/eslint-config` / `@react-native/babel-preset` support).
  - Removed `react-native-vector-icons` (deprecated upstream), `react-native-sfsymbols` and `react-native-linear-gradient`. `IconPlatform` and `resources/symbols/SFSymbols.ts` are gone; `PrimaryButton` takes `iconName` (a Lucide glyph) instead of `platformIconProps`.
  - iOS: `AppDelegate.h/.mm` + `main.m` replaced by the upstream Swift `AppDelegate.swift` (`RCTReactNativeFactory`; RTL setup preserved); deprecated `:hermes_enabled`/`:fabric_enabled` Podfile params removed; pods regenerated.
  - Android: compile SDK / build-tools 37, Kotlin 2.2.0, Gradle 9.4.1 (+ wrapper jar/script), `proguard-android-optimize.txt`, `edgeToEdgeEnabled=true`, AGP 9 opt-outs.
  - TypeScript 6 / RN 0.87 types: dropped deprecated `baseUrl` (paths now `./`-relative), RTL-aware components build mutable style copies, `Platform.isPad`/`Version` via `Platform.OS` narrowing, `TextInputInstance`/`TextInputKeyPressEvent` ref and event types, `AppStatusBar` no longer takes `backgroundColor` (removed with edge-to-edge).

### Added
- **Mock API** so the template runs end to end with no backend. While `API_BASE_URL` is still a `*.example.com` placeholder (`USE_MOCK_API` in `core/config`), the single axios instance uses `core/api/mockAdapter.ts`, which serves `core/api/mocks/mockApi.json` (routes keyed `"METHOD /path"`, first response whose `when` fields match the request body wins, 400 ms latency; interceptors still run). Ships `POST /login` (phone `011111111111`, password `testpass`), `POST /verify-otp` (code `111111`) and `GET /categories`, each with its error response. A real `API_BASE_URL` turns it off.
- **Layout rhythm tokens** — `CommonSizes.layout` (`gutter`, `gutterAuth`, `screenBottom`, `section`, `sectionLoose`, `stack`, `list`, `related`, `titleToBody`, `field`, `cardPadding.sm|md|lg`, `rowMinHeight`) and the missing `spacing.xLargePlus` (20, `space-5`), taken from how the design system's mobile kit spaces components. Screens set gaps on the parent; components carry no outer margins.

### Fixed
- **iOS 27 deprecation warnings, and a status bar that never followed the theme.** With `UIViewControllerBasedStatusBarAppearance` set to NO, React Native's `StatusBar` drives the legacy `-[UIApplication setStatusBarStyle:animated:]` / `setStatusBarHidden:withAnimation:` APIs, which are no-ops on iOS 27 and log a deprecation on every screen change. Both Info.plists now use view-controller-based appearance (react-native-screens forwards it to the active screen), `AppStatusBar` renders React Native's `StatusBar` on Android only, and `ThemeProvider.setThemeMode`/`toggleTheme` call `Appearance.setColorScheme`, so a manual theme choice also switches the native appearance (status bar, keyboard, system alerts). `ImageBackground` (deprecated in RN 0.87) is gone from `Container` and `Background`: an optional background image is an absolutely positioned `Image`. The Arabic login strings the localization library reported missing (`forgetPassword`, `continue`, `notMember`, `registration.*`, `forgotPassword.*`) are added.
- **Arabic (RTL) layout was mirrored twice.** `RTLInitializer` turns on native RTL, which already mirrors rows, start/end, left/right and `textAlign`; `RTLAwareView`/`RTLAwareText`/`rtlStyles` flipped them again, so Arabic rendered left to right (avatars, chevrons and row values on the wrong side, uneven gaps). The wrappers are now plain `View`/`Text`/`TouchableOpacity`, `rtlStyles` is removed, and the TabBar and SearchBar dropped their manual flips. What native RTL can't mirror is handled once: `Icon` mirrors directional glyphs (the header back button's own flip is removed), and `AppSwitch`'s knob travels toward the trailing side (it overflowed the track). Under RTL the theme's text roles carry `writingDirection: 'rtl'` (iOS aligns natural text by writing direction, not layout direction, so plain `Text` stayed left-aligned), drop letter-spacing and uppercase (Arabic joins its letters), and the eyebrow uses Geist instead of Geist Mono, which has no Arabic glyphs; Profile's language/appearance values use body text for the same reason. The Components screen now reads all of its copy from a new `components` translation namespace (EN/AR). `Carousel` maps between slide index and scroll offset for RTL (React Native reports horizontal offsets from the physical left edge on both platforms, while RTL lays item 0 on the right, so its arrows and dots were off). Text inputs use `inputTextAlign`, because React Native doesn't swap `textAlign` for `TextInput` and Arabic placeholders sat on the left. Shared components' accessibility labels (back, next, previous, close, show/hide password) are translated.
- **Spacing between components follows the design system.** `Container` padded the screen twice (32px gutters) and applied `contentContainerStyle` gaps to a view that didn't hold the children, so Profile's and the Components screen's gaps never took effect; it now pads once (16 gutter, 32 bottom) and spaces its children `layout.section` apart. Login/OTP use the 24px auth gutter with title and form blocks (8 / 16 / 20); Home, Profile and the Components screen, `ListItem` (52px rows), `EmptyView`/`TryAgain`, `Card`, `AppBottomSheet` and the inputs read the rhythm tokens; `SearchBar` lost its outer margins; `HeaderBack` is 52px and sits inside the screen gutter instead of forcing the full screen width.
- **Login bypasses removed.** Login no longer navigates to OTP before validating or calling the API, and a failed login/OTP no longer signs you in with a `test_token` (or logs the payload with `console.error`). The mock API provides the demo path instead.
- **Native launch screens and app icons now follow the design system.** iOS showed the stock React Native launch storyboard ("reactnativemagic" in bold system type) and Android had no splash at all; both platforms shipped the default React Native launcher icons (iOS had none). The launch screen is now the FS mark at 88pt, dead centre on `bgCanvas`, light/dark aware (iOS `LaunchScreen.storyboard` + `SplashMark`/`SplashBackground` assets; Android window background + Android 12 `windowSplashScreen*`), and the JS `Splash` draws the same mark in the same spot. iOS keeps the storyboard up as the root view's `loadingView` while JS loads, so the handoff doesn't flash. App icons are rendered from `fs-app-icon.svg`: a single 1024px iOS icon, an Android adaptive icon and legacy PNGs.
- **Login failure crashed with `Cannot read property 'show' of undefined`.** `react-native-snackbar` 3 only has a named `Snackbar` export; the default import resolved to `undefined`, hidden by a type shim in `types/globals.d.ts` (removed). Imports and the Jest mock now use `{Snackbar}`.
- **App failed to launch when built with the iOS 27 SDK** ("UIScene life cycle is required for apps built with this SDK"). The app now adopts the UIScene life cycle: `ios/reactnativemagic/SceneDelegate.swift` creates the window and starts React Native, `AppDelegate.swift` only builds the `RCTReactNativeFactory` and returns the scene configuration, and both Info.plists declare `UIApplicationSceneManifest`. A cold-start URL from the scene's connection options is forwarded as `launchOptions[.url]`, so `Linking.getInitialURL()` keeps working. (The upstream RN 0.87/0.88 templates haven't adopted scenes yet.)
- **Layout was always right-to-left on iOS.** The native app delegate called `forceRTL(true)` on every launch, overriding the persisted language direction. Native no longer touches RTL; `RTLInitializer` is the single owner — it applies the persisted `app.isRTL` and restarts once when the native direction disagrees (it also no longer blanks the app for 800 ms). `LocalizationProvider.changeLanguage` just stores the language; the restart follows from `RTLInitializer`.
- **Login/OTP content rendered under the status bar.** `Container`'s `extendedBackground` offset the view by `-insets.top` twice against one `+insets.top`; the prop is removed (screens already paint the canvas behind the status bar, and `SafeAreaView` handles the inset).
- Non-full-width `PrimaryButton`s no longer force `alignSelf: 'flex-start'`, so they follow the parent's `alignItems` (e.g. the centred "Need help?" link).
- Release builds crashed at launch on RN 0.85.2 with an unhandled `RCTEventEmitter.receiveEvent() … not registered as callable` exception (a legacy event dispatch path in the previous dependency set).
- `package-lock.json` pinned `react-native-worklets` 0.7.4 while `package.json` required `^0.8.0` (Reanimated 4.3 refuses 0.7), so `pod install` failed; the lockfile now resolves 0.8.3.

## [2.3.2] - 2026-06-28

### Fixed
- **Generated apps now launch after `init` without `--package-name`.** The Android `applicationId` was read from `.env` (the `com.yourcompany.*` placeholder) while the Gradle `namespace` was renamed to your app name, so `run-android` installed one id but tried to launch another (`Error: Activity class {…/.MainActivity} does not exist`). `applicationId` now falls back to the (renamed) namespace via `resolveApplicationId` in `android/app/build.gradle`, so the default build installs and launches under one consistent id.
- APK output filenames no longer come out as `null_null_1.0.0_1.apk` — `PROJECT_NAME` falls back to the Gradle project name and `ENV` to `ENVIRONMENT`/the variant name (e.g. `MyApp_development_1.0.0_1.apk`).

### Changed
- `scripts/askPackageName.js` now applies a custom bundle id to **Android** too: it rewrites the Gradle `namespace` + `defaultApplicationId`, moves the Kotlin sources into the new package directory, and updates their `package` declarations (iOS was already handled). The script is now importable (exports its helpers; `main()` only auto-runs as the post-init hook).

## [2.3.1] - 2026-06-28

### Fixed
- Android build failure (`assertWorkletsVersionTask`): bumped `react-native-worklets` to `^0.8.0` to match `react-native-reanimated` 4.3.0, which requires Worklets 0.8.x or newer.

### Changed
- Push notifications now initialize defensively (`index.js` + `notificationService.ts`): a freshly-generated app boots and renders its UI even before Firebase is configured. FCM stays inert until you add `google-services.json` / `GoogleService-Info.plist` — see `docs/CUSTOMIZATION.md`.

## [2.3.0] - 2026-06-25

### Added
- Futuristic "Indigo → Cyan" design system: recolored theme tokens (`core/theme/colors.ts`) and new brand tokens in `core/theme/brand.ts` (`BrandColors`, `BrandGradients`, `GradientDirection`, `Glow`), re-exported via the `@design-system` barrel.
- FS brand logo: a `Logo` component (`common/components/Logo.tsx`, variants gradient/mono/light/mark) plus raw SVG assets in `src/assets/brand/`.
- Real starter screens (previously blank stubs): branded Splash, Login with logo, Home (greeting + gradient hero + categories list), and Profile (info card + language/theme toggles + logout).
- Example `categories` Redux slice (`core/store/categories/`) demonstrating the newState/LoadState/createAsyncThunk house pattern, wired into the Home screen via `useHomeData`.
- `verifyOTP` thunk so the OTP screen works end to end.
- Design references shipped with the template: `docs/design-system.html` and `docs/wireframes.html`.
- Package `files` whitelist, root `LICENSE` (MIT), and a root `index.js` entry point.

### Changed
- Defaults reconciled: the app now follows the system color scheme and defaults to English/LTR (Arabic + RTL stay fully available and switchable).
- `RootStackParamList` trimmed to the actually-registered routes (Splash, Login, OTP, Main, Account).
- `react-native` peer dependency range widened to `>=0.84.0`.

### Fixed
- Removed dead/broken code that blocked a clean build: unused helpers importing libraries that were never dependencies (image-crop-picker, in-app-review, orientation-locker, react-native-share, moment), a broken validations example, the undefined `<Header/>` reference in Login, and a dead "Forgot password" route.

## [1.0.8] - 2024-01-24

### Changed
- Improved FeaturedCarousel component:
  - Centered carousel items on screen
  - Adjusted item width to 85% of screen width
  - Added proper item layout calculations
  - Enhanced snapping behavior

## [1.0.7] - 2024-12-27

### Changed
- Enhanced UI components for better user experience:
  - Improved form input styling
  - Updated button states for better feedback
  - Refined error message displays
  - Added loading spinners for async actions
  - Standardized form layouts across authentication flows

### Added
- Responsive design improvements for mobile devices
- Visual feedback for form validation states
- Transition animations for state changes
- Consistent error message styling

## [1.0.6] - 2024-12-25

### Added
- Added missing password reset handlers (`resetPasswordErrorHandler` and `resetPasswordLoadingHandler`) to user slice
- Added password reset flow with the following states:
  - Loading state during password reset request
  - Error handling for failed password reset attempts
  - Success handling for completed password reset
- Added complete user registration flow:
  - User input validation
  - Registration request handling
  - Success state with automatic login
  - Error handling for failed registration attempts
  - Loading states during registration process

### Fixed
- Fixed password reset error handling in user slice
- Resolved undefined handler errors in password reset flow
- Improved registration flow error handling

## [1.0.5] - 2024-12-23

### Fixed
- Resolved Android build configuration issues
- Fixed package dependencies setup and initialization
- Optimized Gradle build settings for Android
- Fixed iOS permissions configuration

## [1.0.4] - 2024-12-22

### Fixed
- Updated React Native Screens configuration for React Navigation v7 compatibility
- Fixed navigation theme implementation for Poppins font family

### Changed
- Simplified navigation container theme configuration
- Removed deprecated font configurations

## [1.0.3] - 2024-12-21

### Added
- Enhanced template structure with additional hooks and utilities
- Added new dependencies:
  - @react-native-camera-roll/camera-roll ^7.9.0
  - @react-native-community/datetimepicker ^8.2.0
  - @react-native-community/image-editor ^4.2.1
  - @react-native-community/netinfo ^11.4.1
  - @react-native-community/slider ^4.5.5
  - @shopify/flash-list ^1.7.2

### Updated
- Updated React Navigation to v7
- Updated dependencies to latest versions:
  - @react-navigation/bottom-tabs ^7.2.0
  - @react-navigation/drawer ^7.1.1
  - @react-navigation/material-top-tabs ^7.1.0
  - @react-navigation/native ^7.0.14
  - @react-navigation/native-stack ^7.2.0
  - @reduxjs/toolkit ^2.5.0

### Changed
- Improved project structure and organization
- Enhanced iOS configuration
- Updated Android Gradle configuration

## [1.0.2] - 2024-12-20

### Added
- Initial template setup with TypeScript support
- Basic navigation structure
- Redux integration with persist storage
- Common hooks and utilities

### Changed
- Updated project dependencies
- Improved documentation

## [1.0.1] - 2024-12-19

### Added
- Basic React Native template structure
- Essential project configuration
- Initial README documentation

## [1.0.0] - 2024-12-18

### Added
- Initial release
- Basic project setup
- Core dependencies 