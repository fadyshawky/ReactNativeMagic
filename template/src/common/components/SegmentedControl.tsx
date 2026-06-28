import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
import {RTLAwareText} from './RTLAwareText';

interface SegmentedControlProps {
  segments: string[];
  index: number;
  onChange: (index: number) => void;
}

/**
 * A rounded, pill-shaped segmented control. The active segment fills with
 * primary blue + white label; inactive labels are muted. Segments share equal
 * width via flex.
 */
export function SegmentedControl({
  segments,
  index,
  onChange,
}: SegmentedControlProps): JSX.Element {
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.grayScale_0,
          borderColor: theme.colors.grayScale_50,
          borderWidth: CommonSizes.borderWidth.small,
        },
      ]}>
      {segments.map((segment, segmentIndex) => {
        const isActive = segmentIndex === index;
        const segLabel = {
          textAlign: 'center' as const,
          color: isActive ? '#FFFFFF' : theme.colors.grayScale_200,
        };
        return (
          <Pressable
            key={`segment-${segmentIndex}`}
            onPress={() => onChange(segmentIndex)}
            style={[
              styles.segment,
              isActive
                ? {backgroundColor: theme.colors.PlatinateBlue_400}
                : null,
            ]}>
            <RTLAwareText
              numberOfLines={1}
              style={[theme.text.bodyMediumBold, segLabel]}>
              {segment}
            </RTLAwareText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: CommonSizes.borderRadius.full,
    padding: 4,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: CommonSizes.spacing.medium,
    borderRadius: CommonSizes.borderRadius.full,
  },
});
