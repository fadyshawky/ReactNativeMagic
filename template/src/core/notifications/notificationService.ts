import {
  getInitialNotification,
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  onTokenRefresh,
  requestPermission,
  type RemoteMessage,
} from '@react-native-firebase/messaging';
import {AppState, AppStateStatus, Platform} from 'react-native';
import {Snackbar} from 'react-native-snackbar';
import {store} from '../store/store';
import {updateFcmToken} from '../store/user/userSlice';
import {isUserLoggedIn} from './notificationAuth';
import {routeFromNotificationData} from './routeFromNotificationData';

type Data = RemoteMessage['data'];

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
      // Deprecated since RNFirebase v25 in favour of react-native-permissions
      // (`requestNotifications`), which needs the Notifications handler enabled
      // in ios/Podfile `setup_permissions`. Still functional in v26.
      await requestPermission(getMessaging());
    }
  } catch (e) {
    if (__DEV__) console.warn('[push] permission request failed', e);
  }
}

async function syncToken() {
  try {
    const token = await getToken(getMessaging());
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

  let unsubOnMessage: () => void = () => {};
  let unsubOnOpenedApp: () => void = () => {};
  let unsubOnTokenRefresh: () => void = () => {};

  try {
    const messaging = getMessaging();

    unsubOnMessage = onMessage(messaging, remoteMessage => {
      const title =
        remoteMessage.notification?.title ?? remoteMessage.data?.title;
      const body = remoteMessage.notification?.body ?? remoteMessage.data?.body;
      const text = [title, body].filter(Boolean).join(' — ');
      if (text) {
        Snackbar.show({text, duration: Snackbar.LENGTH_SHORT});
      }
    });

    unsubOnOpenedApp = onNotificationOpenedApp(messaging, remoteMessage => {
      if (!remoteMessage?.data) return;
      if (isUserLoggedIn()) {
        routeFromNotificationData(remoteMessage.data as Record<string, string>);
      } else {
        pendingBackgroundNotificationData = remoteMessage.data;
      }
    });

    getInitialNotification(messaging)
      .then(remoteMessage => {
        if (!remoteMessage?.data) return;
        pendingBackgroundNotificationData = remoteMessage.data;
        tryFlushPending();
      })
      .catch(() => {});

    unsubOnTokenRefresh = onTokenRefresh(messaging, token => {
      store.dispatch(updateFcmToken(token));
    });
  } catch (e) {
    // Firebase isn't configured yet (no google-services.json /
    // GoogleService-Info.plist). The app still boots; push stays inert until
    // you add your Firebase config — see docs/CUSTOMIZATION.md.
    if (__DEV__) {
      console.warn(
        '[push] Firebase Messaging unavailable — skipping push listeners. Add your Firebase config to enable notifications.',
        e,
      );
    }
  }

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
