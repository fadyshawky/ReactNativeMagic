import {combineReducers} from '@reduxjs/toolkit';
import {AppReducer} from './app/appSlice';
import {UserReducer} from './user/userSlice';

export const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
