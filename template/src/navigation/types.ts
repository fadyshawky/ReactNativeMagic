export type RootStackParamList = {
  Home: undefined;
  Details: {id: string};
  Login: undefined;
  Registration: undefined;
  ForgotPassword: undefined;
  Main: undefined;
  Profile: undefined;
  Settings: undefined;
  Splash: undefined;
  OTP: {phone?: string};
  ForceChangePassword: undefined;
  Services: {providerID: string};
  SingleService: {serviceID?: string};
  InquiredBill: undefined;
  Loading: undefined;
  PaymentConfirmation: {
    paymentData: {
      amountToBePaid: string;
      billInfo: any;
      fees: number;
      currencyCode: string;
      billRec: {
        BillingAcct: string;
        BillerId: string;
        BillTypeCode: number;
        BillRefNumber: string;
        BillStatus: string;
      };
    };
  };
  Categories: undefined;
  Providers: {categoryID: string};
  ReceiptScreen: {type: 'print' | 'history'; historyID?: string};
};
