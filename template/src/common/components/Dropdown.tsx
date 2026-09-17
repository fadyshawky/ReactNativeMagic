import React, {useMemo, useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Fonts} from '../../core/theme/fonts';
import {Icon} from './Icon';
import {RTLAwareText} from './RTLAwareText';
import {RTLAwareView} from './RTLAwareView';
import {useTranslation} from '../localization/LocalizationProvider';

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

export function Dropdown(props: DropdownProps): JSX.Element {
  const {label, value, placeholder, options, onSelect, error} = props;
  const {theme} = useTheme();
  const t = useTranslation();
  const {colors} = theme;
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => options.find(option => option.value === value),
    [options, value],
  );

  const valueColorStyle = {
    color: selected ? colors.textPrimary : colors.textTertiary,
  };

  const fieldStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: CommonSizes.spacing.medium,
    height: CommonSizes.control.lg,
    backgroundColor: colors.surfaceCard,
    borderColor: error
      ? colors.danger
      : open
        ? colors.borderAccent
        : colors.borderDefault,
    borderWidth: CommonSizes.borderWidth.hairline,
    borderRadius: CommonSizes.borderRadius.sm,
    paddingHorizontal: CommonSizes.spacing.large,
    boxShadow: open ? `0 0 0 3px ${colors.accentRing}` : theme.shadows.xs,
  };

  return (
    <RTLAwareView style={styles.container}>
      {label ? (
        <RTLAwareText style={theme.text.label}>{label}</RTLAwareText>
      ) : null}

      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder ?? 'Dropdown'}>
        <RTLAwareView style={fieldStyle}>
          <RTLAwareText
            numberOfLines={1}
            style={[theme.text.body, styles.flex1, valueColorStyle]}>
            {selected ? selected.label : (placeholder ?? '')}
          </RTLAwareText>
          <Icon
            name="chevron-down"
            size={CommonSizes.icon.sm}
            color={colors.textTertiary}
          />
        </RTLAwareView>
      </Pressable>

      {error ? (
        <RTLAwareText style={[theme.text.bodySm, {color: colors.dangerFg}]}>
          {error}
        </RTLAwareText>
      ) : null}

      <Modal transparent visible={open} animationType="fade">
        <Pressable
          style={[styles.backdrop, {backgroundColor: colors.surfaceScrim}]}
          onPress={() => setOpen(false)}
          accessibilityRole="button"
          accessibilityLabel={t('close')}>
          <Pressable
            style={[
              styles.card,
              {
                backgroundColor: colors.surfaceOverlay,
                borderColor: colors.borderDefault,
                boxShadow: theme.shadows.md,
              },
            ]}
            onPress={() => {}}>
            <ScrollView bounces={false}>
              {options.map(option => {
                const isSelected = option.value === value;
                const optionColorStyle = {
                  color: isSelected ? colors.textAccent : colors.textPrimary,
                  fontFamily: isSelected ? Fonts.medium : Fonts.regular,
                };
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => {
                      onSelect(option.value);
                      setOpen(false);
                    }}
                    accessibilityRole="button"
                    accessibilityState={{selected: isSelected}}
                    style={({pressed}) => [
                      styles.optionRow,
                      isSelected
                        ? {backgroundColor: colors.selectedVeil}
                        : pressed
                          ? {backgroundColor: colors.pressVeil}
                          : null,
                    ]}>
                    <RTLAwareView style={styles.optionInner}>
                      <RTLAwareText
                        style={[
                          theme.text.body,
                          styles.flex1,
                          optionColorStyle,
                        ]}>
                        {option.label}
                      </RTLAwareText>
                      {isSelected ? (
                        <Icon
                          name="check"
                          size={CommonSizes.icon.sm}
                          color={colors.textAccent}
                        />
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
    gap: CommonSizes.layout.field,
  } as ViewStyle,
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: CommonSizes.spacing.xxLarge,
  },
  card: {
    width: '100%',
    maxHeight: '60%',
    borderRadius: CommonSizes.borderRadius.lg,
    borderWidth: CommonSizes.borderWidth.hairline,
    overflow: 'hidden',
    padding: CommonSizes.spacing.small,
  },
  optionRow: {
    minHeight: CommonSizes.control.lg,
    justifyContent: 'center',
    paddingHorizontal: CommonSizes.spacing.large,
    borderRadius: CommonSizes.borderRadius.md,
  },
  optionInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
});
