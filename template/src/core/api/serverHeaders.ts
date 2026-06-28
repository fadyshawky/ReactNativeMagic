import axios, {
  AxiosDefaults,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {API_BASE_URL} from '../config';
import {store} from '../store/store';
import {refreshUserToken} from '../store/user/userActions';
import {setLogout} from '../store/user/userSlice';

export const defaultHeaders: Record<string, string> = {
  Connection: 'keep-alive',
  'Content-Type': 'application/json',
};

declare type MethodData = {
  url: AxiosDefaults['httpsAgent'];
  data?: AxiosDefaults['data'];
  config?: any;
};

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {...defaultHeaders},
});

instance.interceptors.request.use(
  config => {
    const state = store.getState();
    const accessToken = state.user.accessToken;
    const locale = state.app?.language ?? 'en';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers.locale = locale;
    return config;
  },
  error => Promise.reject(error),
);

/**
 * Dedup concurrent 401s: only one refresh request in flight at a time;
 * other failing requests await the same promise and retry once the new
 * token is available.
 */
let refreshPromise: Promise<string | null> | null = null;

async function runRefresh(): Promise<string | null> {
  try {
    const result = await store.dispatch(refreshUserToken());
    if (refreshUserToken.fulfilled.match(result)) {
      return result.payload.accessToken;
    }
    return null;
  } catch {
    return null;
  }
}

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    const url = originalRequest?.url ?? '';
    const isAuthEndpoint =
      url.includes('/login') || url.includes('/auth/refresh');

    if (isAuthEndpoint) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!refreshPromise) {
        refreshPromise = runRefresh().finally(() => {
          refreshPromise = null;
        });
      }
      const newToken = await refreshPromise;
      if (newToken) {
        originalRequest.headers = {
          ...(originalRequest.headers ?? {}),
          Authorization: `Bearer ${newToken}`,
        };
        return instance.request(originalRequest);
      }
      store.dispatch(setLogout());
      return Promise.reject(error);
    }

    if (error.response?.status === 402) {
      store.dispatch(setLogout());
    }

    return Promise.reject(error);
  },
);

export const post = ({url, data, config}: MethodData) =>
  instance.post(url, data, config);
export const get = ({url, config}: MethodData) => instance.get(url, config);
export const put = ({url, data, config}: MethodData) =>
  instance.put(url, data, config);
export const deleteApi = ({url, config}: MethodData) =>
  instance.delete(url, config);
