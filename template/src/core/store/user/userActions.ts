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
