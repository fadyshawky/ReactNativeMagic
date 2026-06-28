/**
 * @format
 */
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {queueNotificationRouteFromBackgroundData} from './src/core/notifications/notificationService';
import './src/sheetManager/sheets';

// Background / headless FCM handler. Must be registered BEFORE AppRegistry.
// Queues the route so it can be applied once the UI is ready and the user is logged in.
messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (remoteMessage?.data) {
    queueNotificationRouteFromBackgroundData(remoteMessage.data);
  }
});

AppRegistry.registerComponent(appName, () => App);
