import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LoadState} from '../../../../types';
import {FlatListWrapper} from '../../../common/components/FlatListWrapper';
import {PrimaryTextInput} from '../../../common/components/PrimaryTextInput';
import {RTLAwareText} from '../../../common/components/RTLAwareText';
import {RTLAwareView} from '../../../common/components/RTLAwareView';
import {ImageResources} from '../../../common/ImageResources.g';
import {useTranslation} from '../../../common/localization/LocalizationProvider';
import {initFees} from '../../../common/utils/FeesCaalculation';
import {useInputError} from '../../../common/validations/hooks/useInputError';
import {useAppSelector} from '../../../core/store/reduxHelpers';
import {RootState} from '../../../core/store/rootReducer';
import {
  BillTypeRefKeyEntity1,
  PaymentRanges,
} from '../../../core/store/Services/servicesState';
import {CommonSizes} from '../../../core/theme/commonSizes';
import {scaleHeight, scaleWidth} from '../../../core/theme/scaling';
import {useTheme} from '../../../core/theme/ThemeProvider';
import {useFeesCalculation} from '../../../utils/feesCalculator';

interface AmountInputProps {
  currencyCode: string;
  value: string;
  setVatValue: Dispatch<SetStateAction<string>>;
  vatValue: string;
  setAmount: Dispatch<SetStateAction<string>>;
  vat_value: number | null;
  low: string;
  high: string;
}

interface PaymentRangeButtonProps {
  amount: string;
  isSelected: boolean;
  onPress: () => void;
  disabled?: boolean;
}

interface FawryInputsProps {
  setFawryInputParameters: Dispatch<SetStateAction<any>>;
  fawryInputParameters: any;
  selectedPaymentRange: string;
  setSelectedPaymentRange: Dispatch<SetStateAction<string>>;
  quantity: string;
  setQuantity: Dispatch<SetStateAction<string>>;
  vatValue: string;
  setVatValue: Dispatch<SetStateAction<string>>;
  fees: number;
}

const AmountInput: React.FC<AmountInputProps> = ({
  currencyCode,
  value,
  setVatValue,
  vatValue,
  setAmount,
  vat_value,
  low,
  high,
}) => {
  const {theme} = useTheme();
  const t = useTranslation();

  const {calculateFromAmount, calculateFromVat} = useFeesCalculation(
    value,
    vat_value || 0,
    currencyCode,
    vatValue,
    setVatValue,
    setAmount,
  );

  const handleAmountChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9.]/g, '');
    setAmount(sanitizedText);
    calculateFromAmount(sanitizedText);
  };

  const handleVatValueChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9.]/g, '');
    setVatValue(sanitizedText);
    calculateFromVat(sanitizedText);
  };

  return (
    <RTLAwareView style={styles.amountInputWrapper}>
      <RTLAwareView
        style={[
          styles.amountInputContainer,
          vat_value ? styles.amountInputContainer : styles.fullWidthInput,
        ]}>
        <PrimaryTextInput
          onChangeText={vat_value ? handleVatValueChange : handleAmountChange}
          width={vat_value ? '45%' : '100%'}
          placeholder={t('voucher', 'common')}
          keyboardType={'numeric'}
          value={vat_value ? vatValue : value}
        />
        {vat_value && (
          <>
            <Image source={ImageResources.arrows} style={styles.arrowsImage} />
            <PrimaryTextInput
              onChangeText={handleAmountChange}
              width={vat_value ? '45%' : '100%'}
              placeholder={t('amountToPay', 'common')}
              keyboardType={'numeric'}
              value={value}
            />
          </>
        )}
      </RTLAwareView>
      <RTLAwareText style={theme.text.body2}>
        {`${low} ${currencyCode} - ${high} ${currencyCode}`}
      </RTLAwareText>
    </RTLAwareView>
  );
};

const PaymentRangeButton: React.FC<PaymentRangeButtonProps> = ({
  amount,
  isSelected,
  onPress,
  disabled,
}) => {
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.paymentRangeButton,
        isSelected && styles.selectedPaymentRangeButton,
        {borderColor: theme.colors.indigoBlue},
      ]}
      onPress={onPress}>
      <Text style={theme.text.header2}>{amount}</Text>
    </TouchableOpacity>
  );
};

export function FawryInputs({
  setFawryInputParameters,
  fawryInputParameters,
  selectedPaymentRange,
  setVatValue,
  vatValue,
  setSelectedPaymentRange,
  quantity,
  setQuantity,
  fees,
}: FawryInputsProps): JSX.Element {
  const [selectedEnum, setEnum] = useState<number | null>(null);
  const {theme} = useTheme();
  const t = useTranslation();
  const {service} = useAppSelector((state: RootState) => state.services);

  const paymentRanges = service?.PaymentRanges as PaymentRanges | null;
  const hasEnums = service?.BillTypeExtraRefKeys?.BillTypeRefKey?.some(
    k => k.EnumValues,
  );
  const amountInput =
    !hasEnums &&
    paymentRanges?.PaymentRangeType?.find(
      item => item?.Lower?.Amt !== item?.Upper?.Amt,
    );

  const {calculateFromAmount} = useFeesCalculation(
    selectedPaymentRange,
    service?.vat_value || 0,
    amountInput?.Lower?.CurCode || '',
    vatValue,
    setVatValue,
    setSelectedPaymentRange,
  );

  useEffect(() => {
    if (paymentRanges?.PaymentRangeType?.length === 1) {
      setSelectedPaymentRange(
        paymentRanges?.PaymentRangeType?.[0]?.Lower?.Amt?.toString() || '',
      );
    }
  }, []);

  const handlePaymentRangeSelect = (amount: string) => {
    setSelectedPaymentRange(amount);
    calculateFromAmount(amount);
  };

  const {error: acctError} = useInputError(
    fawryInputParameters?.BillingAcct as string,
    () => '',
  );

  return (
    <>
      {service?.AcctInputMethod !== 'SC' &&
        service?.AcctInputMethod !== 'PSAG' &&
        service?.AcctInputMethod !== 'GASSC' &&
        service?.PmtType !== 'VOCH' && (
          <PrimaryTextInput
            regex={
              service?.BillingActRegEX
                ? new RegExp(service.BillingActRegEX)
                : undefined
            }
            regexErrorMessage={t('invalidAccountNumber', 'common')}
            placeholder={service?.BillTypeAcctLabel || ''}
            value={(fawryInputParameters?.BillingAcct as string) || ''}
            keyboardType={
              service?.AcctInputMethod === 'KB' ? 'default' : 'numeric'
            }
            onChangeText={text => {
              setFawryInputParameters({
                ...fawryInputParameters,
                BillingAcct: text,
              });
            }}
          />
        )}

      {amountInput && (
        <>
          <AmountInput
            vat_value={!!service?.vat_value ? service.vat_value : 0}
            setVatValue={setVatValue}
            vatValue={vatValue}
            currencyCode={amountInput?.Lower?.CurCode || ''}
            value={selectedPaymentRange}
            setAmount={setSelectedPaymentRange}
            low={amountInput?.Lower?.Amt?.toString() || ''}
            high={amountInput?.Upper?.Amt?.toString() || ''}
          />
        </>
      )}

      {service?.PmtType !== 'POST' && fees > 0 && (
        <RTLAwareText style={[theme.text.body2, styles.serviceCost]}>
          {`${t('serviceCost', 'pos')}: EGP ${fees}`}
        </RTLAwareText>
      )}
      {service?.BillTypeExtraRefKeys?.BillTypeRefKey?.filter(
        k => k.InputMethod === 'KP' || k.InputMethod === 'KB',
      ).map((item, index) => {
        return item?.EnumValues ? (
          <FlatListWrapper
            scrollEnabled={false}
            numColumns={3}
            keyExtractor={(_, index) => index.toString()}
            loadState={LoadState.needLoad}
            contentContainerStyle={styles.flatListContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            data={item?.EnumValues?.EnumValue}
            renderItem={({item: ser, index: ind}) => (
              <TouchableOpacity
                disabled={selectedEnum !== null && selectedEnum !== ind}
                style={[
                  styles.enumButton,
                  ind === selectedEnum && styles.selectedEnumButton,
                  {
                    borderColor: theme.colors.indigoBlue,
                    marginHorizontal: ind % 2 !== 0 ? scaleWidth(16) : 0,
                  },
                ]}
                onPress={() => {
                  if (selectedEnum === ind) {
                    setEnum(null);
                    if (ser?.Amount) {
                      handlePaymentRangeSelect(null);
                    }
                    setFawryInputParameters({
                      ...fawryInputParameters,
                      ExtraBillingAcctKey:
                        fawryInputParameters.ExtraBillingAcctKey.map(
                          (k: any) => {
                            if (k.Key === item.Key) {
                              return {...k, Value: undefined};
                            }
                            return k;
                          },
                        ),
                    });
                  } else {
                    setEnum(ind);
                    if (ser?.Amount) {
                      handlePaymentRangeSelect(ser.Amount);
                    }
                    setFawryInputParameters({
                      ...fawryInputParameters,
                      ExtraBillingAcctKey:
                        fawryInputParameters.ExtraBillingAcctKey.map(
                          (k: any) => {
                            if (k.Key === item.Key) {
                              return {...k, Value: ser?.Value};
                            }
                            return k;
                          },
                        ),
                    });
                  }
                }}>
                <Text style={[theme.text.body2, styles.enumButtonText]}>
                  {ser?.Alias}
                </Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <PrimaryTextInput
            regex={
              (item as BillTypeRefKeyEntity1)?.RegEX
                ? new RegExp((item as BillTypeRefKeyEntity1).RegEX || '')
                : undefined
            }
            regexErrorMessage={t('invalid_format', 'common')}
            keyboardType={item?.InputMethod === 'KB' ? 'default' : 'numeric'}
            placeholder={`${item?.Label} ${
              item?.Required ? '' : t('optional', 'common')
            }`}
            value={
              fawryInputParameters.ExtraBillingAcctKey?.[index]?.Value as string
            }
            onChangeText={text => {
              const tmp = [...fawryInputParameters.ExtraBillingAcctKey];
              tmp[index].Value = text;
              setFawryInputParameters({
                ...fawryInputParameters,
                ExtraBillingAcctKey: tmp,
              });
            }}
          />
        );
      })}

      {paymentRanges?.PaymentRangeType && (
        <FlatListWrapper
          scrollEnabled={false}
          numColumns={3}
          keyExtractor={(_, index) => index.toString()}
          loadState={LoadState.needLoad}
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={paymentRanges.PaymentRangeType.filter(
            item => item?.Lower?.Amt === item?.Upper?.Amt,
          )}
          renderItem={({item, index}) => (
            <PaymentRangeButton
              amount={item?.Lower?.Amt?.toString() || ''}
              isSelected={selectedPaymentRange === item?.Lower?.Amt?.toString()}
              onPress={() => {
                if (selectedPaymentRange !== item?.Lower?.Amt?.toString()) {
                  handlePaymentRangeSelect(item?.Lower?.Amt?.toString() || '');
                } else {
                  setSelectedPaymentRange('');
                  setVatValue('');
                }
              }}
              disabled={
                (amountInput &&
                  !!selectedPaymentRange &&
                  selectedPaymentRange !== item?.Lower?.Amt?.toString()) ||
                (!!selectedPaymentRange &&
                  selectedPaymentRange !== item?.Lower?.Amt?.toString())
              }
            />
          )}
        />
      )}
      {service?.PmtType === 'VOCH' && (
        <>
          <PrimaryTextInput
            placeholder={t('quantity', 'common')}
            value={quantity}
            onChangeText={text => {
              const maxQuantity = 5; // Default max quantity
              if (Number(text) <= maxQuantity) {
                setQuantity(text);
              }
            }}
          />
          <RTLAwareText style={theme.text.body1}>
            {`${t('quantity', 'common')}: 1-5`}
          </RTLAwareText>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  amountInputWrapper: {
    alignItems: 'center',
    gap: scaleHeight(16),
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  fullWidthInput: {
    justifyContent: 'center',
  },
  arrowsImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  serviceCost: {
    alignSelf: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 0,
  },
  separator: {
    height: scaleHeight(16),
  },
  enumButton: {
    width: scaleWidth(177),
    height: scaleHeight(180),
    backgroundColor: 'transparent',
    borderRadius: CommonSizes.borderRadius.huge,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
  },
  selectedEnumButton: {
    borderWidth: 1,
  },
  enumButtonText: {
    textAlign: 'center',
  },
  paymentRangeButton: {
    width: scaleWidth(177),
    height: scaleHeight(126),
    backgroundColor: 'transparent',
    borderRadius: CommonSizes.borderRadius.huge,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scaleWidth(16),
    borderWidth: 0,
  },
  selectedPaymentRangeButton: {
    borderWidth: 1,
  },
});
