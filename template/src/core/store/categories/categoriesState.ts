import {LoadState} from '../../../../types';

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface CategoriesState {
  categories: Category[];
  loadState: LoadState;
  error: string | null;
}

export const CategoriesInitialState: CategoriesState = {
  categories: [],
  loadState: LoadState.needLoad,
  error: null,
};
