import React, {
  FC,
  memo,
  MutableRefObject,
  Ref,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {PrimaryColors, AlertColors} from '../../core/theme/colors';
import {CommonSizes} from '../../core/theme/commonSizes';
import {CommonStyles} from '../../core/theme/commonStyles';
import {scaleHeight} from '../../core/theme/scaling';
import {regexValidation} from '../validations/regexValidator';

interface IProps extends TextInputProps {
  nextInputFocusRef?: MutableRefObject<any>;
  inputRef?: Ref<any>;
  containerStyle?: ViewStyle;
  label?: string;
  error?: string | null;
  hint?: string;
  width?: ViewStyle['width'];
  autoComplete?:
    | 'off'
    | 'username'
    | 'password'
    | 'email'
    | 'name'
    | 'tel'
    | 'street-address'
    | 'postal-code'
    | 'cc-number'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year';
  required?: boolean;
  optional?: boolean;
  inputContainerStyle?: ViewStyle;
  height?: ViewStyle['height'];
  regex?: RegExp;
  regexErrorMessage?: string;
}

export const PrimaryTextInput: FC<IProps> = memo(
  ({
    style,
    blurOnSubmit: _blurOnSubmit = true,
    disableFullscreenUI: _disableFullscreenUI = true,
    enablesReturnKeyAutomatically: _enablesReturnKeyAutomatically = true,
    underlineColorAndroid: _underlineColorAndroid,
    placeholderTextColor: _placeholderTextColor,
    editable = true,
    clearButtonMode: _clearButtonMode = 'while-editing',
    label: _label,
    keyboardType = 'numeric',
    error,
    hint,
    containerStyle: _containerStyle,
    inputRef,
    nextInputFocusRef: _nextInputFocusRef,
    onTouchStart,
    onFocus,
    onBlur,
    onSubmitEditing: _onSubmitEditing,
    required: _required,
    optional: _optional,
    width,
    height,
    regex,
    regexErrorMessage = 'Invalid format',
    ...props
  }) => {
    const [isFocused, setFocused] = useState<boolean>(false);
    const {theme} = useTheme();
    const [regexError, setRegexError] = useState<string | null>(null);

    const onLocalFocus = useCallback(
      (e: any) => {
        setFocused(true);
        onFocus && onFocus(e);
      },
      [onFocus, setFocused],
    );

    const onLocalBlur = useCallback(
      (e: any) => {
        setFocused(false);
        onBlur && onBlur(e);
      },
      [onBlur, setFocused],
    );

    const pointerEvents = useMemo(() => {
      return onTouchStart ? 'none' : undefined;
    }, [onTouchStart]);

    const handleChangeText = useCallback(
      (text: string) => {
        setRegexError(null);

        if (regex) {
          const validation = regexValidation(text, regex, regexErrorMessage);
          if (!validation.isValid) {
            setRegexError(validation.message);
          }
        }

        if (props.onChangeText) {
          props.onChangeText(text);
        }
      },
      // props.onChangeText is referenced directly; keep deps stable to avoid
      // re-creating the callback on every parent render.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [regex, regexErrorMessage, props.onChangeText],
    );

    const containerStyle: ViewStyle = {
      ...styles.outerContainer,
      width: width ?? '100%',
    };

    const inputWrapperStyle: ViewStyle = {
      ...styles.inputWrapper,
      borderColor: error
        ? theme.colors.red
        : isFocused
        ? theme.colors.indigoBlue
        : theme.colors.strokeDeactive,
      height: height ?? scaleHeight(84),
      backgroundColor: theme.colors.backgroundOpacity,
    };

    const textInputStyle: TextStyle = {
      ...theme.text.body1,
      paddingStart: CommonSizes.spacing.medium,
      ...Platform.select({
        android: {
          paddingEnd: CommonSizes.spacing.medium,
        },
      }),
    };

    return (
      <View style={containerStyle}>
        <View style={inputWrapperStyle}>
          <TextInput
            disableFullscreenUI={true}
            selectionColor={selectionColor}
            {...props}
            pointerEvents={pointerEvents}
            ref={inputRef}
            onFocus={onLocalFocus}
            onBlur={onLocalBlur}
            style={[styles.textInput, textInputStyle, style]}
            onChangeText={handleChangeText}
            placeholderTextColor={theme.colors.tintColor}
            autoCapitalize="none"
            autoComplete="off"
            keyboardType={keyboardType}
            editable={editable}
          />
        </View>
        <BottomText error={error || regexError} hint={hint} />
      </View>
    );
  },
);

const BottomText: FC<{error?: string | null; hint?: string}> = memo(
  ({error, hint}) => {
    const {theme} = useTheme();
    if (error != null) {
      return (
        <Text style={{...theme.text.body2, color: theme.colors.red}}>
          {error}
        </Text>
      );
    } else if (hint != null) {
      return <Text style={styles.hint}>{hint}</Text>;
    } else {
      return null;
    }
  },
);

const selectionColor = PrimaryColors.PlatinateBlue_400;

const commonInputContainer: TextStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: CommonSizes.spacing.xxxLarge,
  textAlignVertical: 'center',
  textAlign: 'center',
  width: '100%',
  borderRadius: CommonSizes.borderRadius.medium,
};

const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: 'space-between',
    gap: CommonSizes.spacing.small,
  } as ViewStyle,
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: CommonSizes.borderWidth.small,
    borderRadius: CommonSizes.borderRadius.medium,
    width: '100%',
  } as ViewStyle,
  textInput: {
    width: '100%',
    flex: 1,
    textAlignVertical: 'center',
  } as TextStyle,
  container: {
    flexDirection: 'column',
  } as ViewStyle,
  input: {
    flex: 1,
    textAlignVertical: 'center',
    paddingStart: CommonSizes.spacing.medium,
    ...Platform.select({
      android: {
        paddingEnd: CommonSizes.spacing.medium,
      },
    }),
  } as TextStyle,
  inputContainer: {
    ...commonInputContainer,
    ...Platform.select({
      ios: {
        paddingEnd: CommonSizes.spacing.medium,
      },
    }),
  } as TextStyle,
  errorInputContainer: {
    ...commonInputContainer,
    ...Platform.select({
      android: {
        borderColor: AlertColors.error_400,
      },
    }),
  } as TextStyle,
  disabledInputContainer: {
    ...commonInputContainer,
  } as TextStyle,
  focusedInputContainer: {
    ...commonInputContainer,
  } as TextStyle,
  label: {
    ...CommonStyles.body_regular,
  } as TextStyle,
  hint: {
    ...CommonStyles.normalText,
    fontWeight: '200',
    lineHeight: CommonSizes.lineHeight.small,
  } as TextStyle,
  error: {
    ...CommonStyles.normalText,
    lineHeight: CommonSizes.lineHeight.small,
  } as TextStyle,
});
