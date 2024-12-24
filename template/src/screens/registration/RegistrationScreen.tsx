import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  findNodeHandle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonType} from '../../../types';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {PrimaryTextInput} from '../../common/components/PrimaryTextInput';
import {localization} from '../../common/localization/localization';
import {emptyValidation} from '../../common/validations/commonValidations';
import {useInputError} from '../../common/validations/hooks/useInputError';
import {
  emailValidations,
  fullNameValidations,
} from '../../common/validations/profileValidations';
import {useAppDispatch} from '../../core/store/reduxHelpers';
import {userRegister} from '../../core/store/user/userActions';
import {Colors, NewColors} from '../../core/theme/colors';
import {CommonSizes} from '../../core/theme/commonSizes';
import {CommonStyles} from '../../core/theme/commonStyles';
import type {RootStackParamList} from '../../navigation/types';

export default function RegistrationScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const scroll = useRef<KeyboardAwareScrollView>(null);

  // Add validation hooks
  const {error: fullNameError, recheckValue: recheckFullName} = useInputError(
    formData.fullName,
    fullNameValidations,
  );
  const {error: emailError, recheckValue: recheckEmail} = useInputError(
    formData.email,
    emailValidations,
  );
  const {error: passwordError, recheckValue: recheckPassword} = useInputError(
    formData.password,
    emptyValidation,
  );
  const {error: confirmPasswordError, recheckValue: recheckConfirmPassword} =
    useInputError(formData.confirmPassword, emptyValidation);

  function scrollToInput(reactNode: any) {
    scroll.current?.scrollToFocusedInput(reactNode);
  }

  async function handleRegistration() {
    // Validate all fields
    const isFullNameValid = recheckFullName() === null;
    const isEmailValid = recheckEmail() === null;
    const isPasswordValid = recheckPassword() === null;
    const isConfirmPasswordValid = recheckConfirmPassword() === null;

    if (
      !isFullNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      // Add error handling for password mismatch
      return;
    }

    setLoading(true);
    await dispatch(
      userRegister({
        fullName: formData.fullName,
        email: formData.email.toLowerCase(),
        password: formData.password,
      }),
    );
    setLoading(false);
  }

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAwareScrollView
      ref={scroll}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={true}
      enableOnAndroid={true}
      contentContainerStyle={styles.contentContainer}
      contentInsetAdjustmentBehavior={'automatic'}
      style={styles.container}>
      <Text style={CommonStyles.h1_semiBold}>
        {localization.login.registration.title}
      </Text>

      <PrimaryTextInput
        onFocus={(event: NativeSyntheticEvent<TextInputFocusEventData>) => {
          scrollToInput(findNodeHandle(event.target));
        }}
        value={formData.fullName}
        onChangeText={text => setFormData({...formData, fullName: text})}
        containerStyle={CommonStyles.textInputContainer}
        label={localization.login.registration.fullName}
        placeholder={localization.login.registration.fullName}
        error={fullNameError}
      />

      <PrimaryTextInput
        onFocus={(event: NativeSyntheticEvent<TextInputFocusEventData>) => {
          scrollToInput(findNodeHandle(event.target));
        }}
        autoCapitalize="none"
        value={formData.email}
        onChangeText={text => setFormData({...formData, email: text})}
        containerStyle={CommonStyles.textInputContainer}
        label={localization.login.registration.email}
        placeholder={localization.login.EnterEmail}
        error={emailError}
      />

      <PrimaryTextInput
        onFocus={(event: NativeSyntheticEvent<TextInputFocusEventData>) => {
          scrollToInput(findNodeHandle(event.target));
        }}
        secureTextEntry
        value={formData.password}
        onChangeText={text => setFormData({...formData, password: text})}
        containerStyle={CommonStyles.textInputContainer}
        label={localization.login.registration.password}
        placeholder={localization.login.EnterPassword}
        error={passwordError}
      />

      <PrimaryTextInput
        onFocus={(event: NativeSyntheticEvent<TextInputFocusEventData>) => {
          scrollToInput(findNodeHandle(event.target));
        }}
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={text => setFormData({...formData, confirmPassword: text})}
        containerStyle={CommonStyles.textInputContainer}
        label={localization.login.registration.confirmPassword}
        placeholder={localization.login.registration.confirmPassword}
        error={confirmPasswordError}
      />

      <PrimaryButton
        isLoading={loading}
        onPress={handleRegistration}
        label={localization.login.registration.register}
        type={ButtonType.solid}
      />
      <PrimaryButton
        onPress={goToLogin}
        label={localization.login.registration.alreadyHaveAccount}
        type={ButtonType.borderless}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    borderTopRightRadius: CommonSizes.spacing.large,
    borderTopLeftRadius: CommonSizes.spacing.large,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: CommonSizes.spacing.large,
    paddingVertical: 26,
    gap: 16,
  },
  loginLink: {
    ...CommonStyles.normalText,
    color: NewColors.blueNormalActive,
    textAlign: 'center',
    marginTop: 16,
  },
});
