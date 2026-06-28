import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {LoadState} from '../../../../types';
import {newState} from '../../../common/utils/newState';
import {fetchCategories} from './categoriesActions';
import {
  Category,
  CategoriesInitialState,
  CategoriesState,
} from './categoriesState';

function pendingHandler(state: CategoriesState) {
  return newState(state, {
    loadState: state.categories.length
      ? LoadState.pullToRefresh
      : LoadState.firstLoad,
    error: null,
  });
}

function fulfilledHandler(
  state: CategoriesState,
  action: PayloadAction<Category[]>,
) {
  return newState(state, {
    categories: action.payload ?? [],
    loadState: LoadState.allIsLoaded,
    error: null,
  });
}

function rejectedHandler(
  state: CategoriesState,
  action: PayloadAction<{message: string} | undefined>,
) {
  return newState(state, {
    loadState: LoadState.error,
    error: action.payload?.message ?? 'Failed to load categories',
  });
}

export const {reducer: CategoriesReducer} = createSlice({
  name: 'categories',
  initialState: CategoriesInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, pendingHandler)
      .addCase(fetchCategories.fulfilled, fulfilledHandler)
      .addCase(fetchCategories.rejected, rejectedHandler);
  },
});
