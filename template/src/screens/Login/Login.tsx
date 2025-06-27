import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonType} from '../../../types';
import {Container} from '../../common/components/Container';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {PrimaryTextInput} from '../../common/components/PrimaryTextInput';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {ImageResources} from '../../common/ImageResources.g';
import {
  useTranslation,
  useRTL,
} from '../../common/localization/LocalizationProvider';
import {phoneValidations} from '../../common/validations/authValidations';
import {emptyValidation} from '../../common/validations/commonValidations';
import {useInputError} from '../../common/validations/hooks/useInputError';
import {useAppDispatch} from '../../core/store/reduxHelpers';
import {userLogin} from '../../core/store/user/userActions';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Fonts} from '../../core/theme/fonts';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Header} from '../../navigation/HeaderComponents';
import type {RootStackParamList} from '../../navigation/types';
import {scaleHeight} from '../../core/theme/scaling';

export function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scroll = useRef<KeyboardAwareScrollView>(null);
  const {theme} = useTheme();
  const t = useTranslation();
  const isRTL = useRTL();

  const {error: phoneError, recheckValue: recheckPhone} = useInputError(
    phone,
    phoneValidations,
  );
  const {error: passwordError, recheckValue: recheckPassword} = useInputError(
    password,
    emptyValidation,
  );

  async function loginUser() {
    const phoneValid = recheckPhone() === null;
    const passwordValid = recheckPassword() === null;

    if (!phoneValid || !passwordValid) {
      return;
    }
    try {
      setLoading(true);
      const result = await dispatch(
        userLogin({
          phone: phone,
          password,
        }),
      );

      if (userLogin.fulfilled.match(result)) {
        navigation.navigate('OTP', {phone: phone});
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <Container
      ref={scroll}
      testID={'LoginScreenID'}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      backgroundImage={ImageResources.background_2}
      withoutPadding
      extendedBackground
      backgroundColor={theme.colors.background}>
      <Header />
      <RTLAwareText style={{...theme.text.header1, textAlign: 'center'}}>
        {t('welcome', 'login')}
      </RTLAwareText>
      <PrimaryTextInput
        value={phone}
        onChangeText={setPhone}
        error={phoneError}
        keyboardType="numeric"
        placeholder={t('EnterPhone', 'login')}
      />
      <PrimaryTextInput
        value={password}
        onChangeText={setPassword}
        error={passwordError}
        secureTextEntry={true}
        keyboardType="numeric"
        placeholder={t('EnterPassword', 'login')}
      />

      <RTLAwareView
        style={{width: '100%', alignItems: isRTL ? 'flex-start' : 'flex-end'}}>
        <PrimaryButton
          label={t('forgetPassword', 'login')}
          onPressIn={goToForgotPassword}
          type={ButtonType.borderless}
        />
      </RTLAwareView>
      <PrimaryButton
        label={t('Login', 'login')}
        onPressIn={loginUser}
        isLoading={loading}
        disabled={loading}
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
    paddingHorizontal: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.xl,
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
  title: {
    textAlign: 'center',
    fontSize: CommonSizes.fontSize.header1,
    fontWeight: 'bold',
    fontFamily: Fonts.regular,
  },
});
