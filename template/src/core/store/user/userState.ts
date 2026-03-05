import {LoadState} from '../../../../types';

export interface UserState {
  user: User;
  accessToken: string;
  loginLoading: string;
}
export interface User {
  type: string;
  mobile_number: string;
  full_name: string;
  status: string;
}


export enum UserStatus {
  ACTIVE = 'Active',
  REGISTERED = 'Registered',
  SUSPENDED = 'Suspended',
  PENDING = 'Pending',
}



export const UserInitialState: UserState = {
  user: {
    type: '',
    mobile_number: '',
    full_name: '',
    status: UserStatus.PENDING,
  },
  accessToken: '',
  loginLoading: LoadState['needLoad'],
};

export interface UserEntity {
  type: string;
  status: UserStatus;
  mobile_number: string;
  full_name: string;
}
