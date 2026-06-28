import {store} from '../store/store';

export function isUserLoggedIn(): boolean {
  const state = store.getState();
  return !!state.user?.accessToken;
}
