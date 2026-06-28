import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASE_URL} from '../../config';
import {extractServerError} from '../../api/errorHandler';
import {handleFetchJsonResponse} from '../../api/responseHandlers';
import {post} from '../../api/serverHeaders';
import {ensureString} from '../../utils/stringUtils';
import {RootState} from '../rootReducer';

export const userLogin = createAsyncThunk(
  'user/login',
  async (
    {phone, password}: {phone: string; password: string},
    {rejectWithValue}: any,
  ) => {
    try {
      const response = await post({
        url: '/login',
        data: {
          mobile_number: phone,
          mpin: password,
          scheme_id: 1,
        },
      });
      return handleFetchJsonResponse(response);
    } catch (e: any) {
      const serverError = extractServerError(e);
      return rejectWithValue({
        ...serverError,
        message: ensureString(serverError.message),
      });
    }
  },
);

export const verifyOTP = createAsyncThunk(
  'user/verifyOTP',
  async (
    {
      verification_code,
      mobile_number,
      device_token,
      scheme_id,
    }: {
      verification_code?: string;
      mobile_number?: string;
      device_token?: string;
      scheme_id?: number;
    },
    {rejectWithValue}: any,
  ) => {
    try {
      const response = await post({
        url: '/verify-otp',
        data: {verification_code, mobile_number, device_token, scheme_id},
      });
      return handleFetchJsonResponse(response);
    } catch (e: any) {
      const serverError = extractServerError(e);
      return rejectWithValue({
        ...serverError,
        message: ensureString(serverError.message),
      });
    }
  },
);

/**
 * Token refresh thunk.
 * Uses a bare axios call (no interceptor) so a failing refresh doesn't loop.
 * Returns the new tokens; userSlice handles persisting them.
 */
export const refreshUserToken = createAsyncThunk<
  {accessToken: string; refreshToken?: string},
  void,
  {state: RootState; rejectValue: {message: string}}
>('user/refreshToken', async (_arg, {getState, rejectWithValue}) => {
  try {
    const refreshToken = getState().user.refreshToken;
    if (!refreshToken) {
      return rejectWithValue({message: 'Missing refresh token'});
    }
    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh`,
      {refreshToken},
      {headers: {'Content-Type': 'application/json'}},
    );
    const data = response.data?.data ?? response.data ?? {};
    if (!data.accessToken) {
      return rejectWithValue({message: 'Refresh response missing accessToken'});
    }
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (e: any) {
    const serverError = extractServerError(e);
    return rejectWithValue({message: ensureString(serverError.message)});
  }
});
