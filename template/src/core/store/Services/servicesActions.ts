import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleFetchJsonResponse} from '../../api/responseHandlers';
import {post} from '../../api/serverHeaders';
import {RootState} from '../rootReducer';
import {extractServerError} from '../../api/errorHandler';
import {ensureString} from '../../utils/stringUtils';

export const getServices = createAsyncThunk(
  'services/list',
  async (
    {
      data,
    }: {
      data: {
        service_provider_id?: string;
        fawry_provider_id?: string;
        category_id?: string;
      };
    },
    {rejectWithValue, getState, dispatch}: any,
  ) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await post({
        url: 'listServices',
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

export const getService = createAsyncThunk(
  'services/single',
  async (
    {data}: {data: {fawry_service_id?: string; bee_service_id?: string}},
    {rejectWithValue, getState, dispatch}: any,
  ) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await post({
        url: 'serviceMangement/getService',
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

export const getServiceById = createAsyncThunk(
  'services/single/by/id',
  async (
    {data}: {data: {BillTypeCode?: string}},
    {rejectWithValue, getState, dispatch}: any,
  ) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await post({
        url: 'serviceMangement/getService',
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

export const enquireService = createAsyncThunk(
  'services/enquireService',
  async ({data}: any, {rejectWithValue, getState, dispatch}: any) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await post({
        url: 'serviceMangement/fawry/bill-inquiry',
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

export const payService = createAsyncThunk(
  'services/payService',
  async ({data}: any, {rejectWithValue, getState, dispatch}: any) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await post({
        url: 'serviceMangement/fawry/payment',
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

export const reverseService = createAsyncThunk(
  'services/reverseService',
  async ({data}: any, {rejectWithValue, getState, dispatch}: any) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await post({
        url: '/serviceMangement/fawry/reversePayment',
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
