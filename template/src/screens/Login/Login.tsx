import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonType} from '../../../types';
import {AppTextInput} from '../../common/components/AppTextInput';
import {Chip} from '../../common/components/Chip';
import {Container} from '../../common/components/Container';
import {Logo} from '../../common/components/Logo';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {Languages} from '../../common/localization/localization';
import {
  useLocalization,
  useTranslation,
} from '../../common/localization/LocalizationProvider';
import {phoneValidations} from '../../common/validations/authValidations';
import {emptyValidation} from '../../common/validations/commonValidations';
import {useInputError} from '../../common/validations/hooks/useInputError';
import {useAppDispatch} from '../../core/store/reduxHelpers';
import {userLogin} from '../../core/store/user/userActions';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
import type {RootStackParamList} from '../../navigation/types';

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
  const {currentLanguage, changeLanguage} = useLocalization();

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
      const result = await dispatch(userLogin({phone, password}));
      if (userLogin.fulfilled.match(result)) {
        navigation.navigate('OTP', {phone});
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }

  const toggleLanguage = () =>
    changeLanguage(
      currentLanguage === Languages.ar ? Languages.en : Languages.ar,
    );

  const descriptionColor = {color: theme.colors.textSecondary};

  return (
    <Container
      ref={scroll}
      testID={'LoginScreenID'}
      style={styles.container}
      backgroundImage={0}
      backgroundColor={theme.colors.bgCanvas}>
      <RTLAwareView style={styles.topRow}>
        <Chip
          label={currentLanguage === Languages.ar ? 'العربية' : 'English'}
          onPress={toggleLanguage}
        />
      </RTLAwareView>
      <RTLAwareView style={styles.logoWrap}>
        <Logo size={56} variant="mark" />
      </RTLAwareView>
      <View style={styles.titleBlock}>
        <RTLAwareText style={[theme.text.h1, styles.center]}>
          {t('welcome', 'login')}
        </RTLAwareText>
        <RTLAwareText
          style={[theme.text.body, styles.center, descriptionColor]}>
          {t('welcome_description', 'login')}
        </RTLAwareText>
      </View>
      <View style={styles.form}>
        <AppTextInput
          label={t('phoneOrEmail', 'login')}
          value={phone}
          onChangeText={setPhone}
          error={phoneError}
          keyboardType="numeric"
          placeholder={t('EnterPhone', 'login')}
        />
        <AppTextInput
          label={t('Password', 'login')}
          value={password}
          onChangeText={setPassword}
          error={passwordError}
          secureTextEntry
          placeholder={t('EnterPassword', 'login')}
        />
        <PrimaryButton
          label={t('signIn', 'login')}
          onPressIn={loginUser}
          isLoading={loading}
          disabled={loading}
          type={ButtonType.solid}
        />
        <RTLAwareView style={styles.helpWrap}>
          <PrimaryButton
            label={t('needHelp', 'login')}
            type={ButtonType.borderless}
            onPressIn={() => {}}
          />
        </RTLAwareView>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: CommonSizes.layout.gutterAuth},
  titleBlock: {gap: CommonSizes.layout.titleToBody},
  form: {gap: CommonSizes.layout.stack},
  center: {textAlign: 'center'},
  topRow: {flexDirection: 'row', justifyContent: 'flex-end'},
  logoWrap: {alignItems: 'center'},
  helpWrap: {alignItems: 'center'},
});
