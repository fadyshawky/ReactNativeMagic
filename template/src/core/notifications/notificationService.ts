import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {AppState, AppStateStatus, Platform} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {store} from '../store/store';
import {updateFcmToken} from '../store/user/userSlice';
import {isUserLoggedIn} from './notificationAuth';
import {routeFromNotificationData} from './routeFromNotificationData';

type Data = FirebaseMessagingTypes.RemoteMessage['data'];

let pendingBackgroundNotificationData: Data | null = null;
let appStateSubscription: {remove: () => void} | null = null;
let unsubscribeStore: (() => void) | null = null;

export function queueNotificationRouteFromBackgroundData(data: Data) {
  pendingBackgroundNotificationData = data ?? null;
}

function tryFlushPending() {
  if (!pendingBackgroundNotificationData) return;
  if (!isUserLoggedIn()) return;
  const data = pendingBackgroundNotificationData;
  if (routeFromNotificationData(data as Record<string, string>)) {
    pendingBackgroundNotificationData = null;
  }
}

async function requestPermissionIfNeeded() {
  try {
    if (Platform.OS === 'ios') {
      await messaging().requestPermission();
    }
  } catch (e) {
    if (__DEV__) console.warn('[push] permission request failed', e);
  }
}

async function syncToken() {
  try {
    const token = await messaging().getToken();
    if (token) {
      store.dispatch(updateFcmToken(token));
    }
  } catch (e) {
    if (__DEV__) console.warn('[push] getToken failed', e);
  }
}

/**
 * Register all push-notification listeners.
 * Returns an unsubscribe function — call it on app unmount.
 *
 * Listeners covered:
 *  - cold-start tap (getInitialNotification)
 *  - foreground message (onMessage)
 *  - background tap (onNotificationOpenedApp)
 *  - token refresh (onTokenRefresh)
 *  - AppState resume + auth-state change → flush pending route
 */
export function startPushNotificationListeners() {
  requestPermissionIfNeeded();
  syncToken();

  const unsubOnMessage = messaging().onMessage(remoteMessage => {
    const title =
      remoteMessage.notification?.title ?? remoteMessage.data?.title;
    const body =
      remoteMessage.notification?.body ?? remoteMessage.data?.body;
    const text = [title, body].filter(Boolean).join(' — ');
    if (text) {
      Snackbar.show({text, duration: Snackbar.LENGTH_SHORT});
    }
  });

  const unsubOnOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
    if (!remoteMessage?.data) return;
    if (isUserLoggedIn()) {
      routeFromNotificationData(remoteMessage.data as Record<string, string>);
    } else {
      pendingBackgroundNotificationData = remoteMessage.data;
    }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (!remoteMessage?.data) return;
      pendingBackgroundNotificationData = remoteMessage.data;
      tryFlushPending();
    });

  const unsubOnTokenRefresh = messaging().onTokenRefresh(token => {
    store.dispatch(updateFcmToken(token));
  });

  appStateSubscription = AppState.addEventListener(
    'change',
    (state: AppStateStatus) => {
      if (state === 'active') tryFlushPending();
    },
  );

  let lastAccessToken = store.getState().user?.accessToken;
  unsubscribeStore = store.subscribe(() => {
    const next = store.getState().user?.accessToken;
    if (next && next !== lastAccessToken) {
      lastAccessToken = next;
      tryFlushPending();
    } else {
      lastAccessToken = next;
    }
  });

  return () => {
    unsubOnMessage();
    unsubOnOpenedApp();
    unsubOnTokenRefresh();
    appStateSubscription?.remove();
    appStateSubscription = null;
    unsubscribeStore?.();
    unsubscribeStore = null;
  };
}
