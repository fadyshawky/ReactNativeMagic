import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonType} from '../../../types';
import {Container} from '../../common/components/Container';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {OTPInput} from '../../common/components/OTPInput';
import {useInputError} from '../../common/validations/hooks/useInputError';
import {useAppDispatch} from '../../core/store/reduxHelpers';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
import {ImageResources} from '../../common/ImageResources.g';
import {Header, HeaderBack} from '../../navigation/HeaderComponents';
import type {RootStackParamList} from '../../navigation/types';
import {verifyOTP} from '../../core/store/user/userActions';
import {
  useTranslation,
  useRTL,
} from '../../common/localization/LocalizationProvider';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';

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
  const isRTL = useRTL();

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

      const result = await dispatch(
        verifyOTP({
          verification_code: otp?.toString(),
          mobile_number: phone,
          device_token: undefined,
          scheme_id: 1,
        }),
      );
    } catch (error) {
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
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      backgroundImage={ImageResources.background_2}
      withoutPadding
      extendedBackground
      backgroundColor={theme.colors.background}>
      <HeaderBack onPress={() => navigation.goBack()} />
      <RTLAwareText style={{...theme.text.header1, textAlign: 'center'}}>
        {t('title', 'otp')}
      </RTLAwareText>
      <RTLAwareText style={{...theme.text.body2, textAlign: 'center'}}>
        {t('subtitle', 'otp')}
      </RTLAwareText>
      <View style={styles.inputContainer}>
        <OTPInput value={otp} onChange={setOTP} error={otpError} />
        {otpError && (
          <RTLAwareText style={[theme.text.body2, styles.errorText]}>
            {otpError}
          </RTLAwareText>
        )}
      </View>
      <RTLAwareView style={styles.resendContainer}>
        <RTLAwareText style={{...theme.text.body2}}>
          {resendDisabled
            ? t('resendIn', 'otp').replace('{0}', timer?.toString())
            : t('didntReceiveCode', 'otp')}
        </RTLAwareText>
        <PrimaryButton
          label={t('resend', 'otp')}
          onPressIn={handleResendOTP}
          disabled={resendDisabled}
          type={ButtonType.borderless}
          style={styles.resendButton}
        />
      </RTLAwareView>
      <PrimaryButton
        label={t('verify', 'otp')}
        onPressIn={handleVerifyOTP}
        isLoading={loading}
        disabled={loading || otp.length < 4}
        type={ButtonType.solid}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderTopRightRadius: CommonSizes.spacing.large,
    borderTopLeftRadius: CommonSizes.spacing.large,
    paddingHorizontal: CommonSizes.spacing.medium,
    gap: 8,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    width: '100%',
    marginTop: CommonSizes.spacing.large,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: CommonSizes.spacing.small,
  },
  resendButton: {
    marginLeft: CommonSizes.spacing.small,
  },
  errorText: {
    color: '#FF4444',
    marginTop: CommonSizes.spacing.small,
    textAlign: 'center',
  },
});
