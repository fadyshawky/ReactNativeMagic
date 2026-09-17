import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Fonts} from '../../core/theme/fonts';
import {useTheme} from '../../core/theme/ThemeProvider';
import {RTLAwareText} from './RTLAwareText';

interface SegmentedControlProps {
  segments: string[];
  index: number;
  onChange: (index: number) => void;
}

/**
 * Design-system segmented Tabs: an inset track with a hairline border; the
 * active segment lifts onto a card surface with an xs shadow. Selection is
 * colour and surface, not weight. Segments share equal width.
 */
export function SegmentedControl({
  segments,
  index,
  onChange,
}: SegmentedControlProps): JSX.Element {
  const {theme} = useTheme();
  const {colors} = theme;

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.track,
        {
          backgroundColor: colors.surfaceInset,
          borderColor: colors.borderDefault,
        },
      ]}>
      {segments.map((segment, segmentIndex) => {
        const isActive = segmentIndex === index;
        return (
          <Pressable
            key={`segment-${segmentIndex}`}
            onPress={() => onChange(segmentIndex)}
            accessibilityRole="tab"
            accessibilityState={{selected: isActive}}
            style={({pressed}) => [
              styles.segment,
              isActive
                ? {
                    backgroundColor: colors.surfaceCard,
                    boxShadow: theme.shadows.xs,
                  }
                : pressed
                  ? {backgroundColor: colors.hoverVeil}
                  : null,
            ]}>
            <RTLAwareText
              numberOfLines={1}
              style={[
                styles.label,
                {color: isActive ? colors.textPrimary : colors.textTertiary},
              ]}>
              {segment}
            </RTLAwareText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    padding: 3,
    borderRadius: CommonSizes.borderRadius.md,
    borderWidth: CommonSizes.borderWidth.hairline,
  },
  segment: {
    flex: 1,
    height: CommonSizes.control.lg - 8, // 48px track: mobile hit targets stay ≥ 44px
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: CommonSizes.spacing.large,
    borderRadius: CommonSizes.borderRadius.sm,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    letterSpacing: 14 * -0.006,
    textAlign: 'center',
  },
});
