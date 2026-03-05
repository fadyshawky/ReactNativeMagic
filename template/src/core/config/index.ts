/**
 * App config – single place for API base URL, env, and feature toggles.
 * Change your app's API and feature toggles here and in .env.
 */
import Config from 'react-native-config';

const config = Config as Record<string, string | undefined>;
export const API_BASE_URL =
  config.API_BASE_URL || config.API_URL || 'https://api.example.com';
export const ENV = config.ENV || config.ENVIRONMENT || 'development';

/** Optional: enable RTL layout (e.g. for Arabic). */
export const enableRTL = true;
