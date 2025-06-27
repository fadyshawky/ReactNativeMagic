import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonType} from '../../../types';
import {Container} from '../../common/components/Container';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {PrimaryTextInput} from '../../common/components/PrimaryTextInput';
import {ImageResources} from '../../common/ImageResources.g';
import {useInputError} from '../../common/validations/hooks/useInputError';
import {useAppDispatch} from '../../core/store/reduxHelpers';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Header} from '../../navigation/HeaderComponents';
import type {RootStackParamList} from '../../navigation/types';
import {resetPassword} from '../../core/store/user/userActions';
import {
  useTranslation,
  useRTL,
} from '../../common/localization/LocalizationProvider';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';

export function ForceChangePasswordScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scroll = useRef<KeyboardAwareScrollView>(null);
  const {theme} = useTheme();
  const t = useTranslation();
  const isRTL = useRTL();

  const {error: currentPasswordError, recheckValue: recheckCurrentPassword} =
    useInputError(currentPassword, value =>
      value.length < 6 ? 'Password must be at least 6 characters' : null,
    );

  const {error: newPasswordError, recheckValue: recheckNewPassword} =
    useInputError(newPassword, value => {
      if (value.length < 6) return 'Password must be at least 6 characters';
      if (value === currentPassword)
        return 'New password must be different from current password';
      return null;
    });

  const {error: confirmPasswordError, recheckValue: recheckConfirmPassword} =
    useInputError(confirmPassword, value =>
      value !== newPassword ? 'Passwords do not match' : null,
    );

  async function handleChangePassword() {
    const currentPasswordValid = recheckCurrentPassword() === null;
    const newPasswordValid = recheckNewPassword() === null;
    const confirmPasswordValid = recheckConfirmPassword() === null;

    if (!currentPasswordValid || !newPasswordValid || !confirmPasswordValid) {
      return;
    }

    setLoading(true);
    try {
      // Add your change password logic here
      const response = await dispatch(
        resetPassword({
          mpin: currentPassword,
          new_mpin: newPassword,
          confirm_mpin: confirmPassword,
        }),
      );

      if (resetPassword.fulfilled.match(response)) {
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container
      ref={scroll}
      testID={'ForceChangePasswordID'}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      backgroundImage={ImageResources.background_2}
      withoutPadding
      extendedBackground
      backgroundColor={theme.colors.background}>
      <Header />
      <RTLAwareText style={{...theme.text.body2, textAlign: 'center'}}>
        {t('forceChange.subtitle', 'password')}
      </RTLAwareText>
      <PrimaryTextInput
        label={t('forceChange.currentPassword', 'password')}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        error={currentPasswordError}
        placeholder={t('forceChange.enterCurrentPassword', 'password')}
        secureTextEntry={true}
        keyboardType="numeric"
      />
      <PrimaryTextInput
        label={t('forceChange.newPassword', 'password')}
        value={newPassword}
        onChangeText={setNewPassword}
        error={newPasswordError}
        placeholder={t('forceChange.enterNewPassword', 'password')}
        secureTextEntry={true}
        keyboardType="numeric"
      />
      <PrimaryTextInput
        label={t('forceChange.confirmPassword', 'password')}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        error={confirmPasswordError}
        placeholder={t('forceChange.confirmNewPassword', 'password')}
        secureTextEntry={true}
        keyboardType="numeric"
      />
      <PrimaryButton
        label={t('forceChange.changePassword', 'password')}
        onPressIn={handleChangePassword}
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
    justifyContent: 'flex-start',
    gap: CommonSizes.spacing.large,
  },
  contentContainer: {
    flexGrow: 1,
  },
  formContainer: {
    width: '100%',
    marginTop: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.medium,
  },
});
