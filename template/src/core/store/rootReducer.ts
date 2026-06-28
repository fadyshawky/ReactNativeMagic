import {combineReducers} from '@reduxjs/toolkit';
import {AppReducer} from './app/appSlice';
import {CategoriesReducer} from './categories/categoriesSlice';
import {UserReducer} from './user/userSlice';
export const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
  categories: CategoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
