import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoadState} from '../../../types';
import {Container} from '../../common/components/Container';
import {FlatListWrapper} from '../../common/components/FlatListWrapper';
import {ImageResources} from '../../common/ImageResources.g';
import {useTranslation} from '../../common/localization/LocalizationProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {scaleHeight, scaleWidth} from '../../core/theme/scaling';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Header} from '../../navigation/HeaderComponents';
import {RootStackParamList} from '../../navigation/types';
import {useHistoryData} from './hooks/useHistoryData';
import moment from 'moment';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {
  RTLAwareTouchableOpacity,
  RTLAwareView,
} from '../../common/components/RTLAwareView';
import {createThemedStyles} from '../../core/theme/commonStyles';
import {onBeePrint, onPrint} from '../../utils/SunmiPrinter';

export function checkNumber(value: string) {
  if (
    value.length === 11 &&
    (value.startsWith('010') ||
      value.startsWith('011') ||
      value.startsWith('012') ||
      value.startsWith('015') ||
      value.startsWith('022'))
  ) {
    return true;
  }
  return false;
}

export function History(): JSX.Element {
  const t = useTranslation();
  const {
    isLoading,
    refreshData,
    fetchInitialData,
    history,
    fetchData,
    setPage,
    page,
    hasMore,
  } = useHistoryData();

  const prepareData = (item: any): Array<any> => {
    let newData = [];

    newData.push({
      image: true,
    });

    newData.push({
      middle: item?.serviceName,
    });

    if (item?.customerNumber) {
      newData.push({
        left: item?.customerNumber,
        right: 'رقم العميل',
      });
    }
    if (!item?.customerNumber && item?.input_params && item?.input_params[0]) {
      let inputParams = item?.input_params;
      let phoneNumber = inputParams.find((item: any) => {
        if (checkNumber(item?.value)) {
          return item;
        } else if (
          item?.key === 'phone_number' ||
          item?.key === 'TelephoneNumber' ||
          item?.key === 'adslPhoneNumber'
        ) {
          return item;
        }
      });
      if (phoneNumber) {
        newData.push({
          right: 'رقم العميل',
          left: phoneNumber.value,
        });
      }
    }

    newData.push({
      left: item?.amount?.toString() + ' EGP',
      right: 'القيمة',
    });

    if (item?.convenience?.toString() !== '0') {
      newData.push({
        left: item?.convenience?.toString() + ' EGP',
        right: 'تكلفه الخدمة',
      });
    }

    newData.push({
      left: item?.totalAmount?.toString() + ' EGP',
      right: 'الإجمالي',
    });

    newData.push({
      left: item?.transaction_serial_num,
      right: 'رقم العملية',
      rightWidth: 130,
    });

    newData.push({
      left: item?.beeRefNumber ? item?.beeRefNumber : '---',
      right: 'الرقم المرجعي',
      rightWidth: 130,
    });

    newData.push({
      left: moment().locale('en').format('DD/MM/YYYY - HH:mm'),
      right: 'الوقت',
    });

    if (item?.voucherDetails && item?.voucherDetails[0]) {
      let voucherData = item?.voucherDetails[0];

      let code = voucherData?.filter(
        (item: any) => item?.key == 'code' || item?.key == 'pin_code',
      )[0]?.value;
      let expiry_timestamp = voucherData?.filter(
        (item: any) => item?.key == 'expiry_timestamp',
      )[0]?.value;
      let serial = voucherData?.filter(
        (item: any) =>
          item?.key == 'serial_number' || item?.key == 'track_number',
      )[0]?.value;

      if (serial) {
        newData.push({
          left: serial,
          right: 'الرقم المسلسل',
        });
      }

      if (code) {
        if (!code?.includes('-')) {
          code = code?.replace(/\D/g, '');
          code = code?.replace(/(.{4})/g, '$1-');
          var lastDash = code.lastIndexOf('-');
          code = code?.substr(0, lastDash);
          code = code?.trim();
        }

        newData.push({
          middle: 'كود الشحن' + '\n' + code,
          fontSize: 26,
        });
      }
      //  else {
      //   newData.push({
      //     middle: payData?.error ? '*** عملية فاشلة ***' : '*** عملية ناجحة ***',
      //   });
      // }
      if (expiry_timestamp) {
        newData.push({
          left: moment(expiry_timestamp, 'DD.MM.YYYY')
            .locale('en')
            .format('DD/MM/YYYY'),
          right: 'صالح حتي',
        });
      }
    }
    //  else {
    //   newData.push({
    //     middle: payData?.error ? '*** عملية فاشلة ***' : '*** عملية ناجحة ***',
    //   });
    // }

    if (item?.voucherDetails && item?.voucherDetails[0]) {
      let voucherData = item?.voucherDetails[0];

      let name = voucherData?.filter((item: any) => item?.key == 'name')[0]
        ?.value;
      let address = voucherData?.filter(
        (item: any) => item?.key == 'address',
      )[0]?.value;
      let day_code = voucherData?.filter(
        (item: any) => item?.key == 'day_code',
      )[0]?.value;

      if (name) {
        newData.push({
          right: 'اسم العميل',
          left: name,
        });
      }
      if (address) {
        newData.push({
          right: 'العنوان',
          left: address,
        });
      }
    }

    if (item?.explain) {
      newData.push({
        line: true,
      });
      newData.push({
        middleEnd: item?.explain + '\n',
        fontSize: 23,
      });

      newData.push({
        line: true,
      });
    }

    if (item?.note) {
      newData.push({
        middle: item?.note + '\n',
      });
    }

    if (!!item?.info_text) {
      newData.push({
        line: true,
      });
      newData.push({
        middle: t('info_text', 'pos'),
      });
      newData.push({
        middle: item?.info_text,
      });
    }

    newData.push({
      line: true,
    });

    newData.push({
      powered: item?.powered_by
        ? item?.powered_by?.includes('Powered By')
          ? item?.powered_by
          : `Powered By ${item?.powered_by}`
        : 'Powered By Masary',
      fontSize: 24,
    });

    return newData;
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const scroll = useRef<KeyboardAwareScrollView>(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      fetchInitialData();
    }
  }, [isFocused]);

  const fetchNextPage = () => {
    if (hasMore) {
      setPage(page + 1);
      fetchData(page + 1);
    }
  };

  return (
    <Container
      ref={scroll}
      testID={'HistoryScreenID'}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      backgroundImage={ImageResources[`${theme.mode}_background_1`]}
      withoutPadding
      withoutScroll
      backgroundColor={theme.colors.background}>
      <Header />
      <FlatListWrapper
        onRefresh={refreshData}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        style={{
          flex: 1,
          width: '100%',
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: scaleHeight(200),
        }}
        ItemSeparatorComponent={() => (
          <View style={{height: CommonSizes.spacing.large}} />
        )}
        keyExtractor={item => item.id}
        loadState={LoadState.needLoad}
        data={history}
        ListFooterComponent={() => {
          return (
            isLoading && (
              <ActivityIndicator
                color={theme.colors.indigoBlue}
                size={25}
                style={{marginTop: 5}}
              />
            )
          );
        }}
        renderItem={({item, index}) => {
          return (
            <RTLAwareTouchableOpacity
              disabled={
                item.sender_identifier === 'Neo_Comm' ||
                item.status === 'Failed'
              }
              onPress={async () => {
                if (item.receiver_name.includes('BeeAggregatorMerchant')) {
                  const preparedData = prepareData(item);
                  onBeePrint(preparedData);
                } else {
                  navigation.navigate('ReceiptScreen', {
                    type: 'history',
                    historyID: item.transaction_reference_num,
                  });
                }
              }}
              style={{
                width: '100%',
                backgroundColor: theme.colors.surface,
                ...createThemedStyles(theme).dropShadow,
                flexDirection: 'row',
                borderRadius: CommonSizes.borderRadius.medium,
                paddingHorizontal: CommonSizes.spacing.extraLargePlus,
                paddingVertical: CommonSizes.spacing.largePlus,
                justifyContent: 'space-between',
              }}>
              <RTLAwareView style={{alignItems: 'flex-end'}}>
                <RTLAwareText
                  style={{
                    ...theme.text.body2,
                    color:
                      item.status === 'Failed'
                        ? theme.colors.red
                        : theme.colors.mutedLavender,
                  }}>
                  {`EGP ${
                    item.status === 'Failed'
                      ? '0'
                      : item?.totalAmount ||
                        Number(item?.amount) + Number(item?.convenience)
                  }`}
                </RTLAwareText>
                <RTLAwareText
                  style={{
                    ...theme.text.navBar,
                    color:
                      item.status === 'Failed'
                        ? theme.colors.red
                        : theme.colors.mutedLavender,
                  }}>
                  {`${moment(item?.createdAt).format('DD-MM-YYYY | hh:mm A')}`}
                </RTLAwareText>
              </RTLAwareView>
              <RTLAwareText
                style={{
                  ...theme.text.body2,
                  width: '50%',
                  alignSelf: 'center',
                  color:
                    item.status === 'Failed'
                      ? theme.colors.red
                      : theme.colors.mutedLavender,
                }}>
                {item.sender_identifier === 'Neo_Comm'
                  ? t('commission')
                  : item?.meta?.serviceName || item?.serviceName}
              </RTLAwareText>
            </RTLAwareTouchableOpacity>
          );
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
  },
  searchBar: {
    width: '90%',
    alignSelf: 'center',
    marginTop: CommonSizes.spacing.medium,
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
    width: scaleWidth(120),
    height: scaleHeight(70),
  },
  amountText: {
    textAlign: 'left',
  },
  balanceCard: {
    width: '100%',
    borderRadius: CommonSizes.spacing.huge,
  },
});
