import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleFetchJsonResponse} from '../../api/responseHandlers';
import {post} from '../../api/serverHeaders';

export const userLogin = createAsyncThunk(
  'user/login',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue, getState, dispatch}: any,
  ) => {
    try {
      const data: {email: string; password: string} = {
        email,
        password,
      };

      const response = await post({
        url: '/login',
        data,
      });

      return handleFetchJsonResponse(response);
    } catch (e: any) {
      return rejectWithValue(e?.response);
    }
  },
);
