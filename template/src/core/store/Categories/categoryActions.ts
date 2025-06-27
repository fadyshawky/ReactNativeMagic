import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleFetchJsonResponse} from '../../api/responseHandlers';
import {post} from '../../api/serverHeaders';
import {RootState} from '../rootReducer';
import {extractServerError} from '../../api/errorHandler';

export const getCategories = createAsyncThunk(
  'categories/list',
  async (
    {data: {limit}}: {data: {limit?: number}},
    {rejectWithValue, getState, dispatch}: any,
  ) => {
    try {
      const token = (getState() as RootState).user.accessToken;

      const response = await post({
        url: 'serviceMangement/Category/get_categories',
        data: {limit},
        config: {
          headers: {
            Authorization: `${token}`,
          },
        },
      });

      return handleFetchJsonResponse(response);
    } catch (e: any) {
      // Extract the server error from the Axios error
      const serverError = extractServerError(e);
      return rejectWithValue(serverError);
    }
  },
);
