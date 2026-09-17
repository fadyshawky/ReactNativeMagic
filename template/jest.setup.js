/* eslint-env jest */

require('react-native-gesture-handler/jestSetup');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-safe-area-context', () => {
  const mock = require('react-native-safe-area-context/jest/mock');
  return mock.default || mock;
});

jest.mock('react-native-config', () => ({
  API_BASE_URL: 'http://localhost:3000',
  ENVIRONMENT: 'test',
  APP_ID: 'com.test.app',
  ANDROID_APP_ID: 'com.test.app',
  BUNDLE_ID: 'com.test.app',
  STORYBOOK: 'false',
}));

// RNFirebase v26+ is modular-only: free functions that take the Messaging instance.
jest.mock('@react-native-firebase/messaging', () => ({
  __esModule: true,
  getMessaging: jest.fn(() => ({})),
  requestPermission: jest.fn().mockResolvedValue(1),
  getToken: jest.fn().mockResolvedValue('test-fcm-token'),
  onMessage: jest.fn().mockReturnValue(() => {}),
  onNotificationOpenedApp: jest.fn().mockReturnValue(() => {}),
  getInitialNotification: jest.fn().mockResolvedValue(null),
  onTokenRefresh: jest.fn().mockReturnValue(() => {}),
  setBackgroundMessageHandler: jest.fn(),
  AuthorizationStatus: {
    NOT_DETERMINED: -1,
    DENIED: 0,
    AUTHORIZED: 1,
    PROVISIONAL: 2,
  },
}));

jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: {
    addEventListener: jest.fn().mockReturnValue(() => {}),
    fetch: jest.fn().mockResolvedValue({
      isConnected: true,
      isInternetReachable: true,
    }),
  },
}));

jest.mock('react-native-snackbar', () => ({
  Snackbar: {
    show: jest.fn(),
    dismiss: jest.fn(),
    LENGTH_SHORT: 1,
    LENGTH_LONG: 2,
    LENGTH_INDEFINITE: 3,
  },
}));

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
