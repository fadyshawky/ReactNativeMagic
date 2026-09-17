import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonType} from '../../../types';
import {Container} from '../../common/components/Container';
import {OTPInput} from '../../common/components/OTPInput';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {useTranslation} from '../../common/localization/LocalizationProvider';
import {useInputError} from '../../common/validations/hooks/useInputError';
import {useAppDispatch} from '../../core/store/reduxHelpers';
import {verifyOTP} from '../../core/store/user/userActions';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
import {HeaderBack} from '../../navigation/HeaderComponents';
import type {RootStackParamList} from '../../navigation/types';

export function OTPScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const scroll = useRef<KeyboardAwareScrollView>(null);
  const {theme} = useTheme();
  const {phone} = route.params as {phone: string};
  const t = useTranslation();

  const {error: otpError, recheckValue: recheckOTP} = useInputError(
    otp,
    value => (value.length === 6 ? null : 'Please enter a valid OTP code'),
  );

  async function handleVerifyOTP() {
    const otpValid = recheckOTP() === null;

    if (!otpValid) {
      return;
    }

    try {
      setLoading(true);

      await dispatch(
        verifyOTP({
          verification_code: otp?.toString(),
          mobile_number: phone,
          device_token: undefined,
          scheme_id: 1,
        }),
      );
    } catch {
    } finally {
      setLoading(false);
    }
  }

  const handleResendOTP = () => {
    if (resendDisabled) return;

    setResendDisabled(true);
    setTimer(60);

    // Add your resend OTP logic here
    // dispatch(resendOTP());

    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  return (
    <Container
      ref={scroll}
      testID={'OTPScreenID'}
      style={styles.container}
      backgroundImage={0}
      backgroundColor={theme.colors.bgCanvas}>
      <HeaderBack onPress={() => navigation.goBack()} />
      <View style={styles.titleBlock}>
        <RTLAwareText style={[theme.text.h1, styles.center]}>
          {t('title', 'otp')}
        </RTLAwareText>
        <RTLAwareText
          style={[
            theme.text.body,
            styles.center,
            {color: theme.colors.textSecondary},
          ]}>
          {t('subtitle', 'otp')}
        </RTLAwareText>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <OTPInput value={otp} onChange={setOTP} error={otpError} />
          {otpError && (
            <RTLAwareText
              style={[
                theme.text.bodySm,
                styles.errorText,
                {color: theme.colors.dangerFg},
              ]}>
              {otpError}
            </RTLAwareText>
          )}
        </View>
        <RTLAwareView style={styles.resendContainer}>
          <RTLAwareText
            style={[theme.text.bodySm, {color: theme.colors.textTertiary}]}>
            {resendDisabled
              ? t('resendIn', 'otp').replace('{0}', timer?.toString())
              : t('didntReceiveCode', 'otp')}
          </RTLAwareText>
          <PrimaryButton
            label={t('resend', 'otp')}
            onPressIn={handleResendOTP}
            disabled={resendDisabled}
            type={ButtonType.borderless}
            size="sm"
          />
        </RTLAwareView>
        <PrimaryButton
          label={t('verify', 'otp')}
          onPressIn={handleVerifyOTP}
          isLoading={loading}
          disabled={loading || otp.length < 4}
          type={ButtonType.solid}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: CommonSizes.layout.gutterAuth},
  titleBlock: {gap: CommonSizes.layout.titleToBody},
  form: {gap: CommonSizes.layout.stack},
  center: {textAlign: 'center'},
  inputContainer: {gap: CommonSizes.layout.field},
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: CommonSizes.spacing.small,
  },
  errorText: {textAlign: 'center'},
});
