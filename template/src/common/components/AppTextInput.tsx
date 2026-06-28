import React, {useMemo, useState} from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from '../../core/theme/ThemeProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {RTLAwareText} from './RTLAwareText';
import {RTLAwareView} from './RTLAwareView';

interface AppTextInputProps {
  label?: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  error?: string | null;
  secureTextEntry?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
}

function EyeIcon({open, color}: {open: boolean; color: string}): JSX.Element {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12C3.7 7.6 7.5 5 12 5C16.5 5 20.3 7.6 22 12C20.3 16.4 16.5 19 12 19C7.5 19 3.7 16.4 2 12Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!open ? (
        <Path
          d="M4 4L20 20"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      ) : null}
    </Svg>
  );
}

export function AppTextInput(props: AppTextInputProps): JSX.Element {
  const {
    label,
    value,
    onChangeText,
    placeholder,
    error,
    secureTextEntry,
    multiline,
    keyboardType,
    editable = true,
  } = props;
  const {theme} = useTheme();
  const [isFocused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  const borderColor = useMemo(() => {
    if (error) {
      return theme.colors.error_400;
    }
    if (isFocused) {
      return theme.colors.PlatinateBlue_400;
    }
    return theme.colors.grayScale_50;
  }, [error, isFocused, theme.colors]);

  const rowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    backgroundColor: theme.colors.grayScale_0,
    borderColor,
    borderWidth: CommonSizes.borderWidth.medium,
    borderRadius: CommonSizes.borderRadius.large,
    paddingHorizontal: CommonSizes.spacing.xLarge,
    paddingVertical: multiline
      ? CommonSizes.spacing.large
      : CommonSizes.spacing.medium,
    minHeight: multiline ? 96 : undefined,
    opacity: editable ? 1 : 0.6,
  };

  const inputDynamicStyle = {
    color: theme.colors.grayScale_700,
    textAlignVertical: multiline ? ('top' as const) : ('center' as const),
    minHeight: multiline ? 72 : undefined,
  };

  return (
    <RTLAwareView style={styles.container}>
      {label ? (
        <RTLAwareText
          style={[theme.text.bodyMediumBold, {color: theme.colors.grayScale_700}]}>
          {label}
        </RTLAwareText>
      ) : null}
      <RTLAwareView style={rowStyle}>
        <TextInput
          style={[styles.input, theme.text.bodyLargeRegular, inputDynamicStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.grayScale_200}
          secureTextEntry={secureTextEntry ? hidden : false}
          multiline={multiline}
          keyboardType={keyboardType}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          selectionColor={theme.colors.PlatinateBlue_400}
        />
        {secureTextEntry ? (
          <Pressable
            onPress={() => setHidden(prev => !prev)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
            style={styles.eyeButton}>
            <EyeIcon open={!hidden} color={theme.colors.grayScale_200} />
          </Pressable>
        ) : null}
      </RTLAwareView>
      {error ? (
        <RTLAwareText
          style={[theme.text.bodySmallRegular, {color: theme.colors.error_400}]}>
          {error}
        </RTLAwareText>
      ) : null}
    </RTLAwareView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    gap: CommonSizes.spacing.medium,
  } as ViewStyle,
  input: {
    flex: 1,
    padding: 0,
  },
  eyeButton: {
    paddingStart: CommonSizes.spacing.medium,
    alignSelf: 'center',
  },
});
