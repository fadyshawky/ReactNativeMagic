import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleFetchJsonResponse} from '../../api/responseHandlers';
import {get, post} from '../../api/serverHeaders';
import {RootState} from '../rootReducer';
import {extractServerError} from '../../api/errorHandler';
import {ensureString} from '../../utils/stringUtils';

export const getProviders = createAsyncThunk(
  'providers/getProviders',
  async (
    {
      data: {limit, category_id},
    }: {data: {limit?: number; category_id?: number}},
    {rejectWithValue, getState, dispatch}: any,
  ) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await post({
        url: 'serviceProvider_category',
        data: {limit, category_id},
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

export const getProviderById = createAsyncThunk(
  'providers/getProviderById',
  async (
    {data: {BillerId}}: {data: {BillerId?: number}},
    {rejectWithValue, getState, dispatch}: any,
  ) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await get({
        url: `serviceMangement/get-single-provider/${BillerId}`,
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

export const getHomeProviders = createAsyncThunk(
  'providers/getHomeProviders',
  async (
    {
      data: {limit, category_id},
    }: {data: {limit?: number; category_id?: number}},
    {rejectWithValue, getState, dispatch}: any,
  ) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await post({
        url: 'serviceProvider_category',
        data: {limit, category_id},
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
