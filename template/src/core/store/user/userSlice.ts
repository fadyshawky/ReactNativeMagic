import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep, uniqBy } from 'lodash';
import { LoadState } from '../../../../types';
import { newState } from '../../../common/utils/newState';
import { handleErrorResponse } from '../../api/responseHandlers';
import {
  userLogin
} from './userActions';
import { UserInitialState,  UserState } from './userState';

function loginHandler(state: UserState, payload: {payload: any}) {
  return newState(state, {
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

function logoutHandler(state: UserState) {
  return newState(state, UserInitialState);
}

export const {reducer: UserReducer, actions} = createSlice({
  name: 'user',
  initialState: UserInitialState,
  reducers: {
    setLogout: logoutHandler,
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.fulfilled, loginHandler)
      .addCase(userLogin.rejected, loginErrorHandler)
      .addCase(userLogin.pending, loginLoadingHandler);
  },
});

export const {
  setLogout,
} = actions;
