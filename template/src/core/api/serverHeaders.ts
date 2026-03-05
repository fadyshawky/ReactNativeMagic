import axios, {AxiosDefaults, AxiosError, AxiosResponse} from 'axios';
import {store} from '../store/store';
import {setLogout} from '../store/user/userSlice';
import {API_BASE_URL} from '../config';

export const defaultHeaders: HeadersInit = {
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
  headers: {
    ...defaultHeaders,
  },
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

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (
      originalRequest?.url?.includes('/login') ||
      originalRequest?.url?.includes('/refresh-token')
    ) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 || error.response?.status === 402) {
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
