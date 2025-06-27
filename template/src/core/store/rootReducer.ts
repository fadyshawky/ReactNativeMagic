import {combineReducers} from '@reduxjs/toolkit';
import {AppReducer} from './app/appSlice';
import {UserReducer} from './user/userSlice';
import {CategoriesReducer} from './Categories/categorySlice';
import {ProvidersReducer} from './Providers/providersSlice';
import {ServicesReducer} from './Services/servicesSlice';
export const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
  categories: CategoriesReducer,
  providers: ProvidersReducer,
  services: ServicesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
