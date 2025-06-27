import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {omit} from 'lodash';
import {useState} from 'react';
import {initFees} from '../../../common/utils/FeesCaalculation';
import {useAppDispatch, useAppSelector} from '../../../core/store/reduxHelpers';
import {RootState} from '../../../core/store/rootReducer';
import {payService} from '../../../core/store/Services/servicesActions';
import {RootStackParamList} from '../../../navigation/types';

// Define the PaymentConfirmationProps interface
interface PaymentConfirmationProps {
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
}

export function useInquiredData() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const [selectedPaymentType, setSelectedPaymentType] =
    useState<string>('full');
  const [showPaymentType, setShowPaymentType] = useState<boolean>(false);
  const {service} = useAppSelector((state: RootState) => state.services);
  const {inquiredBill} = useAppSelector((state: RootState) => state.services);
  const billInfo = inquiredBill?.BillRec?.[0]?.BillInfo;
  let billRec: any = inquiredBill?.BillRec?.[0];
  billRec = omit(billRec, ['BillInfo']);
  const amount1 = billInfo?.BillSummAmt?.[0]?.CurAmt?.Amt || 0;
  const {selectedProvider} = useAppSelector(
    (state: RootState) => state.providers,
  );
  const [amount, setAmount] = useState<string>(amount1?.toString());
  const currencyCode = billInfo?.BillSummAmt?.[0]?.CurAmt?.CurCode || '';
  const fees = initFees(service, amount);
  const totalAmount = `${currencyCode} ${amount1}`;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchData = async () => {
    setAmount(amount1?.toString());
    setIsLoading(true);
    try {
    } catch (error) {
      console.error('Error fetching history data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };
  const handleSubmit = async () => {
    setIsLoading(false);
    navigation.navigate('PaymentConfirmation', {
      paymentData: {amountToBePaid: amount, fees},
    });
  };

  return {
    isLoading,
    refreshData,
    fetchData,
    showPaymentType,
    setShowPaymentType,
    selectedPaymentType,
    setSelectedPaymentType,
    billInfo,
    billRec,
    service,
    selectedProvider,
    amount,
    setAmount,
    fees,
    totalAmount,
    amount1,
    currencyCode,
    inquiredBill,
    handleSubmit,
  };
}
