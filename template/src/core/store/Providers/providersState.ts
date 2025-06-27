import {LoadState} from '../../../../types';

export interface ProvidersState {
  providers: ServiceProvider[];
  homeProviders: ServiceProvider[];
  selectedProvider: ServiceProvider;
  loading: boolean;
}

export interface ServiceProvider {
  provider: string;
  BillerId: string;
  id?: string;
  BillerName: string;
  priority: number;
  meta?: null;
  img_url?: string | null;
  categories?: CategoriesEntity[] | null;
}
export interface CategoriesEntity {
  id: number;
  fawry_biller_id: string;
  category_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderPayload {
  Service_providers: ServiceProvider[];
}

export const ProvidersInitialState: ProvidersState = {
  providers: [],
  selectedProvider: {} as ServiceProvider,
  loading: false,
  homeProviders: [],
};
