/**
 * Routes actually registered in the navigators:
 *   AuthStack  → Splash, Login, OTP
 *   Main tabs  → Main (Home), Account (Profile)
 * Keep this in sync with AuthStack.tsx / MainStack.tsx when you add a screen.
 */
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTP: {phone?: string};
  Main: undefined;
  Components: undefined;
  Account: undefined;
};
