import {LoadState} from '../../../../types';

export interface UserState {
  user: UserEntity;
  accessToken: string;
  loginLoading: LoadState;
}

export interface UserPayload {
  user: UserEntity;
  token: string;
}

export const UserInitialState: UserState = {
  user: {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    role_id: 0,
    created_at: '',
    updated_at: '',
    deleted_at: null,
    roleName: '',
  },
  accessToken: '',
  loginLoading: LoadState['needLoad'],
};

export interface UserEntity {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  role_id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
  roleName: string;
}
