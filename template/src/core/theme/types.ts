import {TextStyle} from 'react-native';
import {ElevationShadow} from './shadows';
import {PrimaryColors, NaturalColors, AlertColors} from './colors';

export type ThemeMode = 'light' | 'dark';

export interface ISize {
  font: {
    // Almarai Design System Typography
    bodySmall: number;
    bodyMedium: number;
    bodyLarge: number;
    bodyXLarge: number;
    heading6: number;
    heading4: number;
    heading3: number;
    heading2: number;
    heading1: number;

    // Legacy support
    extraSmall: number;
    extraSmallPlus: number;
    small: number;
    smallPlus: number;
    medium: number;
    mediumPlus: number;
    extraMedium: number;
    large: number;
    largePlus: number;
    extraLarge: number;
    extraLargePlus: number;
  };
  letterSpacing: {
    // Almarai Design System
    bodySmall: number;
    bodyMedium: number;
    bodyLarge: number;
    bodyXLarge: number;
    heading6: number;
    heading4: number;
    heading3: number;
    heading2: number;
    heading1: number;

    // Legacy support
    extraSmall: number;
    extraSmallPlus: number;
    small: number;
    smallPlus: number;
    medium: number;
    mediumPlus: number;
    large: number;
    largePlus: number;
    extraLarge: number;
    extraLargePlus: number;
  };
  lineHeight: {
    // Almarai Design System
    bodySmall: number;
    bodyMedium: number;
    bodyLarge: number;
    bodyXLarge: number;
    heading6: number;
    heading4: number;
    heading3: number;
    heading2: number;
    heading1: number;

    // Legacy support
    extraSmall: number;
    extraSmallPlus: number;
    small: number;
    smallPlus: number;
    medium: number;
    mediumPlus: number;
    large: number;
    largePlus: number;
    extraLarge: number;
    extraLargePlus: number;
  };
  spacing: {
    // Design System Spacing Scale
    none: number; // space / 0
    xSmall: number; // space / 2
    small: number; // space / 4
    medium: number; // space / 8
    large: number; // space / 12
    xLarge: number; // space / 16
    xxLarge: number; // space / 24 (2X-Large)
    xxxLarge: number; // space / 32 (3X-Large)
    xxxxLarge: number; // space / 48 (4X-Large)
    xxxxxLarge: number; // space / 64 (5X-Large)
    xxxxxxLarge: number; // space / 80 (6X-Large)
    full: number; // space / 100 (Full)

    // Legacy support
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    // Design System Border Radius Scale
    none: number; // Border / 0
    xSmall: number; // Border / 2
    small: number; // Border / 4
    medium: number; // Border / 8
    large: number; // Border / 12
    xLarge: number; // Border / 16
    xxLarge: number; // Border / 24 (2X-Large)
    full: number; // Border / 1000 (Full)

    // Legacy support
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderWidth: {
    // Design System Stroke Scale
    none: number; // Stroke / 0
    xSmall: number; // Stroke / 0.5
    small: number; // Stroke / 1
    medium: number; // Stroke / 1.5
    large: number; // Stroke / 2

    // Legacy support
    extraSmall: number;
  };
}

export interface Theme {
  mode: ThemeMode;
  colors: typeof PrimaryColors & typeof NaturalColors & typeof AlertColors;
  text: {
    // Almarai Design System Typography
    // Headings
    header1: TextStyle;
    header2: TextStyle;
    header3: TextStyle;
    header4: TextStyle;
    header6: TextStyle;

    // Body Text with different weights
    bodyXLargeLight: TextStyle;
    bodyXLargeRegular: TextStyle;
    bodyXLargeBold: TextStyle;
    bodyXLargeExtraBold: TextStyle;

    bodyLargeLight: TextStyle;
    bodyLargeRegular: TextStyle;
    bodyLargeBold: TextStyle;
    bodyLargeExtraBold: TextStyle;

    bodyMediumLight: TextStyle;
    bodyMediumRegular: TextStyle;
    bodyMediumBold: TextStyle;
    bodyMediumExtraBold: TextStyle;

    bodySmallLight: TextStyle;
    bodySmallRegular: TextStyle;
    bodySmallBold: TextStyle;
    bodySmallExtraBold: TextStyle;

    // Legacy styles for backward compatibility
    balanceTitle: TextStyle;
    balanceAmount: TextStyle;
    balanceLabel: TextStyle;
    body1: TextStyle;
    body2: TextStyle;
    button: TextStyle;
    cards: TextStyle;
    SearchBar: TextStyle;
    label: TextStyle;
    hyperlink: TextStyle;
    navBar: TextStyle;
  };
  spacing: {
    // Design System Spacing Scale
    none: number;
    xSmall: number;
    small: number;
    medium: number;
    large: number;
    xLarge: number;
    xxLarge: number;
    xxxLarge: number;
    xxxxLarge: number;
    xxxxxLarge: number;
    xxxxxxLarge: number;
    full: number;

    // Legacy support
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    // Design System Border Radius Scale
    none: number;
    xSmall: number;
    small: number;
    medium: number;
    large: number;
    xLarge: number;
    xxLarge: number;
    full: number;

    // Legacy support
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderWidth: {
    // Design System Stroke Scale
    none: number;
    xSmall: number;
    small: number;
    medium: number;
    large: number;

    // Legacy support
    extraSmall: number;
  };
  shadows: {
    elevation1: ElevationShadow;
    elevation2: ElevationShadow;
    elevation3: ElevationShadow;
    elevation4: ElevationShadow;
  };
}
