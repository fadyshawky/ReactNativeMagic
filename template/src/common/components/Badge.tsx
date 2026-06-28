import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
import {RTLAwareText} from './RTLAwareText';

type BadgeVariant = 'primary' | 'success' | 'error' | 'neutral';

interface BadgeProps {
  label?: string;
  count?: number;
  variant?: BadgeVariant;
}

/**
 * A small pill for counts or short labels. Colored variants (primary / success
 * / error) use white text; the neutral variant uses a subtle surface with the
 * default text color. A `count` wins over `label` and is capped at "99+".
 */
export function Badge({
  label,
  count,
  variant = 'primary',
}: BadgeProps): JSX.Element {
  const {theme} = useTheme();

  const backgroundColor =
    variant === 'success'
      ? theme.colors.success_400
      : variant === 'error'
      ? theme.colors.error_400
      : variant === 'neutral'
      ? theme.colors.grayScale_50
      : theme.colors.PlatinateBlue_400;

  const isNeutral = variant === 'neutral';

  const content =
    count != null ? (count > 99 ? '99+' : String(count)) : label;

  return (
    <View style={[styles.badge, {backgroundColor}]}>
      <RTLAwareText
        style={
          isNeutral
            ? theme.text.bodySmallBold
            : [theme.text.bodySmallBold, styles.labelOnColor]
        }>
        {content}
      </RTLAwareText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CommonSizes.borderRadius.full,
    paddingHorizontal: CommonSizes.spacing.small,
  },
  labelOnColor: {
    color: '#FFFFFF',
  },
});
