import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageResizeMode,
  ImageStyle,
  ScrollView,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonType} from '../../../types';
import {Container} from '../../common/components/Container';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {ImageResources} from '../../common/ImageResources.g';
import {useTranslation} from '../../common/localization/LocalizationProvider';
import {useAppDispatch, useAppSelector} from '../../core/store/reduxHelpers';
import {RootState} from '../../core/store/rootReducer';
import {
  payService,
  reverseService,
} from '../../core/store/Services/servicesActions';
import {CommonSizes} from '../../core/theme/commonSizes';
import {scaleHeight} from '../../core/theme/scaling';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Theme} from '../../core/theme/types';
import {HeaderBack, HeaderButton} from '../../navigation/HeaderComponents';
import {RootStackParamList} from '../../navigation/types';
import {omit} from 'lodash';
import {calculateFees, makePrintData} from '../../common/utils';
import {normalizeAndTrimWhitespace} from '../../common/helpers/stringsHelpers';
import {decryptTripleDES} from '../../core/utils/stringUtils';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {SkypeIndicator} from 'react-native-indicators';
import {createThemedStyles} from '../../core/theme/commonStyles';
import {getLabel} from '../ReceiptScreen/utils/utils';
import {getTextStyle} from '../ReceiptScreen/utils/utils';
import {getSeparator} from '../ReceiptScreen/utils/utils';
import SunmiPrepaid from '../../modules/SunmiPrepaid';

export function PaymentConfirmation(): JSX.Element {
  const {theme} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scroll = React.useRef<KeyboardAwareScrollView>(null);
  const t = useTranslation();

  const {service} = useAppSelector((state: RootState) => state.services);

  const {inquiredBill} = useAppSelector((state: RootState) => state.services);

  const customProps =
    inquiredBill?.Response?.PresSvcRs?.MsgRqHdr?.CustomProperties
      ?.CustomProperty;

  const {selectedProvider} = useAppSelector(
    (state: RootState) => state.providers,
  );
  const dispatch = useAppDispatch();

  const {paymentData} =
    useRoute<RouteProp<RootStackParamList, 'PaymentConfirmation'>>().params;
  const billInfo = inquiredBill?.BillRec?.[0]?.BillInfo;
  let billRec: any = inquiredBill?.BillRec?.[0];
  billRec = omit(billRec, ['BillInfo']);

  const [isLoading, setIsLoading] = useState(false);

  const boldTextStyle: TextStyle = {
    ...theme.text.body1,
    fontWeight: 'bold',
  };

  const isFocused = useIsFocused();

  const [confirmationData, setConfirmationData] = useState<any[]>([]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    setConfirmationData(
      makePrintData({
        service,
        BillingAcct:
          service?.PmtType === 'POST'
            ? billRec?.BillingAcct
            : paymentData?.fawryInputParameters?.BillingAcct,
        provider: selectedProvider,
        billInfo,
        amuont: paymentData?.amountToBePaid,
        fees: paymentData?.fees,
        ...(paymentData?.quantity && {quantity: paymentData?.quantity}),
        ...(paymentData?.vatValue && {vatValue: paymentData?.vatValue}),
      }),
    );

    return () => {
      setConfirmationData([]);
    };
  }, [isFocused]);

  const handleReverse = async (response: any) => {
    try {
      const result = await dispatch(
        reverseService({
          data: {
            id: response?.payload?.data?.results?.find(
              (k: any) => k.label === 'رقم العملية',
            )?.value,
          },
        }),
      );
      if (result.type.includes('fulfilled')) {
        return Alert.alert('تم إعادة الرصيد', 'تم إعادة الرصيد بنجاح', [
          {
            text: 'تم',
            onPress: () => {
              navigation.goBack();
              setTimeout(() => {
                navigation.goBack();
              }, 500);
            },
          },
        ]);
      }
    } catch (error) {
      handleReverse(response);
    }
  };

  const handleChargeCard = async (response: any) => {
    try {
      if (response?.payload?.data?.chargeValue) {
        const writeRes = await SunmiPrepaid.writeCardCharge(
          response?.payload?.data?.chargeValue,
          response?.payload?.data?.cardMetadata || null,
        );
        if (writeRes) {
          if (response.type.includes('fulfilled')) {
            navigation.navigate('ReceiptScreen', {
              type: 'print',
            });
          }
        }
      } else {
        handleReverse(response);
      }
    } catch (error) {
      handleReverse(response);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      let data = {};
      if (service?.PmtType === 'PREP' || service?.PmtType === 'VOCH') {
        data = {
          ...(service?.PmtType === 'VOCH' && {quantity: paymentData?.quantity}),
          BillTypeCode: service?.BillTypeCode as number,
          PmtType: service?.PmtType as string,
          BillingAcct:
            (paymentData?.fawryInputParameters?.BillingAcct as string) ??
            undefined,
          CurAmt: paymentData?.amountToBePaid,
          ExtraBillingAcctKeys:
            paymentData?.fawryInputParameters?.ExtraBillingAcctKey.filter(
              k => !!k.Value || k.EnumValues,
            ).length > 0
              ? {
                  ExtraBillingAcctKey:
                    paymentData?.fawryInputParameters?.ExtraBillingAcctKey?.filter(
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
        };
      } else {
        data = {
          BillTypeCode: billRec?.BillTypeCode as number,
          PmtType: service?.PmtType as string,
          BillingAcct: billRec?.BillingAcct as string,
          BillRefNumber: billRec?.BillRefNumber as string,
          CurAmt: paymentData?.amountToBePaid.toString(),
          ExtraBillingAcctKeys: billRec?.ExtraBillingAcctKeys as string,
          billInfo: billInfo,
        };
      }

      const response = await dispatch(payService({data}));

      if (
        service?.AcctInputMethod === 'GASSC' ||
        service?.AcctInputMethod === 'SC' ||
        service?.AcctInputMethod === 'WSC'
      ) {
        handleChargeCard(response);
      } else {
        if (response.type.includes('fulfilled')) {
          navigation.navigate('ReceiptScreen', {
            type: 'print',
          });
        }
      }
    } catch (error) {
      console.error('error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      ref={scroll}
      testID={'ReceiptScreenID'}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      backgroundImage={ImageResources.background_2}
      withoutPadding
      extendedBackground
      withoutScroll
      bounces={true}
      backgroundColor={theme.colors.background}>
      {isLoading ? (
        <SkypeIndicator size={80} color={theme.colors.mutedLavender} />
      ) : (
        <>
          <HeaderButton onPress={() => navigation.goBack()} />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollViewContent,
              {backgroundColor: theme.colors.surface},
              createThemedStyles(theme).dropShadow,
            ]}>
            {Array.isArray(confirmationData) &&
              confirmationData?.map((h, i) => (
                <RTLAwareView
                  key={`${h.label}-${i}`}
                  style={styles.receiptItem}>
                  {getSeparator(h.type, theme)}
                  <RTLAwareView
                    style={getTextStyle(h.type, theme)?.container as ViewStyle}>
                    <RTLAwareText
                      style={getTextStyle(h.type, theme)?.value as TextStyle}>
                      {h.label === 'VouchPIN'
                        ? decryptTripleDES(
                            h.value,
                            '8pe/hqinrZQV6pHNkQ0WwbD0ZHkaAbbj',
                          )
                        : normalizeAndTrimWhitespace(h.value)}
                    </RTLAwareText>
                    {h.label &&
                      h.label !== 'VouchPIN' &&
                      getLabel(h.type, h.label, theme)}
                  </RTLAwareView>
                </RTLAwareView>
              ))}
          </ScrollView>
          <PrimaryButton
            label={t('confirm', 'common')}
            type={ButtonType.solid}
            onPress={handleSubmit}
          />
          <PrimaryButton
            label={t('back', 'common')}
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backToHomeButton}
            type={ButtonType.outlineNegative}
          />
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: scaleHeight(20),
    borderTopRightRadius: CommonSizes.spacing.large,
    borderTopLeftRadius: CommonSizes.spacing.large,
    paddingHorizontal: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.xl,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    flexGrow: 1,
  },
  scrollView: {
    width: '100%',
    borderRadius: CommonSizes.borderRadius.medium,
    flexGrow: 1,
  },
  scrollViewContent: {
    paddingHorizontal: CommonSizes.spacing.huge,
    gap: CommonSizes.spacing.large,
    paddingVertical: CommonSizes.spacing.huge,
    flexGrow: 1,
  },
  receiptItem: {
    width: '100%',
    gap: CommonSizes.spacing.medium,
  },
  backToHomeButton: {
    alignSelf: 'flex-end',
  },
});
