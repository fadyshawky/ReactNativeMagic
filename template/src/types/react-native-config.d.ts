declare module 'react-native-config' {
  export interface NativeConfig {
    API_BASE_URL: string;
    [key: string]: string;
  }
  const Config: NativeConfig;
  export default Config;
}
