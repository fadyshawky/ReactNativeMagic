import {createSlice} from '@reduxjs/toolkit';
import {LoadState} from '../../../../types';
import {newState} from '../../../common/utils/newState';
import {handleErrorResponse} from '../../api/responseHandlers';
import {
  resetPassword,
  userLogin,
  getBalance,
  verifyOTP,
  fetchHistoryDetails,
  fetchHistory,
} from './userActions';
import {UserInitialState, UserPayload, UserState} from './userState';
import {cloneDeep, uniqBy} from 'lodash';

function loginHandler(state: UserState, payload: {payload: UserPayload}) {
  return newState(state, {
    tempToken: payload.payload.token,
    loginLoading: LoadState['allIsLoaded'],
  });
}
function loginLoadingHandler(state: UserState) {
  return newState(state, {
    loginLoading: LoadState['pullToRefresh'],
  });
}

function loginErrorHandler(
  state: UserState,
  payload: {payload: {message: string}},
) {
  console.error('payload: ', JSON.stringify(payload));
  handleErrorResponse((payload.payload.message as string) || 'Login failed');
  return newState(state, {
    loginLoading: LoadState['error'],
  });
}

function verifyOTPHandler(state: UserState, payload: {payload: UserPayload}) {
  return newState(state, {
    user: {
      type: payload.payload.type,
      mobile_number: payload.payload.mobile_number,
      full_name: payload.payload.fullname,
      merchantStore: payload.payload.merchantStore,
      status: payload.payload.status,
    },
    accessToken: payload.payload.token,
    loginLoading: LoadState['allIsLoaded'],
    current_balance: payload?.payload?.current_balance?.find(
      i => i.name === 'Deposit',
    )?.value,
    daily_commission: payload?.payload?.current_balance?.find(
      i => i.name === 'Daily Commission',
    )?.value,
  });
}
function verifyOTPLoadingHandler(state: UserState) {
  return newState(state, {
    loginLoading: LoadState['pullToRefresh'],
  });
}

function verifyOTPErrorHandler(
  state: UserState,
  payload: {payload: {message: string}},
) {
  handleErrorResponse(
    (payload.payload.message as string) || 'Verify OTP failed',
  );
  return newState(state, {
    loginLoading: LoadState['error'],
  });
}

function logoutHandler(state: UserState) {
  return newState(state, UserInitialState);
}

function resetPasswordHandler(
  state: UserState,
  payload: {payload: UserPayload},
) {
  return newState(state, {
    user: {
      ...state.user,
      status: payload.payload.status,
    },
    loginLoading: LoadState['allIsLoaded'],
  });
}

function resetPasswordLoadingHandler(state: UserState) {
  return newState(state, {
    loginLoading: LoadState['pullToRefresh'],
  });
}

function getBalanceHandler(state: UserState, payload: {payload: UserPayload}) {
  return newState(state, {
    current_balance: payload?.payload?.balance?.find(i => i.name === 'Deposit')
      ?.value,
    daily_commission: payload?.payload?.balance?.find(
      i => i.name === 'Daily Commission',
    )?.value,
    loginLoading: LoadState['allIsLoaded'],
  });
}

function getBalanceLoadingHandler(state: UserState) {
  return newState(state, {
    loginLoading: LoadState['pullToRefresh'],
  });
}

function getBalanceErrorHandler(
  state: UserState,
  payload: {payload: {message: string}},
) {
  handleErrorResponse((payload.payload.message as string) || 'Register failed');
  return newState(state, {
    loginLoading: LoadState['error'],
  });
}

function updateHandler(state: UserState, payload: any) {
  return newState(state, {
    user: {
      ...state.user,
      ...payload.payload,
    },
  });
}

function resetPasswordErrorHandler(
  state: UserState,
  payload: {payload: {message: string}},
) {
  handleErrorResponse(
    (payload.payload.message as string) || 'Password reset failed',
  );
  return newState(state, {
    loginLoading: LoadState['error'],
  });
}

function setFavoriteCategoriesHandler(
  state: UserState,
  payload: {payload: number},
) {
  if (!state.favoriteCategories) {
    state.favoriteCategories = [];
  }
  state.favoriteCategories.push(payload.payload);
}

function setFavoriteProvidersHandler(
  state: UserState,
  payload: {payload: number},
) {
  if (!state.favoriteProviders) {
    state.favoriteProviders = [];
  }
  state.favoriteProviders.push(payload.payload);
}

function removeFavoriteCategoriesHandler(
  state: UserState,
  payload: {payload: number},
) {
  if (state.favoriteCategories) {
    state.favoriteCategories = state.favoriteCategories.filter(
      id => id !== payload.payload,
    );
  }
}

function removeFavoriteProvidersHandler(
  state: UserState,
  payload: {payload: number},
) {
  if (state.favoriteProviders) {
    state.favoriteProviders = state.favoriteProviders.filter(
      id => id !== payload.payload,
    );
  }
}

function fetchHistoryHandler(
  state: UserState,
  payload: {payload: UserPayload},
) {
  let tmp = cloneDeep(state.history);
  tmp = [...tmp, ...payload.payload.requests];
  tmp = uniqBy(tmp, 'transaction_reference_num');
  return newState(state, {
    history: tmp,
  });
}

function fetchHistoryLoadingHandler(state: UserState) {
  return newState(state, {
    loginLoading: LoadState['pullToRefresh'],
  });
}

function fetchHistoryErrorHandler(
  state: UserState,
  payload: {payload: {message: string}},
) {
  handleErrorResponse(
    (payload.payload.message as string) || 'Fetch history failed',
  );
}

function fetchHistoryDetailsHandler(
  state: UserState,
  payload: {payload: UserPayload},
) {
  return newState(state, {
    historyDetails: payload.payload.data,
  });
}

function fetchHistoryDetailsLoadingHandler(state: UserState) {
  return newState(state, {
    loginLoading: LoadState['pullToRefresh'],
  });
}

function fetchHistoryDetailsErrorHandler(
  state: UserState,
  payload: {payload: {message: string}},
) {
  handleErrorResponse(
    (payload.payload.message as string) || 'Fetch history details failed',
  );
}

function clearHistoryHandler(state: UserState) {
  return newState(state, {
    history: UserInitialState.history,
  });
}

export const {reducer: UserReducer, actions} = createSlice({
  name: 'user',
  initialState: UserInitialState,
  reducers: {
    setLogin: loginHandler,
    setLoginLoading: loginLoadingHandler,
    setLoginError: loginLoadingHandler,
    setLogout: logoutHandler,
    setUpdate: updateHandler,
    setFavoriteCategories: setFavoriteCategoriesHandler,
    setFavoriteProviders: setFavoriteProvidersHandler,
    removeFavoriteCategories: removeFavoriteCategoriesHandler,
    removeFavoriteProviders: removeFavoriteProvidersHandler,
    clearHistory: clearHistoryHandler,
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.fulfilled, loginHandler)
      .addCase(userLogin.rejected, loginErrorHandler)
      .addCase(userLogin.pending, loginLoadingHandler)
      .addCase(resetPassword.fulfilled, resetPasswordHandler)
      .addCase(resetPassword.rejected, resetPasswordErrorHandler)
      .addCase(resetPassword.pending, resetPasswordLoadingHandler)
      .addCase(getBalance.fulfilled, getBalanceHandler)
      .addCase(getBalance.rejected, getBalanceErrorHandler)
      .addCase(getBalance.pending, getBalanceLoadingHandler)
      .addCase(verifyOTP.fulfilled, verifyOTPHandler)
      .addCase(verifyOTP.rejected, verifyOTPErrorHandler)
      .addCase(verifyOTP.pending, verifyOTPLoadingHandler)
      .addCase(fetchHistory.fulfilled, fetchHistoryHandler)
      .addCase(fetchHistory.rejected, fetchHistoryErrorHandler)
      .addCase(fetchHistory.pending, fetchHistoryLoadingHandler)
      .addCase(fetchHistoryDetails.fulfilled, fetchHistoryDetailsHandler)
      .addCase(fetchHistoryDetails.rejected, fetchHistoryDetailsErrorHandler)
      .addCase(fetchHistoryDetails.pending, fetchHistoryDetailsLoadingHandler);
  },
});

export const {
  setLogout,
  setUpdate,
  setFavoriteCategories,
  setFavoriteProviders,
  removeFavoriteCategories,
  removeFavoriteProviders,
  clearHistory,
} = actions;
