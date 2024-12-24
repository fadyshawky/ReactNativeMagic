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

export const userRegister = createAsyncThunk(
  'user/register',
  async (
    {
      fullName,
      email,
      password,
    }: {
      fullName: string;
      email: string;
      password: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const response = await post({
        url: '/register',
        data: {
          fullName,
          email,
          password,
        },
      });

      return handleFetchJsonResponse(response);
    } catch (e: any) {
      return rejectWithValue(e?.response);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({email}: {email: string}, {rejectWithValue}) => {
    try {
      const response = await post({
        url: '/reset-password',
        data: {email},
      });

      return handleFetchJsonResponse(response);
    } catch (e: any) {
      return rejectWithValue(e?.response);
    }
  },
);
