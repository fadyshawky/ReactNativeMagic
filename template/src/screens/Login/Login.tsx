import {toLower} from 'lodash';
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
import {useAppDispatch} from '../../core/store/reduxHelpers';
import {userLogin} from '../../core/store/user/userActions';
import {Colors} from '../../core/theme/colors';
import {CommonSizes} from '../../core/theme/commonSizes';
import {CommonStyles} from '../../core/theme/commonStyles';

export function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function loginUser() {
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
      />
      <PrimaryButton
        isLoading={loading}
        onPress={loginUser}
        label={localization.login.continue}
        type={ButtonType.solid}
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
});
