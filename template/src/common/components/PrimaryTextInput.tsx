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
import {Colors} from '../../core/theme/colors';
import {isIos} from '../../core/theme/commonConsts';
import {CommonSizes} from '../../core/theme/commonSizes';
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

export const PrimaryTextInput: FC<IProps> = memo(
  ({
    style = styles.input,
    blurOnSubmit = true,
    disableFullscreenUI = true,
    enablesReturnKeyAutomatically = true,
    underlineColorAndroid = Colors.transparent,
    placeholderTextColor = Colors.gray,
    editable = true,
    clearButtonMode = 'while-editing',
    label,
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
    ...props
  }) => {
    const [isFocused, setFocused] = useState<boolean>(false);

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

    return (
      <View style={[styles.container, containerStyle]}>
        <Label text={label} required={required} optional={optional} />
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
        <BottomText error={error} hint={hint} />
      </View>
    );
  },
);

const Label: FC<{text?: string; required?: boolean; optional?: boolean}> = memo(
  ({text, required, optional}) => {
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
  },
);

const BottomText: FC<{error?: string | null; hint?: string}> = memo(
  ({error, hint}) => {
    if (error != null) {
      return <Text style={styles.error}>{error}</Text>;
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

const selectionColor = Colors.primary100;

const commonInputContainer: TextStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: CommonSizes.spacing.extraLarge,
  textAlignVertical: 'center',
  textAlign: 'center',
  backgroundColor: Colors.white,
  borderRadius: CommonSizes.borderRadius.medium,
  borderWidth: CommonSizes.borderWidth.small,
  borderColor: Colors.gray,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  } as ViewStyle,
  input: {
    ...CommonStyles.normalText,
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
        borderColor: Colors.red,
      },
    }),
  } as TextStyle,
  disabledInputContainer: {
    ...commonInputContainer,
    ...Platform.select({
      android: {
        backgroundColor: Colors.gray,
        borderColor: Colors.gray,
      },
    }),
  } as TextStyle,
  focusedInputContainer: {
    ...commonInputContainer,
    ...Platform.select({
      android: {
        borderColor: Colors.darkGray,
      },
    }),
  } as TextStyle,
  label: {
    ...CommonStyles.body_regular,
    paddingBottom: CommonSizes.spacing.extraSmall,
  } as TextStyle,
  hint: {
    ...CommonStyles.normalText,
    fontWeight: '200',
    fontSize: CommonSizes.font.small,
    lineHeight: CommonSizes.lineHeight.small,
    paddingTop: CommonSizes.spacing.extraSmall,
  } as TextStyle,
  error: {
    ...CommonStyles.normalText,
    color: Colors.red,
    fontSize: CommonSizes.font.small,
    lineHeight: CommonSizes.lineHeight.small,
    paddingTop: CommonSizes.spacing.extraSmall,
  } as TextStyle,
});
