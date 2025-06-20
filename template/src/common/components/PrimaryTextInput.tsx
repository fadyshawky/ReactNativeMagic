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
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {isIos} from '../../core/theme/commonConsts';
import {CommonStyles} from '../../core/theme/commonStyles';
import {localization} from '../localization/localization';

interface IProps extends TextInputProps {
  nextInputFocusRef?: MutableRefObject<any>;
  inputRef?: Ref<any>;
  containerStyle?: ViewStyle;
  label?: string;
  error?: string | null;
  hint?: string;
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
}

const PrimaryTextInput: FC<IProps> = memo(
  ({
    style,
    containerStyle,
    label,
    error,
    hint,
    required,
    optional,
    onFocus,
    onBlur,
    onSubmitEditing,
    nextInputFocusRef,
    inputRef,
    onTouchStart,
    editable = true,
    ...props
  }) => {
    const [isFocused, setFocused] = useState<boolean>(false);
    const {theme} = useTheme();

    const selectionColor = theme.colors.PlatinateBlue_700;

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
        theme,
      );
    }, [isFocused, error, editable, onTouchStart, theme]);

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

    const styles = useMemo(() => {
      const commonInputContainer: TextStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: theme.spacing.xxxLarge, // 32px
        textAlignVertical: 'center',
        textAlign: 'center',
        backgroundColor: theme.colors.grayScale_0,
        borderRadius: theme.borderRadius.large, // 12px
        borderWidth: theme.borderWidth.small, // 1px
        borderColor: theme.colors.grayScale_50,
      };

      return StyleSheet.create({
        container: {
          flexDirection: 'column',
        } as ViewStyle,
        input: {
          ...CommonStyles.normalText,
          flex: 1,
          textAlignVertical: 'center',
          paddingStart: theme.spacing.xLarge, // 16px
          ...Platform.select({
            android: {
              paddingEnd: theme.spacing.xLarge, // 16px
            },
          }),
        } as TextStyle,
        inputContainer: {
          ...commonInputContainer,
          ...Platform.select({
            ios: {
              paddingEnd: theme.spacing.xLarge, // 16px
            },
          }),
        } as TextStyle,
        errorInputContainer: {
          ...commonInputContainer,
          ...Platform.select({
            android: {
              borderColor: theme.colors.error_400,
            },
          }),
        } as TextStyle,
        disabledInputContainer: {
          ...commonInputContainer,
          ...Platform.select({
            android: {
              backgroundColor: theme.colors.grayScale_50,
              borderColor: theme.colors.grayScale_50,
            },
          }),
        } as TextStyle,
        focusedInputContainer: {
          ...commonInputContainer,
          ...Platform.select({
            android: {
              borderColor: theme.colors.grayScale_50,
            },
          }),
        } as TextStyle,
        label: {
          ...CommonStyles.body_regular,
          paddingBottom: theme.spacing.small, // 4px
        } as TextStyle,
        hint: {
          ...CommonStyles.normalText,
          fontWeight: '200',
          fontSize: theme.text.bodySmallRegular.fontSize, // 12px
          lineHeight: theme.text.bodySmallRegular.lineHeight, // 16px
          paddingTop: theme.spacing.small, // 4px
        } as TextStyle,
        error: {
          ...CommonStyles.normalText,
          color: theme.colors.error_400,
          fontSize: theme.text.bodySmallRegular.fontSize, // 12px
          lineHeight: theme.text.bodySmallRegular.lineHeight, // 16px
          paddingTop: theme.spacing.small, // 4px
        } as TextStyle,
      });
    }, [theme]);

    return (
      <View style={[styles.container, containerStyle]}>
        <Label
          text={label}
          required={required}
          optional={optional}
          styles={styles}
        />
        <TouchableOpacity
          style={[inputContainerStyle, props.inputContainerStyle]}
          onPress={onTouchStart}
          disabled={!onTouchStart}>
          <TextInput
            disableFullscreenUI={true}
            selectionColor={selectionColor}
            {...props}
            pointerEvents={pointerEvents}
            ref={inputRef}
            style={[styles.input, style]}
            autoCapitalize="none"
            autoComplete="off"
          />
        </TouchableOpacity>
        <BottomText error={error} hint={hint} styles={styles} />
      </View>
    );
  },
);

const Label: FC<{
  text?: string;
  required?: boolean;
  optional?: boolean;
  styles: any;
}> = memo(({text, required, optional, styles}) => {
  if (text != null) {
    return (
      <Text style={styles.label} numberOfLines={1}>
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
});

const BottomText: FC<{error?: string | null; hint?: string; styles: any}> =
  memo(({error, hint, styles}) => {
    if (error != null) {
      return <Text style={styles.error}>{error}</Text>;
    } else if (hint != null) {
      return <Text style={styles.hint}>{hint}</Text>;
    } else {
      return null;
    }
  });

function getInputContainerStyle(
  isFocused: boolean,
  error?: string | null,
  isEditable?: boolean,
  theme?: any,
): ViewStyle {
  const commonInputContainer: TextStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: theme.spacing.xxxLarge, // 32px
    textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: theme.colors.grayScale_0,
    borderRadius: theme.borderRadius.large, // 12px
    borderWidth: theme.borderWidth.small, // 1px
    borderColor: theme.colors.grayScale_50,
  };

  if (isIos) {
    return !isEditable
      ? {
          ...commonInputContainer,
          ...Platform.select({
            android: {
              backgroundColor: theme.colors.grayScale_50,
              borderColor: theme.colors.grayScale_50,
            },
          }),
        }
      : {
          ...commonInputContainer,
          ...Platform.select({
            ios: {
              paddingEnd: theme.spacing.xLarge, // 16px
            },
          }),
        };
  } else {
    if (isFocused) {
      return {
        ...commonInputContainer,
        ...Platform.select({
          android: {
            borderColor: theme.colors.grayScale_50,
          },
        }),
      };
    } else if (!isEditable) {
      return {
        ...commonInputContainer,
        ...Platform.select({
          android: {
            backgroundColor: theme.colors.grayScale_50,
            borderColor: theme.colors.grayScale_50,
          },
        }),
      };
    } else if (error) {
      return {
        ...commonInputContainer,
        ...Platform.select({
          android: {
            borderColor: theme.colors.error_400,
          },
        }),
      };
    } else {
      return {
        ...commonInputContainer,
        ...Platform.select({
          ios: {
            paddingEnd: theme.spacing.xLarge, // 16px
          },
        }),
      };
    }
  }
}

export {PrimaryTextInput};
