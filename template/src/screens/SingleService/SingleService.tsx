import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonType} from '../../../types';
import {Container} from '../../common/components/Container';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {ImageResources} from '../../common/ImageResources.g';
import {useTranslation} from '../../common/localization/LocalizationProvider';
import {useAppDispatch, useAppSelector} from '../../core/store/reduxHelpers';
import {RootState} from '../../core/store/rootReducer';
import {clearService} from '../../core/store/Services/servicesSlice';
import {CommonSizes} from '../../core/theme/commonSizes';
import {scaleHeight, scaleWidth} from '../../core/theme/scaling';
import {useTheme} from '../../core/theme/ThemeProvider';
import {HeaderBack} from '../../navigation/HeaderComponents';
import {RootStackParamList} from '../../navigation/types';
import {FawryInputs} from './Components/FawryInputs';
import {useServiceData} from './hooks/useServiceData';
import SunmiPrepaid from '../../modules/SunmiPrepaid';

export function SingleService(): JSX.Element {
  const {theme} = useTheme();
  const scroll = useRef<KeyboardAwareScrollView>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {service} = useAppSelector((state: RootState) => state.services);
  console.log('service: ', service);

  const t = useTranslation();

  const dispatch = useAppDispatch();

  const params =
    useRoute<RouteProp<RootStackParamList, 'SingleService'>>()?.params;

  const {
    fawryInputParameters,
    setFawryInputParameters,
    fetchData,
    isLoading,
    setSelectedPaymentRange,
    selectedPaymentRange,
    quantity,
    setQuantity,
    vatValue,
    setVatValue,
    selectedProvider,
    handleEnquireService,
    fees,
    setCustomProperties,
  } = useServiceData(params?.serviceID as string);

  const isFocused = useIsFocused();

  const readCardMetadata = async () => {
    try {
      const response = await SunmiPrepaid.readCardMetadata(
        service?.BillTypeExtraRefKeys?.BillTypeRefKey,
        service?.AcctInputMethod as string,
      );

      setFawryInputParameters({
        ...fawryInputParameters,
        BillingAcct: response.billingAcct,
        ExtraBillingAcctKey:
          service?.AcctInputMethod === 'GASSC'
            ? []
            : response.extraBillingAcctKey || [],
      });

      setCustomProperties(response.customProperties);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }

    return () => {
      setQuantity('1');
      setSelectedPaymentRange(null);
      setVatValue('');
      setFawryInputParameters({
        BillingAcct: '',
        ExtraBillingAcctKey:
          service?.BillTypeExtraRefKeys?.BillTypeRefKey?.map(i => {
            return {...i, Value: ''};
          }) || [],
      });
    };
  }, [isFocused]);

  useEffect(() => {
    if (
      service?.AcctInputMethod === 'SC' ||
      service?.AcctInputMethod === 'WSC' ||
      service?.AcctInputMethod === 'GASSC'
    ) {
      console.log('service?.AcctInputMethod', service?.AcctInputMethod);
      readCardMetadata();
    }
  }, [service]);

  return (
    <Container
      ref={scroll}
      testID={'ServiceScreenID'}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      backgroundImage={ImageResources[`${theme.mode}_background_1`]}
      withoutPadding
      extendedBackground
      bounces={true}
      backgroundColor={theme.colors.background}>
      {isLoading ? (
        <SkypeIndicator size={80} color={theme.colors.mutedLavender} />
      ) : (
        <>
          <HeaderBack
            onPress={() => {
              navigation.goBack();
              dispatch(clearService());
            }}
          />
          <Text style={{...theme.text.header1, alignSelf: 'center'}}>
            {service?.Name}
          </Text>
          <Image
            source={{uri: selectedProvider.img_url as string}}
            style={styles.sectionImage}
          />
          {/* <BeeInputs /> */}
          <FawryInputs
            setQuantity={setQuantity}
            quantity={quantity}
            setFawryInputParameters={setFawryInputParameters}
            fawryInputParameters={fawryInputParameters}
            selectedPaymentRange={selectedPaymentRange}
            setSelectedPaymentRange={setSelectedPaymentRange}
            vatValue={vatValue}
            setVatValue={setVatValue}
            fees={fees}
          />
          <PrimaryButton
            label={t('submit', 'common')}
            isLoading={isLoading}
            disabled={
              isLoading ||
              (service?.PmtType !== 'POST' && !selectedPaymentRange)
            }
            onPressIn={() => {
              handleEnquireService();
            }}
            style={{alignSelf: 'flex-end'}}
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: scaleHeight(130),
    borderTopRightRadius: CommonSizes.spacing.large,
    borderTopLeftRadius: CommonSizes.spacing.large,
    paddingHorizontal: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.extraLarge,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    flexGrow: 1,
  },
  formContainer: {
    alignItems: 'center',
    paddingHorizontal: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.large,
  },
  balanceSection: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: CommonSizes.spacing.large,
  },
  seeMoreSection: {
    alignItems: 'center',
    gap: CommonSizes.spacing.large,
    alignSelf: 'center',
  },
  sectionImage: {
    width: scaleWidth(150),
    height: scaleHeight(150),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  amountText: {
    textAlign: 'left',
  },
  balanceCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: CommonSizes.spacing.large,
    borderRadius: CommonSizes.spacing.huge,
  },
});
