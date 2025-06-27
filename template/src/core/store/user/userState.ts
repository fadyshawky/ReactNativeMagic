import {LoadState} from '../../../../types';

export interface UserState {
  user: User;
  current_balance: number;
  daily_commission: number;
  accessToken: string;
  loginLoading: string;
  tempToken: string;
  favoriteCategories: number[];
  favoriteProviders: number[];
  history: HistoryEntity[];
  historyDetails: HistoryDetailsEntity[];
}
export interface User {
  type: string;
  mobile_number: string;
  full_name: string;
  merchantStore: MerchantStore;
  status: string;
}
export interface MerchantStore {
  id: number;
  wallet_user_id: number;
  name: string;
  address: string;
  city: string;
  region: string;
  store_imgs?: null;
  tax_card?: null;
  commercial_registration?: null;
  createdAt: string;
  updatedAt: string;
  id_front: string;
  id_back: string;
  selfie?: null;
}
export interface HistoryEntity {
  id: number;
  transaction_reference_num: string;
  bee_transaction_id?: null;
  fawry_transaction_id?: string | null;
  transaction_serial_num?: string | null;
  amount: string | number;
  sender_fees: string;
  reciever_fees: string;
  sender_identifier: string;
  reciever_identifier: string;
  status: string;
  sender_status: string;
  receiver_status: string;
  reason?: null;
  transactionReason: string;
  display_reason?: null;
  sender_interchange_amount: string;
  receiver_interchange_amount: string;
  sender_commission: string;
  receiver_commission: string;
  bulk_id?: null;
  sender_name: string;
  receiver_name: string;
  notification_id?: null;
  transaction_data?: null;
  convenience: string;
  tips: string;
  reference1?: null;
  reference2?: null;
  meta?: null;
  createdAt: string;
  updatedAt: string;
  transaction_type: number;
  sender_id: number;
  reciever_id: number;
  sender_scheme_id: number;
  receiver_scheme_id: number;
  'Transaction_type.id': number;
  'Transaction_type.name': string;
  'Transaction_type.name_ar'?: null;
  'Transaction_type.request_type': string;
  'Transaction_type.request_type_ar'?: null;
  'Transaction_type.timeout': string;
  'Transaction_type.on_off_us': string;
  'Transaction_type.sender_type': string;
  'Transaction_type.profile_type'?: null;
  'Transaction_type.receiver_type': string;
  'Transaction_type.tahweel_operation': string;
  'Transaction_type.send_fees'?: string | null;
  'Transaction_type.receive_fees': string;
  'Transaction_type.send_limit': string;
  'Transaction_type.receive_limit': string;
  'Transaction_type.send_commision'?: string | null;
  'Transaction_type.receive_commision'?: null;
  'Transaction_type.createdAt': string;
  'Transaction_type.updatedAt': string;
  providerName?: string | null;
  serviceName?: string | null;
  totalAmount?: number | null;
}
export interface HistoryDetailsEntity {
  value: string;
  type: string;
  label?: string;
}

export enum UserStatus {
  ACTIVE = 'Active',
  REGISTERED = 'Registered',
  SUSPENDED = 'Suspended',
  PENDING = 'Pending',
}

export interface UserPayload {
  type: string;
  mobile_number: string;
  full_name: string;
  merchantStore: MerchantStore;
  requests: HistoryEntity[];
  data: HistoryDetailsEntity[];
  balance: {
    name: string;
    value: number;
  }[];
  current_balance: {
    name: string;
    value: number;
  }[];
  status: UserStatus;
  fullname: string;
  token: string;
}

export const UserInitialState: UserState = {
  user: {
    type: '',
    mobile_number: '',
    full_name: '',
    status: UserStatus.PENDING,
    merchantStore: {
      id: 0,
      wallet_user_id: 0,
      name: '',
      address: '',
      city: '',
      region: '',
      createdAt: '',
      updatedAt: '',
      id_front: '',
      id_back: '',
    },
  },
  current_balance: 0,
  daily_commission: 0,
  accessToken: '',
  loginLoading: LoadState['needLoad'],
  tempToken: '',
  favoriteCategories: [],
  favoriteProviders: [],
  history: [],
  historyDetails: [],
};

export interface UserEntity {
  type: string;
  status: UserStatus;
  mobile_number: string;
  full_name: string;
}
