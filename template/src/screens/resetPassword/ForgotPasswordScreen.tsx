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
import {useInputError} from '../../common/validations/hooks/useInputError';
import {emailValidations} from '../../common/validations/profileValidations';
import {useAppDispatch} from '../../core/store/reduxHelpers';
import {resetPassword} from '../../core/store/user/userActions';
import {CommonSizes} from '../../core/theme/commonSizes';
import {CommonStyles} from '../../core/theme/commonStyles';
import type {RootStackParamList} from '../../navigation/types';
import {NaturalColors, PrimaryColors} from '../../core/theme/colors';

export default function ForgotPasswordScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const scroll = useRef<KeyboardAwareScrollView>(null);

  const {error: emailError, recheckValue: recheckEmail} = useInputError(
    email,
    emailValidations,
  );

  function scrollToInput(reactNode: any) {
    scroll.current?.scrollToFocusedInput(reactNode);
  }

  async function handleResetPassword() {
    const isEmailValid = recheckEmail() === null;
    if (!isEmailValid) {
      return;
    }

    setLoading(true);
    await dispatch(resetPassword({email: email.toLowerCase()}));
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
        {localization.login.forgotPassword.title}
      </Text>

      <Text style={styles.description}>
        {localization.login.forgotPassword.description}
      </Text>

      <PrimaryTextInput
        onFocus={(event: NativeSyntheticEvent<TextInputFocusEventData>) => {
          scrollToInput(findNodeHandle(event.target));
        }}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        containerStyle={CommonStyles.textInputContainer}
        label={localization.login.Email}
        placeholder={localization.login.EnterEmail}
        error={emailError}
      />

      <PrimaryButton
        isLoading={loading}
        onPress={handleResetPassword}
        label={localization.login.forgotPassword.resetPassword}
        type={ButtonType.solid}
      />

      <PrimaryButton
        onPress={goToLogin}
        label={localization.login.forgotPassword.backToLogin}
        type={ButtonType.borderless}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: NaturalColors.grayScale_0,
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
  description: {
    ...CommonStyles.normalText,
    textAlign: 'center',
    marginBottom: 8,
  },
  loginLink: {
    ...CommonStyles.normalText,
    color: PrimaryColors.PlatinateBlue_700,
    textAlign: 'center',
    marginTop: 16,
  },
});
