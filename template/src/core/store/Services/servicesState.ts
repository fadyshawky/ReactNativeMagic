import {LoadState} from '../../../../types';

export interface ServicesState {
  services: Service[];
  service: Service;
  selectedService: Service;
  loading: boolean;
  inquiredBill: InquiredBill;
  paymentResponse: any[];
}

export interface PaySvcRs {
  Response: Response;
}
export interface Response {
  SignonRs: SignonRs;
  PaySvcRs: PaySvcRs1;
}
export interface SignonRs {
  ServerDt: string;
  Language: string;
  SignonProfile: SignonProfile;
}
export interface SignonProfile {
  Sender: string;
  Receiver: string;
  MsgCode: string;
  Version: string;
}
export interface PaySvcRs1 {
  RqUID: string;
  AsyncRqUID: string;
  MsgRqHdr: MsgRqHdr;
  Status: Status;
  PmtAddRs: PmtAddRs;
}
export interface MsgRqHdr {
  NetworkTrnInfo: NetworkTrnInfo;
  ClientTerminalSeqId: string;
  CustomProperties: CustomProperties;
}
export interface NetworkTrnInfo {
  OriginatorCode: string;
  TerminalId: string;
}
export interface CustomProperties {
  CustomProperty?: CustomPropertyEntity[] | null;
}
export interface CustomPropertyEntity {
  Key: string;
  Value: string;
}
export interface Status {
  StatusCode: number;
  Severity: string;
  StatusDesc: string;
}
export interface PmtAddRs {
  CustId?: null[] | null;
  PmtInfoVal?: PmtInfoValEntity[] | null;
}
export interface PmtInfoValEntity {
  status: Status;
  PmtTransId?: PmtTransIdEntity[] | null;
  PmtInfo: PmtInfo;
}
export interface PmtTransIdEntity {
  PmtId: string;
  PmtIdType: string;
  CreatedDt: string;
}
export interface PmtInfo {
  CorrelationUID: string;
  BillingAcct: string;
  BillRefNumber: string;
  BillTypeCode: number;
  BankId: string;
  PmtType: string;
  DeliveryMethod: string;
  CurAmt: CurAmtOrFeesAmt;
  FeesAmt: CurAmtOrFeesAmt;
  DepAccIdFrom: DepAccIdFrom;
  PmtMethod: string;
  PrcDt: string;
  ExtraBillInfo: string;
  MerchantName: string;
}
export interface CurAmtOrFeesAmt {
  Amt: number;
  CurCode: string;
}
export interface DepAccIdFrom {
  AcctId: string;
  AcctType: string;
  AcctCur: string;
  Balance: Balance;
}
export interface Balance {
  Balance: number;
  CurCode: string;
}

export interface InquiredBill {
  success: boolean;
  Response: Response;
}
export interface Response {
  SignonRs: SignonRs;
  PresSvcRs: PresSvcRs;
}
export interface SignonRs {
  SignonPswd: SignonPswd;
  ClientDt: string;
  CustLangPref: string;
  ServerDt: string;
  Language: string;
  SignonProfile: SignonProfile;
}
export interface SignonPswd {
  UserAccess: UserAccess;
}
export interface UserAccess {
  UserIPAddress: string;
}
export interface SignonProfile {
  Sender: string;
  Receiver: string;
  MsgCode: string;
  Version: string;
}
export interface PresSvcRs {
  RqUID: string;
  AsyncRqUID: string;
  Status: Status;
  BillInqRs: BillInqRs;
  MsgRqHdr: MsgRqHdr;
}
export interface Status {
  StatusCode: number;
  Severity: string;
  StatusDesc: string;
}
export interface BillInqRs {
  CustId?: null[] | null;
  IncOpenAmt: boolean;
  DeliveryMethod: string;
  BillRec?: BillRecEntity[] | null;
}
export interface BillRecEntity {
  BillingAcct: string;
  BillerId: string;
  BillTypeCode: number;
  BillRefNumber: string;
  BillInfo: BillInfo;
  BillStatus: string;
  ExtraBillingAcctKeys: any;
}
export interface BillInfo {
  BillSummAmt?: BillSummAmtEntity[] | null;
  PaymentRange?: PaymentRangeEntity[] | null;
  RulesAwareness: string;
  ExtraBillInfo: string;
}
export interface BillSummAmtEntity {
  BillSummAmtCode: string;
  CurAmt: CurAmtOrLowerOrUpper;
}
export interface CurAmtOrLowerOrUpper {
  Amt: number;
  CurCode: string;
}
export interface PaymentRangeEntity {
  Lower: CurAmtOrLowerOrUpper;
  Upper: CurAmtOrLowerOrUpper;
}

export interface Service {
  id?: number | null;
  BillerId: string;
  BillTypeCode?: number | null;
  Name?: string | null;
  PmtType?: string | null;
  ServiceType?: string | null;
  ServiceName?: string | null;
  BillTypeAcctLabel?: string | null;
  AcctInputMethod?: string;
  IsHidden?: boolean | null;
  BillTypeExtraRefKeys?: BillTypeExtraRefKeys | null;
  BillRefType?: boolean | null;
  PaymentRules?: PaymentRules | null;
  BillTypeStatus?: string | null;
  BillTypeDescription?: string | null;
  AllowRctRePrint?: boolean | null;
  OTPEnabled?: boolean | null;
  ValidationEnabled?: boolean | null;
  OTPRequired?: boolean | null;
  IsBAConfRequired?: null;
  IsTermsConditionReq?: boolean | null;
  SupportPmtReverse?: null;
  PaymentRanges?: null;
  createdAt?: string | null;
  updatedAt?: string | null;
  Fees?: FeesEntity[] | null;
  ReceiptFooter?: string | null;
  BillingActRegEX?: null;
  isActive?: boolean | null;
  meta?: Meta | null;
  commission_config?: null;
  info_text?: boolean | null;
  commission_with_vat?: boolean | null;
  category_id?: string | null;
  vat_value?: null;
  BillerName?: string | null;
  BillerInfo?: BillerInfoEntity[] | null;
  BillerStatus?: string | null;
  BillerNameLang?: string | null;
}
export interface BillTypeExtraRefKeys {
  BillTypeRefKey?: BillTypeRefKeyEntity[] | null;
}
export interface BillTypeRefKeyEntity {
  Key: string;
  Value?: string | undefined;
  Label: string;
  Required: boolean;
  EnumValues: EnumValues;
  InputMethod: string;
  IsBAKeyPart: boolean;
  IsPrintKeyPart: boolean;
}
export interface EnumValues {
  EnumValue?: EnumValueEntity[] | null;
}
export interface EnumValueEntity {
  Alias: string;
  Value: string;
}
export interface PaymentRules {
  IsInqRqr: boolean;
  IsAdvAcpt: boolean;
  IsMobNtfy: boolean;
  IsOvrAcpt: boolean;
  IsPrtAcpt: boolean;
  IsFracAcpt: boolean;
  IsAcptCardPmt: boolean;
}
export interface FeesEntity {
  Tier?: TierEntity[] | null;
  IsEmbeddedFees: boolean;
  AcctType?: string | null;
}
export interface TierEntity {
  Percent: Percent;
  FixedAmt: FixedAmtOrLowerOrUpper;
  LowerAmt: number;
  UpperAmt: number;
}
export interface Percent {
  Value: number;
  MaxAmt: number;
}
export interface FixedAmtOrLowerOrUpper {
  Amt: number;
  CurCode: string;
}
export interface Meta {
  note: string;
  explain: string;
  poweredBy: string;
}
export interface BillerInfoEntity {
  BillTypeCode: number;
  Name: string;
  PmtType: string;
  ServiceType: string;
  ServiceName: string;
  BillTypeAcctLabel?: string | null;
  IsHidden: boolean;
  BillRefType: boolean;
  ReceiptFooterLang?: string | null;
  ReceiptFooter?: string | null;
  PaymentRules: PaymentRules1;
  BillTypeStatus: string;
  PaymentRanges?: PaymentRanges | null;
  BillTypeDescription?: string | null;
  AllowRctRePrint: boolean;
  OTPEnabled?: boolean | null;
  ValidationEnabled: boolean;
  Timeout?: string | null;
  OTPRequired?: boolean | null;
  IsBAConfRequired?: boolean | null;
  IsTermsConditionReq?: boolean | null;
  NextBTCs?: string | null;
  IsSeparateNextPmt?: boolean | null;
  Fees?: FeesEntity1[] | null;
  SupportPmtReverse?: boolean | null;
  BillingActRegEX?: string | null;
  BillTypeExtraRefKeys?: BillTypeExtraRefKeys1 | null;
  ReceiptHeader?: string | null;
  NameLang?: string | null;
  AcctInputMethod?: string | null;
  IsAcceptPromo?: boolean | null;
  Type?: string | null;
  EchoInqCustProp?: boolean | null;
  BillingActHint?: string | null;
  RequiredLocation?: string | null;
  IsSupportInstallment?: boolean | null;
  CorrBillTypeCode?: number | null;
  BillTypeNature?: string | null;
  BalanceInqRequired?: boolean | null;
  ReceiptCorrMerchMsg?: string | null;
  ReceiptCorrCustMsg?: string | null;
  ReceiptLogoName?: string | null;
  DisableBulk?: boolean | null;
  IsAcceptZeroPmt?: boolean | null;
  SaveFavorite?: boolean | null;
  ReceiptHeaderLang?: string | null;
  TermsCondition?: string | null;
}
export interface PaymentRules1 {
  IsInqRqr: boolean;
  IsAdvAcpt?: boolean | null;
  IsMobNtfy: boolean;
  IsOvrAcpt?: boolean | null;
  IsPrtAcpt?: boolean | null;
  IsFracAcpt: boolean;
  IsAcptCardPmt: boolean;
  MultipleOfAmt?: number | null;
}
export interface PaymentRanges {
  PaymentRangeType?: PaymentRangeTypeEntity[] | null;
}
export interface PaymentRangeTypeEntity {
  Lower: FixedAmtOrLowerOrUpper;
  Upper: FixedAmtOrLowerOrUpper;
}
export interface FeesEntity1 {
  Tier?: TierEntity1[] | null;
  IsEmbeddedFees: boolean;
  AcctType?: string | null;
}
export interface TierEntity1 {
  LowerAmt: number;
  UpperAmt: number;
  Percent?: Percent1 | null;
  FixedAmt?: FixedAmtOrLowerOrUpper1 | null;
}
export interface Percent1 {
  Value: number;
  MaxAmt?: number | null;
  MinAmt?: number | null;
}
export interface FixedAmtOrLowerOrUpper1 {
  Amt: number;
  CurCode: string;
}
export interface BillTypeExtraRefKeys1 {
  BillTypeRefKey?: BillTypeRefKeyEntity1[] | null;
}
export interface BillTypeRefKeyEntity1 {
  Key: string;
  Label: string;
  Required?: boolean | null;
  IsPrintKeyPart: boolean;
  IsBAKeyPart?: boolean | null;
  InputMethod: string;
  EnumValues?: EnumValues1 | null;
  KeyHint?: string | null;
  RegEX?: string | null;
  IsCnfrmRequired?: boolean | null;
  IsEncryptRequired?: boolean | null;
  IsInputMasked?: boolean | null;
}
export interface EnumValues1 {
  EnumValue?: EnumValueEntity1[] | null;
}
export interface EnumValueEntity1 {
  Alias?: string | null;
  Value: string;
  Amount?: number | null;
  Description?: string | null;
}

export interface ServicePayload {
  services: Service[];
  service: Service;
  data: InquiredBill | {Response: Response};
}

export const ServicesInitialState: ServicesState = {
  services: [],
  service: {} as Service,
  selectedService: {} as Service,
  loading: false,
  inquiredBill: {
    success: false,
    Response: {
      SignonRs: {
        SignonPswd: {
          UserAccess: {
            UserIPAddress: '',
          },
        },
        ServerDt: '',
        Language: '',
        SignonProfile: {
          Sender: '',
          Receiver: '',
          MsgCode: '',
          Version: '',
        },
        ClientDt: '',
        CustLangPref: '',
      },
      PaySvcRs: {
        RqUID: '',
        AsyncRqUID: '',
        MsgRqHdr: {
          NetworkTrnInfo: {
            OriginatorCode: '',
            TerminalId: '',
          },
          ClientTerminalSeqId: '',
          CustomProperties: {
            CustomProperty: [],
          },
        },
        Status: {
          StatusCode: 0,
          Severity: '',
          StatusDesc: '',
        },
        PmtAddRs: {
          CustId: [],
          PmtInfoVal: [],
        },
      },
      PresSvcRs: {
        RqUID: '',
        AsyncRqUID: '',
        Status: {
          StatusCode: 0,
          Severity: '',
          StatusDesc: '',
        },
        BillInqRs: {
          CustId: [],
          IncOpenAmt: false,
          DeliveryMethod: '',
          BillRec: [],
        },
        MsgRqHdr: {
          NetworkTrnInfo: {
            OriginatorCode: '',
            TerminalId: '',
          },
          ClientTerminalSeqId: '',
          CustomProperties: {
            CustomProperty: [],
          },
        },
      },
    },
  },
  paymentResponse: [],
};
