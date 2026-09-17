import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoadState} from '../../../../types';
import {newState} from '../../../common/utils/newState';
import {handleErrorResponse} from '../../api/responseHandlers';
import {refreshUserToken, userLogin, verifyOTP} from './userActions';
import {UserInitialState, UserState} from './userState';

function loginHandler(state: UserState, action: PayloadAction<any>) {
  const payload = action.payload ?? {};
  return newState(state, {
    accessToken: payload.accessToken ?? state.accessToken,
    refreshToken: payload.refreshToken ?? state.refreshToken,
    user: payload.user ?? state.user,
    loginLoading: LoadState.allIsLoaded,
  });
}

function loginLoadingHandler(state: UserState) {
  return newState(state, {
    loginLoading: LoadState.pullToRefresh,
  });
}

function loginErrorHandler(state: UserState, action: any) {
  handleErrorResponse((action.payload?.message as string) || 'Login failed');
  return newState(state, {loginLoading: LoadState.error});
}

function logoutHandler() {
  return UserInitialState;
}

function setFcmTokenHandler(state: UserState, action: PayloadAction<string>) {
  return newState(state, {fcmToken: action.payload});
}

function setTokensHandler(
  state: UserState,
  action: PayloadAction<{accessToken: string; refreshToken?: string}>,
) {
  return newState(state, {
    accessToken: action.payload.accessToken,
    refreshToken: action.payload.refreshToken ?? state.refreshToken,
  });
}

export const {reducer: UserReducer, actions} = createSlice({
  name: 'user',
  initialState: UserInitialState,
  reducers: {
    setLogout: logoutHandler,
    updateFcmToken: setFcmTokenHandler,
    setTokens: setTokensHandler,
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.fulfilled, loginHandler)
      .addCase(userLogin.rejected, loginErrorHandler)
      .addCase(userLogin.pending, loginLoadingHandler)
      .addCase(verifyOTP.fulfilled, loginHandler)
      .addCase(verifyOTP.rejected, loginErrorHandler)
      .addCase(verifyOTP.pending, loginLoadingHandler)
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        const payload = action.payload ?? {};
        return newState(state, {
          accessToken: payload.accessToken ?? state.accessToken,
          refreshToken: payload.refreshToken ?? state.refreshToken,
        });
      });
  },
});

export const {setLogout, updateFcmToken, setTokens} = actions;
