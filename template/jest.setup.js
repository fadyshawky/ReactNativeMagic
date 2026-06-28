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

jest.mock('@react-native-firebase/messaging', () => {
  const messaging = () => ({
    requestPermission: jest.fn().mockResolvedValue(1),
    getToken: jest.fn().mockResolvedValue('test-fcm-token'),
    onMessage: jest.fn().mockReturnValue(() => {}),
    onNotificationOpenedApp: jest.fn().mockReturnValue(() => {}),
    getInitialNotification: jest.fn().mockResolvedValue(null),
    onTokenRefresh: jest.fn().mockReturnValue(() => {}),
    setBackgroundMessageHandler: jest.fn(),
  });
  messaging.setBackgroundMessageHandler = jest.fn();
  return {__esModule: true, default: messaging};
});

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
  __esModule: true,
  default: {
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
