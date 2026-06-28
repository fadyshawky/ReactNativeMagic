import {createAsyncThunk} from '@reduxjs/toolkit';
import {extractServerError} from '../../api/errorHandler';
import {handleFetchJsonResponse} from '../../api/responseHandlers';
import {get} from '../../api/serverHeaders';
import {ensureString} from '../../utils/stringUtils';
import {Category} from './categoriesState';

/**
 * Example data thunk — GETs /categories and returns the list.
 * Mirrors the user thunks: api helper + extractServerError + rejectWithValue.
 */
export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  {rejectValue: {message: string}}
>('categories/fetch', async (_arg, {rejectWithValue}) => {
  try {
    const response = await get({url: '/categories'});
    const data = handleFetchJsonResponse(response);
    return (data?.data ?? data ?? []) as Category[];
  } catch (e: any) {
    const serverError = extractServerError(e);
    return rejectWithValue({message: ensureString(serverError.message)});
  }
});
