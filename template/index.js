/**
 * @format
 */
import 'react-native-gesture-handler';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {queueNotificationRouteFromBackgroundData} from './src/core/notifications/notificationService';
import './src/sheetManager/sheets';

// Background / headless FCM handler. Must be registered BEFORE AppRegistry.
// Wrapped so a freshly-generated app still boots before Firebase is configured
// (no google-services.json / GoogleService-Info.plist yet).
try {
  setBackgroundMessageHandler(getMessaging(), async remoteMessage => {
    if (remoteMessage?.data) {
      queueNotificationRouteFromBackgroundData(remoteMessage.data);
    }
  });
} catch (e) {
  if (__DEV__) {
    console.warn(
      '[push] Firebase Messaging unavailable — background handler not registered.',
      e,
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
