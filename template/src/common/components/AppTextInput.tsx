import React, {useMemo, useState} from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import {useTranslation} from '../localization/LocalizationProvider';
import {useTheme} from '../../core/theme/ThemeProvider';
import {inputTextAlign} from '../../core/theme/commonConsts';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Icon} from './Icon';
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
  const t = useTranslation();
  const [isFocused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  const {colors} = theme;
  const borderColor = useMemo(() => {
    if (error) {
      return colors.danger;
    }
    if (isFocused) {
      return colors.borderAccent;
    }
    return colors.borderDefault;
  }, [error, isFocused, colors]);

  const rowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    backgroundColor: editable ? colors.surfaceCard : colors.surfaceInset,
    borderColor,
    borderWidth: CommonSizes.borderWidth.hairline,
    borderRadius: CommonSizes.borderRadius.sm,
    paddingHorizontal: CommonSizes.spacing.large,
    paddingVertical: multiline ? CommonSizes.spacing.large : 0,
    height: multiline ? undefined : CommonSizes.control.lg,
    minHeight: multiline ? 96 : undefined,
    opacity: editable ? 1 : 0.6,
    boxShadow: isFocused ? `0 0 0 3px ${colors.accentRing}` : theme.shadows.xs,
  };

  const inputDynamicStyle = {
    textAlignVertical: multiline ? ('top' as const) : ('center' as const),
    minHeight: multiline ? 72 : undefined,
    // Single-line TextInput + lineHeight mis-aligns text on iOS.
    lineHeight: multiline ? theme.text.body.lineHeight : undefined,
  };

  return (
    <RTLAwareView style={styles.container}>
      {label ? (
        <RTLAwareText style={theme.text.label}>{label}</RTLAwareText>
      ) : null}
      <RTLAwareView style={rowStyle}>
        <TextInput
          style={[styles.input, theme.text.body, inputDynamicStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={secureTextEntry ? hidden : false}
          multiline={multiline}
          keyboardType={keyboardType}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          selectionColor={colors.accent}
        />
        {secureTextEntry ? (
          <Pressable
            onPress={() => setHidden(prev => !prev)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={t(hidden ? 'showPassword' : 'hidePassword')}
            style={styles.eyeButton}>
            <Icon
              name={hidden ? 'eye' : 'eye-off'}
              color={colors.textTertiary}
            />
          </Pressable>
        ) : null}
      </RTLAwareView>
      {error ? (
        <RTLAwareText style={[theme.text.bodySm, {color: colors.dangerFg}]}>
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
    gap: CommonSizes.layout.field,
  } as ViewStyle,
  input: {
    flex: 1,
    padding: 0,
    textAlign: inputTextAlign,
  },
  eyeButton: {
    paddingStart: CommonSizes.spacing.medium,
    alignSelf: 'center',
  },
});
