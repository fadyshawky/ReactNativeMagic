import {LoadState} from '../../../../types';

export type PosSettings = {
  id: number;
  name: string;
  function_name: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface CategoriesState {
  categories: Category[];
  loadState: LoadState;
  settings: PosSettings[];
  selectedCategory: Category | null;
}

export interface Category {
  createdAt?: string | null;
  externalId?: null;
  id: number;
  img_url: string;
  name: string;
  name_en?: string | null;
  parent_id: number;
  priority: number;
  updatedAt: string;
}

export interface CategoryPayload {
  categories: Category[];
  settings: PosSettings[];
}

export const CategoriesInitialState: CategoriesState = {
  categories: [],
  loadState: LoadState.idle,
  settings: [],
  selectedCategory: null,
};
