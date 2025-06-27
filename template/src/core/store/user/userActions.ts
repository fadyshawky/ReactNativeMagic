import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleFetchJsonResponse} from '../../api/responseHandlers';
import {post} from '../../api/serverHeaders';
import {RootState} from '../rootReducer';
import {extractServerError} from '../../api/errorHandler';
import {ensureString} from '../../utils/stringUtils';

export const userLogin = createAsyncThunk(
  'user/login',
  async (
    {phone, password}: {phone: string; password: string},
    {rejectWithValue, getState, dispatch}: any,
  ) => {
    try {
      const data: {
        mobile_number: string;
        mpin: string;
        scheme_id: number;
      } = {
        mobile_number: phone,
        mpin: password,
        scheme_id: 1,
      };
      const response = await post({
        url: 'wallet_users/login',
        data,
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
      verification_code: string;
      mobile_number: string;
      device_token?: string;
      scheme_id: number;
    },
    {rejectWithValue, getState, dispatch}: any,
  ) => {
    try {
      const data: {
        mobile_number: string;
        verification_code: string;
        device_token?: string;
        scheme_id: number;
      } = {
        mobile_number,
        verification_code,
        device_token: undefined,
        scheme_id: 1,
      };

      const token = (getState() as RootState).user.tempToken;

      const response = await post({
        url: 'wallet_users/verifylogin',
        data,
        config: {
          headers: {
            Authorization: `${token}`,
          },
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

export const getBalance = createAsyncThunk(
  'user/getBalance',
  async (_, {rejectWithValue, getState, dispatch}: any) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await post({
        url: 'wallet_users/getbalance',
        data: {},
        config: {
          headers: {
            Authorization: `${token}`,
          },
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

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (
    {
      mpin,
      new_mpin,
      confirm_mpin,
    }: {mpin: string; new_mpin: string; confirm_mpin: string},
    {rejectWithValue, getState},
  ) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await post({
        url: 'wallet_users/force-update-mpin',
        data: {mpin, new_mpin, confirm_mpin},
        config: {
          headers: {
            Authorization: `${token}`,
          },
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

export const fetchHistory = createAsyncThunk(
  'user/fetchHistory',
  async (
    {data}: {data: {page: number; limit: number}},
    {rejectWithValue, getState},
  ) => {
    try {
      const token = (getState() as RootState).user.accessToken;
      const response = await post({
        url: 'wallet_users/history',
        data: {page: data.page, limit: data.limit},
        config: {
          headers: {
            Authorization: `${token}`,
          },
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

export const fetchHistoryDetails = createAsyncThunk(
  'user/fetchHistoryDetails',
  async ({trxRef}: {trxRef: string}, {rejectWithValue, getState}) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await post({
        url: 'wallet_users/history/details',
        data: {trxRef},
        config: {
          headers: {
            Authorization: `${token}`,
          },
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
