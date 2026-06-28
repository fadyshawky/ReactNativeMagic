import {navigate, navigationRef} from '../../navigation/RootNavigation';

/**
 * Generic notification-tap router.
 *
 * FCM payloads carry routing hints in `data`. Convention:
 *   data.screen     – screen name in any registered navigator
 *   data.params     – JSON string of route params (optional)
 *
 * Extend per project: switch on `data.type` or `data.target` for
 * deeper routing logic.
 */
export function routeFromNotificationData(
  data: Record<string, string | undefined> | null | undefined,
) {
  if (!data || !navigationRef.isReady()) return false;

  const screen = data.screen;
  if (!screen) return false;

  let params: Record<string, unknown> | undefined;
  if (data.params) {
    try {
      params = JSON.parse(data.params);
    } catch {
      params = undefined;
    }
  }

  navigate(screen as never, params as never);
  return true;
}
