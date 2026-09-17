import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Fonts} from '../../core/theme/fonts';
import {useTheme} from '../../core/theme/ThemeProvider';
import {RTLAwareText} from './RTLAwareText';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

/**
 * Design-system Tag: a 28px, 6px-radius filter chip with a hairline border.
 * Selected → accent-subtle fill + accent border + accent label. Never a pill.
 */
export function Chip({label, selected, onPress}: ChipProps): JSX.Element {
  const {theme} = useTheme();
  const {colors} = theme;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      hitSlop={8}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={{selected: !!selected}}
      style={({pressed}) => [
        styles.chip,
        {
          backgroundColor: selected
            ? colors.accentSubtle
            : pressed
              ? colors.bgSubtle
              : colors.surfaceCard,
          borderColor: selected ? colors.accentBorder : colors.borderDefault,
        },
      ]}>
      <RTLAwareText
        style={[
          styles.label,
          {color: selected ? colors.textAccent : colors.textSecondary},
        ]}>
        {label}
      </RTLAwareText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    height: 28,
    paddingHorizontal: 10,
    borderRadius: CommonSizes.borderRadius.sm,
    borderWidth: CommonSizes.borderWidth.hairline,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    letterSpacing: 13 * -0.006,
  },
});
