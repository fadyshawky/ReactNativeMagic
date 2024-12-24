import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {toLower} from 'lodash';
import React, {useRef, useState} from 'react';
import {
  findNodeHandle,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonType} from '../../../types';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {PrimaryTextInput} from '../../common/components/PrimaryTextInput';
import {localization} from '../../common/localization/localization';
import {emptyValidation} from '../../common/validations/commonValidations';
import {useInputError} from '../../common/validations/hooks/useInputError';
import {emailValidations} from '../../common/validations/profileValidations';
import {useAppDispatch} from '../../core/store/reduxHelpers';
import {userLogin} from '../../core/store/user/userActions';
import {Colors, NewColors} from '../../core/theme/colors';
import {CommonSizes} from '../../core/theme/commonSizes';
import {CommonStyles} from '../../core/theme/commonStyles';
import type {RootStackParamList} from '../../navigation/types';

export function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {error: emailError, recheckValue: recheckEmail} = useInputError(
    email,
    emailValidations,
  );
  const {error: passwordError, recheckValue: recheckPassword} = useInputError(
    password,
    emptyValidation,
  );

  async function loginUser() {
    const emailValid = recheckEmail() === null;
    const passwordValid = recheckPassword() === null;

    if (!emailValid || !passwordValid) {
      return;
    }

    setLoading(true);
    await dispatch(
      userLogin({
        email: toLower(email),
        password,
      }),
    );
    setLoading(false);
  }
  const scroll = useRef<KeyboardAwareScrollView>(null);
  function scrollToInput(reactNode: any) {
    // Add a 'scroll' ref to your ScrollView

    // setTimeout(() => {
    scroll.current?.scrollToFocusedInput(reactNode);
    // }, 500);
  }

  const goToRegistration = () => {
    navigation.navigate('Registration');
  };

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAwareScrollView
      ref={scroll}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={true}
      enableOnAndroid={true}
      testID={'MainPageID'}
      contentContainerStyle={styles.contentContainer}
      contentInsetAdjustmentBehavior={'automatic'}
      style={styles.container}>
      <Text style={CommonStyles.h1_semiBold}>{localization.login.Login}</Text>
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
      <PrimaryTextInput
        onFocus={(event: NativeSyntheticEvent<TextInputFocusEventData>) => {
          scrollToInput(findNodeHandle(event.target));
        }}
        clearButtonMode="never"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        containerStyle={CommonStyles.textInputContainer}
        label={localization.login.Password}
        placeholder={localization.login.EnterPassword}
        error={passwordError}
      />
      <PrimaryButton
        onPress={goToForgotPassword}
        label={localization.login.forgetPassword}
        type={ButtonType.borderless}
      />
      <PrimaryButton
        isLoading={loading}
        onPress={loginUser}
        label={localization.login.continue}
        type={ButtonType.solid}
      />
      <PrimaryButton
        onPress={goToRegistration}
        label={localization.login.notMember}
        type={ButtonType.borderless}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    ...CommonStyles.flex1,
    justifyContent: 'flex-end',
  },
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
  forgotPassword: {
    ...CommonStyles.normalText,
    color: NewColors.blueNormalActive,
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 24,
  },
  registerLink: {
    ...CommonStyles.normalText,
    color: NewColors.blueNormalActive,
    textAlign: 'center',
    marginTop: 16,
  },
});
