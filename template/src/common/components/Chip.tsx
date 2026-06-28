import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
import {RTLAwareText} from './RTLAwareText';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

/**
 * A pill-shaped, tappable chip. Selected → solid primary blue with white
 * label; unselected → white surface with a subtle border and default label.
 */
export function Chip({label, selected, onPress}: ChipProps): JSX.Element {
  const {theme} = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        selected
          ? {backgroundColor: theme.colors.PlatinateBlue_400}
          : {
              backgroundColor: theme.colors.grayScale_0,
              borderColor: theme.colors.grayScale_50,
              borderWidth: CommonSizes.borderWidth.small,
            },
      ]}>
      <RTLAwareText
        style={
          selected
            ? [theme.text.bodyMediumBold, styles.labelSelected]
            : theme.text.bodyMediumBold
        }>
        {label}
      </RTLAwareText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    borderRadius: CommonSizes.borderRadius.full,
    paddingHorizontal: CommonSizes.spacing.large,
    paddingVertical: CommonSizes.spacing.small,
  },
  labelSelected: {
    color: '#FFFFFF',
  },
});
