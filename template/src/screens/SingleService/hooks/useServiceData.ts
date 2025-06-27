import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../core/store/reduxHelpers';
import {RootState} from '../../../core/store/rootReducer';
import {
  enquireService,
  getService,
  payService,
} from '../../../core/store/Services/servicesActions';
import {BillTypeRefKeyEntity} from '../../../core/store/Services/servicesState';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/types';
import {
  clearInquiry,
  clearPayment,
} from '../../../core/store/Services/servicesSlice';
import {initFees} from '../../../common/utils';
interface InputParameter {
  BillingAcct: string;
  ExtraBillingAcctKey: BillTypeRefKeyEntity[];
}

export function useServiceData(serviceID?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {service} = useAppSelector((state: RootState) => state.services);

  const [cardRead, setCardRead] = useState<any>(null);
  const {selectedProvider} = useAppSelector(
    (state: RootState) => state.providers,
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedPaymentRange, setSelectedPaymentRange] = useState<any>(null);
  const [quantity, setQuantity] = useState<string>('1');
  const [vatValue, setVatValue] = useState<string>('');
  const [customProperties, setCustomProperties] = useState<any>(null);
  const [beeInputParameters, setBeeInputParameters] = useState<any>([]);
  const [fawryInputParameters, setFawryInputParameters] =
    useState<InputParameter>({
      BillingAcct: '',
      ExtraBillingAcctKey:
        service?.BillTypeExtraRefKeys?.BillTypeRefKey?.map(i => {
          return {...i, Value: ''};
        }) || [],
    });
  const fees = initFees(service, selectedPaymentRange);

  const handlePayment = async () => {
    setIsLoading(false);
    navigation.navigate('PaymentConfirmation', {
      paymentData: {
        amountToBePaid: selectedPaymentRange,
        ...(service?.PmtType === 'VOCH' && {quantity}),
        fawryInputParameters,
        fees,
        ...(vatValue && {vatValue}),
      },
    });
  };

  const handleEnquireService = async () => {
    setIsLoading(true);
    dispatch(clearInquiry());
    dispatch(clearPayment());
    try {
      const data = {
        BillTypeCode: service.BillTypeCode,
        PmtType: service?.PmtType,
        BillingAcct: fawryInputParameters?.BillingAcct,
        ExtraBillingAcctKeys:
          fawryInputParameters?.ExtraBillingAcctKey.filter(
            k => !!k.Value || k.EnumValues,
          ).length > 0
            ? {
                ExtraBillingAcctKey:
                  fawryInputParameters?.ExtraBillingAcctKey?.filter(
                    k => !!k.Value || k.EnumValues,
                  ).map(item => ({
                    ...(item.Value && {Key: item.Key}),
                    ...(item.Value && {Value: item.Value}),
                    ...(item.EnumValues && {
                      EnumValues: item.EnumValues,
                    }),
                  })),
              }
            : undefined,
        ...(service?.ServiceType === 'UTL' &&
          customProperties && {
            CustomProperties: {CustomProperty: customProperties},
          }),
      };

      if (service?.PmtType === 'PREP' || service?.PmtType === 'VOCH') {
        handlePayment();
      } else {
        const response = await dispatch(enquireService({data}));
        if (response.type.includes('fulfilled')) {
          navigation.navigate('InquiredBill');
        }
      }
    } catch (error) {
      console.log('error: ', error);
    } finally {
      if (service?.PmtType === 'POST') {
        setIsLoading(false);
      }
    }
  };

  const fetchData = async () => {
    if (!serviceID) {
      return;
    }
    try {
      setIsLoading(true);
      const data =
        selectedProvider?.provider === 'Fawry'
          ? {fawry_service_id: serviceID}
          : {bee_service_id: serviceID};
      const res = await dispatch(getService({data}));

      setFawryInputParameters({
        ...fawryInputParameters,
        ExtraBillingAcctKey:
          res.payload.service?.BillTypeExtraRefKeys?.BillTypeRefKey?.map(
            (i: BillTypeRefKeyEntity) => {
              return {...i, Value: ''};
            },
          ) || [],
      });
    } catch (error) {
      console.error('Error fetching service data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  return {
    beeInputParameters,
    setBeeInputParameters,
    fawryInputParameters,
    setFawryInputParameters,
    isLoading,
    refreshData,
    fetchData,
    selectedPaymentRange,
    setSelectedPaymentRange,
    quantity,
    setQuantity,
    vatValue,
    setVatValue,
    selectedProvider,
    handleEnquireService,
    handlePayment,
    fees,
    customProperties,
    setCustomProperties,
  };
}
