import {GradientBorderView} from '@good-react-native/gradient-border';
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
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {NewColors} from '../../core/theme/colors';
import {isIos} from '../../core/theme/commonConsts';
import {CommonSizes} from '../../core/theme/commonSizes';
import {CommonStyles} from '../../core/theme/commonStyles';
import {scaleHeight} from '../../core/theme/scaling';
import {localization} from '../localization/localization';
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
    blurOnSubmit = true,
    disableFullscreenUI = true,
    enablesReturnKeyAutomatically = true,
    underlineColorAndroid,
    placeholderTextColor,
    editable = true,
    clearButtonMode = 'while-editing',
    label,
    keyboardType = 'numeric',
    error,
    hint,
    containerStyle,
    inputRef,
    nextInputFocusRef,
    onTouchStart,
    onFocus,
    onBlur,
    onSubmitEditing,
    required,
    optional,
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
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        onFocus && onFocus(e);
      },
      [onFocus, setFocused],
    );

    const onLocalBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        onBlur && onBlur(e);
      },
      [onBlur, setFocused],
    );

    const inputContainerStyle = useMemo(() => {
      return getInputContainerStyle(
        isFocused,
        error,
        onTouchStart ? true : editable,
      );
    }, [isFocused, error, editable, onTouchStart]);

    const onLocalSubmitEditing = useCallback(
      (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        onSubmitEditing && onSubmitEditing(e);
        nextInputFocusRef &&
          nextInputFocusRef.current &&
          nextInputFocusRef.current.focus();
      },
      [nextInputFocusRef, onSubmitEditing],
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
      [regex, regexErrorMessage, props.onChangeText],
    );

    return (
      <View
        style={{
          justifyContent: 'space-between',
          gap: CommonSizes.spacing.small,
          width: width ?? '100%',
        }}>
        <GradientBorderView
          gradientProps={{
            colors: [theme.colors.mutedLavender, theme.colors.indigoBlue],
          }}
          style={{
            borderWidth: CommonSizes.borderWidth.small,
            borderRadius: CommonSizes.borderRadius.medium,
            height: height ?? scaleHeight(84),
            width: '100%',
            backgroundColor: theme.colors.backgroundOpacity,
          }}>
          <TextInput
            disableFullscreenUI={true}
            selectionColor={selectionColor}
            {...props}
            pointerEvents={pointerEvents}
            ref={inputRef}
            style={[
              {
                ...theme.text.body1,
                width: '100%',
                zIndex: 2,
                alignSelf: 'flex-start',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                textAlignVertical: 'center',
                paddingStart: CommonSizes.spacing.medium,
                ...Platform.select({
                  android: {
                    paddingEnd: CommonSizes.spacing.medium,
                  },
                }),
              },
              style,
            ]}
            onChangeText={handleChangeText}
            placeholderTextColor={theme.colors.tintColor}
            autoCapitalize="none"
            autoComplete="off"
            keyboardType={keyboardType}
            editable={editable}
          />
        </GradientBorderView>
        <BottomText error={error || regexError} hint={hint} />
      </View>
    );
  },
);

const Label: FC<{text?: string; required?: boolean; optional?: boolean}> = memo(
  ({text, required, optional}) => {
    const {theme} = useTheme();
    if (text != null) {
      return (
        <Text
          style={{
            ...theme.text.label,
            color: theme.colors.indigoBlue,
          }}
          numberOfLines={1}>
          {text +
            (required
              ? localization.common.required
              : optional
              ? localization.common.optional
              : '')}
        </Text>
      );
    } else {
      return null;
    }
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

function getInputContainerStyle(
  isFocused: boolean,
  error?: string | null,
  isEditable?: boolean,
): ViewStyle {
  if (isIos) {
    return !isEditable ? styles.disabledInputContainer : styles.inputContainer;
  } else {
    if (isFocused) {
      return styles.focusedInputContainer;
    } else if (!isEditable) {
      return styles.disabledInputContainer;
    } else if (error) {
      return styles.errorInputContainer;
    } else {
      return styles.inputContainer;
    }
  }
}

const selectionColor = NewColors.blueNormalActive;

const commonInputContainer: TextStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: CommonSizes.spacing.extraLarge,
  textAlignVertical: 'center',
  textAlign: 'center',
  width: '100%',
  borderRadius: CommonSizes.borderRadius.medium,
};

const styles = StyleSheet.create({
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
        borderColor: NewColors.red,
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
