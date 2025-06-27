import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {
  Image,
  ImageResizeMode,
  ImageStyle,
  ImageURISource,
  View,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Container} from '../../common/components/Container';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {PrimaryTextInput} from '../../common/components/PrimaryTextInput';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {
  RTLAwareTouchableOpacity,
  RTLAwareView,
} from '../../common/components/RTLAwareView';
import {ImageResources} from '../../common/ImageResources.g';
import {useTranslation} from '../../common/localization/LocalizationProvider';
import {useAppSelector} from '../../core/store/reduxHelpers';
import {RootState} from '../../core/store/rootReducer';
import {CommonSizes} from '../../core/theme/commonSizes';
import {createThemedStyles} from '../../core/theme/commonStyles';
import {scaleHeight, scaleWidth} from '../../core/theme/scaling';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Theme} from '../../core/theme/types';
import {HeaderBack} from '../../navigation/HeaderComponents';
import {RootStackParamList} from '../../navigation/types';
import {useInquiredData} from './hooks/useInquiredData';
import {SkypeIndicator} from 'react-native-indicators';
import {ButtonType} from '../../../types';

// Reusable components
const BillHeader = ({
  serviceName,
  billLabel,
}: {
  serviceName: string;
  billLabel?: string;
}) => {
  const {theme} = useTheme();
  return (
    <>
      <RTLAwareText style={styles.headerText(theme)}>
        {serviceName}
      </RTLAwareText>
      {billLabel && (
        <RTLAwareText style={styles.headerText(theme)}>
          {billLabel}
        </RTLAwareText>
      )}
    </>
  );
};

const ProviderImage = ({imageUrl}: {imageUrl: string}) => {
  return <Image source={{uri: imageUrl}} style={styles.sectionImage} />;
};

const BillAmount = ({title, amount}: {title: string; amount: string}) => {
  const {theme} = useTheme();
  return (
    <>
      <RTLAwareText style={styles.subheaderText(theme)}>{title}</RTLAwareText>
      <RTLAwareText style={styles.subheaderText(theme)}>{amount}</RTLAwareText>
    </>
  );
};

const AmountInput = ({
  paymentType,
  currencyCode,
  amount1,
  amount2,
  value,
  setAmount,
}: {
  paymentType: string;
  currencyCode: string;
  amount1: string;
  amount2: string;
  value: string;

  setAmount: Dispatch<SetStateAction<string>>;
}) => {
  const {theme} = useTheme();
  const {service} = useAppSelector((state: RootState) => state.services);
  const t = useTranslation();

  return (
    <RTLAwareView style={styles.amountInputContainer}>
      <PrimaryTextInput
        editable={
          service?.PaymentRules?.IsFracAcpt && paymentType === 'partial'
        }
        onChangeText={text =>
          setAmount(
            service?.PaymentRules?.IsFracAcpt ? text : Number(text).toString(),
          )
        }
        width={'30%'}
        placeholder={t('amount', 'common')}
        keyboardType={'numeric'}
        value={value}
      />
      <Image source={ImageResources.arrows} style={styles.arrowsImage} />
      <RTLAwareText style={styles.bodyText(theme)}>
        {`${currencyCode || ''} ${
          (Number(amount1) || 0) + (Number(amount2) || 0)
        }`}
      </RTLAwareText>
    </RTLAwareView>
  );
};

const RadioButtonItem = ({
  image,
  text,
  isSelected,
  onPress,
}: {
  image: ImageURISource;
  text: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  const {theme} = useTheme();
  return (
    <RTLAwareTouchableOpacity
      style={styles.radioButtonItem}
      onPressIn={onPress}>
      <Image source={image} />
      <RTLAwareView style={styles.radioButtonItemText}>
        <View
          style={{
            width: scaleWidth(35),
            height: scaleHeight(35),
            borderRadius: CommonSizes.borderRadius.extraLarge,
            backgroundColor: theme.colors.surface,
            ...createThemedStyles(theme).dropShadow,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isSelected && (
            <View
              style={{
                width: scaleWidth(23),
                height: scaleHeight(23),
                backgroundColor: theme.colors.indigoBlue,
                borderRadius: CommonSizes.borderRadius.extraLarge,
              }}
            />
          )}
        </View>

        <RTLAwareText style={theme.text.body1}>{text}</RTLAwareText>
      </RTLAwareView>
    </RTLAwareTouchableOpacity>
  );
};
const RadioButton = ({
  selectedPaymentType,
  setSelectedPaymentType,
  setAmount,
  amount,
  amount1,
}: {
  selectedPaymentType: string;
  setSelectedPaymentType: (paymentType: string) => void;
  setAmount: Dispatch<SetStateAction<string>>;
  amount: string;
  amount1: string;
}) => {
  const t = useTranslation();
  return (
    <RTLAwareView style={styles.radioButtonContainer}>
      <RadioButtonItem
        image={ImageResources.full_ammount}
        text={t('fullAmount', 'common')}
        isSelected={selectedPaymentType === 'full'}
        onPress={() => {
          setSelectedPaymentType('full');
          setAmount(amount1);
        }}
      />
      <RadioButtonItem
        image={ImageResources.partial_ammount}
        text={t('partialAmount', 'common')}
        isSelected={selectedPaymentType === 'partial'}
        onPress={() => {
          setAmount('');
          setSelectedPaymentType('partial');
        }}
      />
    </RTLAwareView>
  );
};

export function InquiredBill(): JSX.Element {
  const {theme} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scroll = useRef<KeyboardAwareScrollView>(null);
  const {
    amount,
    amount1,
    billInfo,
    currencyCode,
    fees,
    service,
    setShowPaymentType,
    setSelectedPaymentType,
    setAmount,
    showPaymentType,
    selectedProvider,
    selectedPaymentType,
    totalAmount,
    inquiredBill,
    isLoading,
    handleSubmit,
  } = useInquiredData();

  useEffect(() => {
    setAmount(totalAmount.replace('EGP ', ''));
    return () => {
      setSelectedPaymentType('full');
      setAmount('');
      setShowPaymentType(false);
    };
  }, [totalAmount]);

  const t = useTranslation();

  const hasDetails =
    billInfo?.RulesAwareness ||
    billInfo?.DueDt ||
    billInfo?.IssueDt ||
    billInfo?.ExtraBillInfo ||
    inquiredBill?.BillTypeDescription ||
    inquiredBill?.BillTypeExtraRefKeys?.BillTypeRefKey.length > 0;

  return (
    <Container
      ref={scroll}
      testID={'InquiredBillScreenID'}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      backgroundImage={ImageResources.background_2}
      withoutPadding
      extendedBackground
      bounces={true}
      backgroundColor={theme.colors.background}>
      {isLoading ? (
        <SkypeIndicator size={80} color={theme.colors.mutedLavender} />
      ) : (
        <>
          <HeaderBack onPress={navigation.goBack} />
          <BillHeader
            serviceName={service.Name || ''}
            billLabel={billInfo?.BillLabel}
          />
          <ProviderImage imageUrl={selectedProvider.img_url || ''} />
          <BillAmount title={t('billAmount', 'common')} amount={totalAmount} />

          {(service?.PaymentRules?.IsPrtAcpt ||
            service?.PaymentRules?.IsOvrAcpt ||
            service?.PaymentRules?.IsAdvAcpt) && (
            <RTLAwareTouchableOpacity
              style={{
                backgroundColor: theme.colors.surface,
                borderWidth: 1,
                borderColor: theme.colors.indigoBlue,
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: CommonSizes.spacing.large,
                paddingVertical: CommonSizes.spacing.large,
                borderRadius: CommonSizes.borderRadius.large,
              }}
              onPressIn={() => {
                setShowPaymentType(!showPaymentType);
              }}>
              <RTLAwareText style={{color: theme.colors.mutedLavender}}>
                {t('otherAmount', 'common')}
              </RTLAwareText>
              <Image source={0} />
            </RTLAwareTouchableOpacity>
          )}
          {(service?.PaymentRules?.IsPrtAcpt ||
            service?.PaymentRules?.IsOvrAcpt ||
            service?.PaymentRules?.IsAdvAcpt) &&
            showPaymentType && (
              <RadioButton
                selectedPaymentType={selectedPaymentType}
                setSelectedPaymentType={setSelectedPaymentType}
                setAmount={setAmount}
                amount={amount}
                amount1={amount1?.toString()}
              />
            )}
          <AmountInput
            paymentType={selectedPaymentType}
            currencyCode={currencyCode}
            amount1={amount}
            amount2={fees?.toString()}
            value={amount?.toString()}
            setAmount={setAmount}
          />
          {hasDetails && (
            <RTLAwareView
              style={{
                backgroundColor: theme.colors.surface,
                padding: CommonSizes.spacing.large,
                borderRadius: CommonSizes.borderRadius.large,
                borderWidth: 1,
                borderColor: theme.colors.indigoBlue,
              }}>
              {billInfo?.RulesAwareness && (
                <RTLAwareText style={{...theme.text.body1}}>
                  {billInfo?.RulesAwareness}
                </RTLAwareText>
              )}
              {billInfo?.DueDt && (
                <RTLAwareText style={{...theme.text.body1}}>
                  {`${t('dueDate', 'common')}: ${billInfo?.DueDt}`}
                </RTLAwareText>
              )}
              {billInfo?.IssueDt && (
                <RTLAwareText style={{...theme.text.body1}}>
                  {`${t('issueDate', 'common')}: ${billInfo?.IssueDt}`}
                </RTLAwareText>
              )}
              {billInfo?.ExtraBillInfo && (
                <RTLAwareText style={{...theme.text.body1}}>
                  {billInfo?.ExtraBillInfo}
                </RTLAwareText>
              )}
              {inquiredBill?.BillTypeDescription && (
                <RTLAwareText style={{...theme.text.body1}}>
                  {inquiredBill?.BillTypeDescription}
                </RTLAwareText>
              )}
              {inquiredBill?.BillTypeExtraRefKeys?.BillTypeRefKey.length > 0 &&
                inquiredBill?.BillTypeExtraRefKeys?.BillTypeRefKey.map(
                  (item: any) => (
                    <RTLAwareText style={{...theme.text.body1}}>
                      {`${item.key}: ${item.value}`}
                    </RTLAwareText>
                  ),
                )}
            </RTLAwareView>
          )}
          <PrimaryButton
            isLoading={isLoading}
            disabled={isLoading || !amount}
            label={t('submit', 'common')}
            onPressIn={() => {
              handleSubmit();
            }}
            style={styles.submitButton}
            type={ButtonType.solid}
          />
          <PrimaryButton
            label={t('backToHome', 'common')}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'Main'}],
              });
            }}
            style={{alignSelf: 'flex-end'}}
            type={ButtonType.outlineNegative}
          />
        </>
      )}
    </Container>
  );
}

const styles = {
  container: {
    flexGrow: 1,
    paddingBottom: scaleHeight(130),
    borderTopRightRadius: CommonSizes.spacing.large,
    borderTopLeftRadius: CommonSizes.spacing.large,
    paddingHorizontal: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.xl,
    justifyContent: 'flex-start' as const,
  } as ViewStyle,
  contentContainer: {
    flexGrow: 1,
  } as ViewStyle,
  headerText: (theme: Theme) => ({
    ...theme.text.header1,
    alignSelf: 'center' as const,
  }),
  subheaderText: (theme: Theme) => ({
    ...theme.text.header2,
    alignSelf: 'center' as const,
  }),
  bodyText: (theme: Theme) => ({
    ...theme.text.body1,
    alignSelf: 'center' as const,
  }),
  sectionImage: {
    width: '100%',
    height: scaleHeight(150),
    resizeMode: 'contain' as ImageResizeMode,
  } as ImageStyle,
  amountInputContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-evenly' as const,
    width: '100%',
  } as ViewStyle,
  arrowsImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain' as ImageResizeMode,
  } as ImageStyle,
  submitButton: {
    alignSelf: 'flex-end' as const,
  } as ViewStyle,
  radioButtonContainer: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    justifyContent: 'space-evenly' as const,
    width: '100%',
  } as ViewStyle,
  radioButtonItem: {
    alignItems: 'center' as const,
    justifyContent: 'space-evenly' as const,
  } as ViewStyle,
  radioButtonItemText: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-evenly' as const,
    gap: CommonSizes.spacing.large,
  } as ViewStyle,
};
