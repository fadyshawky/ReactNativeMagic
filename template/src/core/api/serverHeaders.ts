import axios, {AxiosDefaults} from 'axios';
import DeviceInfo from 'react-native-device-info';
import {fetch} from 'react-native-ssl-pinning';

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

const baseURL = 'https://sofapi.neo-dg.app/api/v1/mobile/';

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    ...defaultHeaders,
  },
});

export async function configureSecureRequest() {
  // Only apply SSL pinning in production
  if (baseURL.includes('neopayplus')) {
    try {
      instance.defaults.adapter = (config: any) => {
        const url = `${config.baseURL}${config.url}`;
        const fetchOptions: any = {
          method: config.method?.toUpperCase() || 'GET',
          timeoutInterval: 0,
          headers: {
            ...config.headers,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // Don't double stringify the data
          body: config.data ? config.data : undefined,
          sslPinning: {
            certs: ['STAR.neopayplus.com'],
            allowInvalidCertificates: false,
            validatesDomainName: true,
          },
        };

        if (fetchOptions.method === 'GET' || fetchOptions.method === 'HEAD') {
          delete fetchOptions.body;
        }

        return fetch(url, fetchOptions)
          .then(async response => {
            const data = await response.json();
            return {
              data,
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
              config,
              request: {},
            };
          })
          .catch(error => {
            console.error('error: ', error);
            if (error === 'timeout') {
              throw new Error(error);
            } else if (JSON.parse(error?.bodyString)?.error) {
              throw new Error(JSON.parse(error?.bodyString)?.error);
            } else if (JSON.parse(error?.bodyString)?.message) {
              throw new Error(JSON.parse(error?.bodyString)?.message);
            }
          });
      };
    } catch (error) {
      console.info('error: ', error);
      throw error;
    }
  }
}

// Export HTTP methods using the configured instance
export const post = ({url, data, config}: MethodData) =>
  instance.post(url, data, config);
export const get = ({url, config}: MethodData) => instance.get(url, config);
export const put = ({url, data, config}: MethodData) =>
  instance.put(url, data, config);
export const deleteApi = ({url, config}: MethodData) =>
  instance.delete(url, config);
