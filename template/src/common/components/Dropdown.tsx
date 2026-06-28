import React, {useMemo, useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from '../../core/theme/ThemeProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {RTLAwareText} from './RTLAwareText';
import {RTLAwareView} from './RTLAwareView';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  value?: string;
  placeholder?: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  error?: string | null;
}

function ChevronDown({color}: {color: string}): JSX.Element {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CheckIcon({color}: {color: string}): JSX.Element {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12.5L10 17.5L19 7"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Dropdown(props: DropdownProps): JSX.Element {
  const {label, value, placeholder, options, onSelect, error} = props;
  const {theme} = useTheme();
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => options.find(option => option.value === value),
    [options, value],
  );

  const valueColorStyle = {
    color: selected
      ? theme.colors.grayScale_700
      : theme.colors.grayScale_200,
  };

  const fieldStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.grayScale_0,
    borderColor: error ? theme.colors.error_400 : theme.colors.grayScale_50,
    borderWidth: CommonSizes.borderWidth.medium,
    borderRadius: CommonSizes.borderRadius.large,
    paddingHorizontal: CommonSizes.spacing.xLarge,
    paddingVertical: CommonSizes.spacing.xLarge,
  };

  return (
    <RTLAwareView style={styles.container}>
      {label ? (
        <RTLAwareText
          style={[theme.text.bodyMediumBold, {color: theme.colors.grayScale_700}]}>
          {label}
        </RTLAwareText>
      ) : null}

      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder ?? 'Dropdown'}>
        <RTLAwareView style={fieldStyle}>
          <RTLAwareText
            style={[
              theme.text.bodyLargeRegular,
              styles.flex1,
              valueColorStyle,
            ]}>
            {selected ? selected.label : placeholder ?? ''}
          </RTLAwareText>
          <ChevronDown color={theme.colors.grayScale_200} />
        </RTLAwareView>
      </Pressable>

      {error ? (
        <RTLAwareText
          style={[theme.text.bodySmallRegular, {color: theme.colors.error_400}]}>
          {error}
        </RTLAwareText>
      ) : null}

      <Modal transparent visible={open} animationType="fade">
        <Pressable
          style={styles.backdrop}
          onPress={() => setOpen(false)}
          accessibilityRole="button"
          accessibilityLabel="Close dropdown">
          <Pressable
            style={[
              styles.card,
              {backgroundColor: theme.colors.grayScale_0},
            ]}
            onPress={() => {}}>
            <ScrollView bounces={false}>
              {options.map(option => {
                const isSelected = option.value === value;
                const optionColorStyle = {
                  color: isSelected
                    ? theme.colors.PlatinateBlue_400
                    : theme.colors.grayScale_700,
                };
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => {
                      onSelect(option.value);
                      setOpen(false);
                    }}
                    accessibilityRole="button"
                    style={styles.optionRow}>
                    <RTLAwareView style={styles.optionInner}>
                      <RTLAwareText
                        style={[
                          theme.text.bodyLargeRegular,
                          styles.flex1,
                          optionColorStyle,
                        ]}>
                        {option.label}
                      </RTLAwareText>
                      {isSelected ? (
                        <CheckIcon color={theme.colors.PlatinateBlue_400} />
                      ) : null}
                    </RTLAwareView>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </RTLAwareView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    gap: CommonSizes.spacing.medium,
  } as ViewStyle,
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(6, 8, 15, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: CommonSizes.spacing.xxLarge,
  },
  card: {
    width: '100%',
    maxHeight: '60%',
    borderRadius: CommonSizes.borderRadius.large,
    overflow: 'hidden',
    paddingVertical: CommonSizes.spacing.small,
  },
  optionRow: {
    paddingHorizontal: CommonSizes.spacing.xLarge,
    paddingVertical: CommonSizes.spacing.xLarge,
  },
  optionInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
});
