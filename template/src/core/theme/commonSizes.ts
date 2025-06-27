import {ISize} from '../../../types';
import {scale, scaleFontSize, scaleSpacing, scaleBorderRadius} from './scaling';

// Font sizes following design system
export const FontSizes = {
  // Header sizes
  header1: scaleFontSize(48),
  header2: scaleFontSize(48),

  // Body sizes
  body1: scaleFontSize(32),
  body2: scaleFontSize(30),

  // Component specific sizes
  button: scaleFontSize(36),
  card: scaleFontSize(34),
  searchBar: scaleFontSize(24),
  balanceLabel: scaleFontSize(16),
  label: scaleFontSize(20),
  hyperlink: scaleFontSize(24),
  // Additional utility sizes
  small: scaleFontSize(24),
  medium: scaleFontSize(30),
  large: scaleFontSize(36),
  extraLarge: scaleFontSize(48),
  navBar: scaleFontSize(22),
} as const;

// Letter spacing for typography
export const LetterSpacing = {
  none: 0,
  tiny: scale(-0.5),
  small: scale(-0.25),
  medium: scale(0),
  extraMedium: scale(0.25),
  large: scale(0.5),
  extraLarge: scale(1),
  huge: scale(2),
} as const;

// Line heights for consistent vertical rhythm
export const LineHeight = {
  none: 0,
  tiny: scale(14),
  small: scale(16),
  medium: scale(18),
  extraMedium: scale(20),
  large: scale(22),
  extraLarge: scale(24),
  huge: scale(28),
} as const;

// Spacing system that aligns with theme spacing
export const Spacing = {
  none: 0,
  tiny: scaleSpacing(2),
  small: scaleSpacing(4),
  medium: scaleSpacing(8),
  extraMedium: scaleSpacing(12),
  large: scaleSpacing(16),
  largePlus: scaleSpacing(16),
  extraLarge: scaleSpacing(24),
  extraLargePlus: scaleSpacing(30),
  huge: scaleSpacing(35),
  xl: scaleSpacing(40),
  xxl: scaleSpacing(50),
} as const;

// Border radius system that aligns with theme borderRadius
export const BorderRadius = {
  none: 0,
  tiny: scaleBorderRadius(2),
  small: scaleBorderRadius(4),
  medium: scaleBorderRadius(8),
  extraMedium: scaleBorderRadius(12),
  large: scaleBorderRadius(16),
  extraLarge: scaleBorderRadius(24),
  huge: scaleBorderRadius(32),
  circular: 999,
} as const;

// Border widths
export const BorderWidth = {
  none: 0,
  tiny: scale(0.5),
  small: scale(1),
  medium: scale(2),
  extraMedium: scale(3),
  large: scale(4),
  extraLarge: scale(6),
  huge: scale(8),
} as const;

// Legacy export for backward compatibility
export const CommonSizes = {
  letterSpacing: LetterSpacing,
  lineHeight: LineHeight,
  spacing: Spacing,
  borderRadius: BorderRadius,
  borderWidth: BorderWidth,
  fontSize: FontSizes,
} as const;
