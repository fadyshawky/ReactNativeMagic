import axios, {AxiosDefaults} from 'axios';
import DeviceInfo from 'react-native-device-info';

export const defaultHeaders: HeadersInit_ = {
  'app-version': DeviceInfo.getVersion(),
  'serial-number': DeviceInfo.getSerialNumberSync(),
  Connection: 'keep-alive',
  'Content-Type': 'application/json',
};
declare type MethodData = {
  url: AxiosDefaults['httpsAgent'];
  data?: AxiosDefaults['data'];
  config?: any;
};

const baseURL = '';

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    ...defaultHeaders,
  },
});

// Export HTTP methods using the configured instance
export const post = ({url, data, config}: MethodData) =>
  instance.post(url, data, config);
export const get = ({url, config}: MethodData) => instance.get(url, config);
export const put = ({url, data, config}: MethodData) =>
  instance.put(url, data, config);
export const deleteApi = ({url, config}: MethodData) =>
  instance.delete(url, config);
