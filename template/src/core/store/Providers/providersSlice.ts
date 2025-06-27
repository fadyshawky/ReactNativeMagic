import {createSlice} from '@reduxjs/toolkit';
import {newState} from '../../../common/utils/newState';
import {handleErrorResponse} from '../../api/responseHandlers';
import {
  getHomeProviders,
  getProviderById,
  getProviders,
} from './providersActions';
import {
  ProviderPayload,
  ProvidersInitialState,
  ProvidersState,
  ServiceProvider,
} from './providersState';
import {navigationRef} from '../../../navigation/RootNavigation';

function providersHandler(
  state: ProvidersState,
  payload: {payload: ProviderPayload},
) {
  return newState(state, {
    providers: payload.payload.Service_providers,
    loading: false,
  });
}

function providersLoadingHandler(state: ProvidersState) {
  return newState(state, {
    loading: true,
  });
}

function providersErrorHandler(
  state: ProvidersState,
  payload: {payload: {message: string}},
) {
  handleErrorResponse(
    payload.payload.message || 'get service providers failed',
  );
  return newState(state, {
    loading: false,
  });
}

function homeProvidersHandler(
  state: ProvidersState,
  payload: {payload: ProviderPayload},
) {
  return newState(state, {
    homeProviders: payload.payload.Service_providers,
    loading: false,
  });
}

function homeProvidersLoadingHandler(state: ProvidersState) {
  return newState(state, {
    loading: true,
  });
}

function homeProvidersErrorHandler(
  state: ProvidersState,
  payload: {payload: {message: string}},
) {
  handleErrorResponse(
    payload.payload.message || 'get service providers failed',
  );
  return newState(state, {
    loading: false,
  });
}

function providerLogoutHandler(state: ProvidersState) {
  return newState(state, ProvidersInitialState);
}

function selectedProviderHandler(
  state: ProvidersState,
  payload: {payload: ServiceProvider},
) {
  return newState(state, {
    selectedProvider: payload.payload,
  });
}

function ProviderHandler(
  state: ProvidersState,
  payload: {payload: {data: ServiceProvider}},
) {
  return newState(state, {
    selectedProvider: payload.payload.data,
    loading: false,
  });
}

function resetProvidersHandler(state: ProvidersState) {
  return newState(state, {
    providers: [],
  });
}

function clearSelectedProviderHandler(state: ProvidersState) {
  return newState(state, {
    selectedProvider: ProvidersInitialState.selectedProvider,
  });
}

export const {reducer: ProvidersReducer, actions} = createSlice({
  name: 'providers',
  initialState: ProvidersInitialState,
  reducers: {
    setProvidersLogout: providerLogoutHandler,
    setSelectedProvider: selectedProviderHandler,
    resetProviders: resetProvidersHandler,
    clearSelectedProvider: clearSelectedProviderHandler,
  },
  extraReducers: builder => {
    builder
      .addCase(getProviders.fulfilled, providersHandler)
      .addCase(getProviders.rejected, providersErrorHandler)
      .addCase(getProviders.pending, providersLoadingHandler)
      .addCase(getHomeProviders.fulfilled, homeProvidersHandler)
      .addCase(getHomeProviders.rejected, homeProvidersErrorHandler)
      .addCase(getHomeProviders.pending, homeProvidersLoadingHandler)
      .addCase(getProviderById.fulfilled, ProviderHandler)
      .addCase(getProviderById.rejected, providersErrorHandler)
      .addCase(getProviderById.pending, providersLoadingHandler);
  },
});

export const {
  setProvidersLogout,
  setSelectedProvider,
  resetProviders,
  clearSelectedProvider,
} = actions;
