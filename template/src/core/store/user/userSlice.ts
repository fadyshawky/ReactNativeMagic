import {createSlice} from '@reduxjs/toolkit';
import {LoadState} from '../../../../types';
import {newState} from '../../../common/utils/newState';
import {handleErrorResponse} from '../../api/responseHandlers';
import {userLogin} from './userActions';
import {UserInitialState, UserPayload, UserState} from './userState';

function loginHandler(state: UserState, payload: {payload: UserPayload}) {
  return newState(state, {
    user: payload.payload.user,
    accessToken: payload.payload.token,
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
  payload: {payload: string | unknown},
) {
  handleErrorResponse((payload.payload as string) || 'Login failed');
  return newState(state, {
    loginLoading: LoadState['error'],
  });
}

function logoutHandler(state: UserState) {
  return newState(state, UserInitialState);
}

function updateHandler(state: UserState, payload: any) {
  return newState(state, {
    user: {
      ...state.user,
      ...payload.payload,
    },
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
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.fulfilled, loginHandler)
      .addCase(userLogin.rejected, loginErrorHandler)
      .addCase(userLogin.pending, loginLoadingHandler);
  },
});

export const {setLogout, setUpdate} = actions;
