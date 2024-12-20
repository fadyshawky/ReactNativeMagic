import Config from 'react-native-config';
import axios from 'axios';
import {AxiosDefaults} from 'axios';

export const defaultHeaders: HeadersInit_ = {
  Connection: 'keep-alive',
  'Content-Type': 'application/json',
};
declare type MethodData = {
  url: AxiosDefaults['httpsAgent'];
  data?: AxiosDefaults['data'];
  config?: any;
};

const instance = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 5000,
  maxRate: 100,
  headers: {
    Connection: 'keep-alive',
    'Content-Type': 'application/json',
  },
});

export const post = ({url, data, config}: MethodData) => {
  return instance.post(url, data, config);
};

export const get = ({url, config}: MethodData) => {
  return instance.get(url, config);
};

export const put = ({url, data, config}: MethodData) => {
  return instance.put(url, data, config);
};

export const deleteApi = ({url, config}: MethodData) => {
  return instance.delete(url, config);
};
