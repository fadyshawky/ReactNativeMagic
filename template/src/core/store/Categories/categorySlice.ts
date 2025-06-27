import {createSlice} from '@reduxjs/toolkit';
import {newState} from '../../../common/utils/newState';
import {handleErrorResponse} from '../../api/responseHandlers';
import {getCategories} from './categoryActions';
import {
  CategoriesInitialState,
  CategoriesState,
  Category,
  CategoryPayload,
} from './categoryState';
import {LoadState} from '../../../../types';

function getCategoriesHandler(
  state: CategoriesState,
  payload: {payload: CategoryPayload},
) {
  return newState(state, {
    categories: payload.payload.categories,
    settings: payload.payload.settings,
    loadState: LoadState.allIsLoaded,
  });
}
function getCategoriesLoadingHandler(state: CategoriesState) {
  return newState(state, {
    loadState: LoadState.loadingMore,
  });
}

function getCategoriesErrorHandler(
  state: CategoriesState,
  payload: {payload: {message: string}},
) {
  handleErrorResponse(payload.payload.message || 'Categories fetch failed');
  return newState(state, {
    loadState: LoadState.error,
  });
}

function categoriesLogoutHandler(state: CategoriesState) {
  return newState(state, CategoriesInitialState);
}

function selectedCategoryHandler(
  state: CategoriesState,
  payload: {payload: Category},
) {
  return newState(state, {
    selectedCategory: payload.payload,
  });
}

function clearSelectedCategoryHandler(state: CategoriesState) {
  return newState(state, {
    selectedCategory: CategoriesInitialState.selectedCategory,
  });
}

export const {reducer: CategoriesReducer, actions} = createSlice({
  name: 'categories',
  initialState: CategoriesInitialState,
  reducers: {
    setCategoriesLogout: categoriesLogoutHandler,
    setSelectedCategory: selectedCategoryHandler,
    clearSelectedCategory: clearSelectedCategoryHandler,
  },
  extraReducers: builder => {
    builder
      .addCase(getCategories.fulfilled, getCategoriesHandler)
      .addCase(getCategories.rejected, getCategoriesErrorHandler)
      .addCase(getCategories.pending, getCategoriesLoadingHandler);
  },
});

export const {setCategoriesLogout, setSelectedCategory, clearSelectedCategory} =
  actions;
