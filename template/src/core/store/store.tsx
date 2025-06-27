import React from 'react';
import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {
  createTransform,
  PersistConfig,
  persistReducer,
  persistStore,
} from 'redux-persist';
import {rootReducer, RootState} from './rootReducer';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createWhitelistFilter} from 'redux-persist-transform-filter';
import {getUniqueId} from 'react-native-device-info';
import CryptoJS from 'crypto-js';

let deviceId: string;
getUniqueId()
  .then(res => {
    deviceId = res;
  })
  .catch(error => {});

const encrypt = createTransform(
  (inboundState, key) => {
    if (!inboundState) {
      return inboundState;
    }

    const cryptedText = CryptoJS.AES.encrypt(
      JSON.stringify(inboundState),
      deviceId,
    );

    return cryptedText?.toString();
  },
  (outboundState, key) => {
    if (!outboundState) {
      return outboundState;
    }
    const bytes = CryptoJS.AES.decrypt(outboundState, deviceId);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  },
);

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  timeout: 1000,
  transforms: [
    createWhitelistFilter('app'),
    createWhitelistFilter('user'),
    createWhitelistFilter('services'),
    createWhitelistFilter('providers'),
    createWhitelistFilter('categories'),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {
        warnAfter: 300,
        ignoredPaths: [
          'services.inquiredBill',
          'providers.providers',
          'categories.categories',
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const reduxProvider = (Component: any) => (props: any) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
};
