import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ColorTokens} from '../../core/theme/colors';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Fonts} from '../../core/theme/fonts';
import {useTheme} from '../../core/theme/ThemeProvider';
import {RTLAwareText} from './RTLAwareText';

export type BadgeVariant =
  'neutral' | 'accent' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  label?: string;
  count?: number;
  variant?: BadgeVariant;
  /** Leading status dot in the label colour. */
  dot?: boolean;
}

function tone(c: ColorTokens, variant: BadgeVariant) {
  switch (variant) {
    case 'accent':
      return {bg: c.accentSubtle, fg: c.textAccent, bd: c.accentBorder};
    case 'success':
      return {bg: c.successSubtle, fg: c.successFg, bd: 'transparent'};
    case 'warning':
      return {bg: c.warningSubtle, fg: c.warningFg, bd: 'transparent'};
    case 'danger':
      return {bg: c.dangerSubtle, fg: c.dangerFg, bd: 'transparent'};
    case 'neutral':
    default:
      return {bg: c.surfaceInset, fg: c.textSecondary, bd: c.borderDefault};
  }
}

/**
 * Design-system Badge: a 22px status label on a tinted fill, 4px radius.
 * Semantic tones are for state only. A `count` wins over `label`, is set in
 * Geist Mono and capped at "99+".
 */
export function Badge({
  label,
  count,
  variant = 'neutral',
  dot,
}: BadgeProps): JSX.Element {
  const {theme} = useTheme();
  const t = tone(theme.colors, variant);
  const isCount = count != null;
  const content = isCount ? (count > 99 ? '99+' : String(count)) : label;

  return (
    <View style={[styles.badge, {backgroundColor: t.bg, borderColor: t.bd}]}>
      {dot ? <View style={[styles.dot, {backgroundColor: t.fg}]} /> : null}
      <RTLAwareText
        style={[isCount ? styles.mono : styles.sans, {color: t.fg}]}>
        {content}
      </RTLAwareText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 22,
    paddingHorizontal: CommonSizes.spacing.medium,
    borderRadius: CommonSizes.borderRadius.xs,
    borderWidth: CommonSizes.borderWidth.hairline,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: CommonSizes.borderRadius.full,
  },
  sans: {fontFamily: Fonts.medium, fontSize: 12, letterSpacing: 12 * -0.004},
  mono: {
    fontFamily: Fonts.monoMedium,
    fontSize: 11,
    letterSpacing: 11 * 0.02,
    fontVariant: ['tabular-nums'],
  },
});
