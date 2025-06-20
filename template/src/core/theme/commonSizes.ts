import {ISize} from './types';

export const CommonSizes = {
  font: {
    // Body Text Sizes
    bodySmall: 12, // Body Small
    bodyMedium: 14, // Body Medium
    bodyLarge: 16, // Body Large
    bodyXLarge: 18, // Body XLarge

    // Heading Sizes
    heading6: 18, // Heading 6 / Bold / 18px
    heading4: 24, // Heading 4 / Bold / 24px
    heading3: 32, // Heading 3 / Bold / 32px
    heading2: 48, // Heading 2 / Bold / 48px
    heading1: 64, // Heading 1 / Bold / 64px

    // Legacy support - keeping these for backward compatibility
    extraSmall: 12, // Maps to bodySmall
    extraSmallPlus: 14, // Maps to bodyMedium
    small: 14, // Maps to bodyMedium
    smallPlus: 16, // Maps to bodyLarge
    medium: 16, // Maps to bodyLarge
    mediumPlus: 18, // Maps to bodyXLarge
    extraMedium: 24, // Maps to heading4
    large: 32, // Maps to heading3
    largePlus: 48, // Maps to heading2
    extraLarge: 64, // Maps to heading1
    extraLargePlus: 64, // Maps to heading1
  } as Readonly<ISize['font']>,
  letterSpacing: {
    // Default letter spacing for Almarai
    bodySmall: 0,
    bodyMedium: 0,
    bodyLarge: 0,
    bodyXLarge: 0,
    heading6: 0,
    heading4: 0,
    heading3: 0,
    heading2: 0,
    heading1: 0,

    // Legacy support
    extraSmall: 0,
    extraSmallPlus: 0,
    small: 0,
    smallPlus: 0,
    medium: 0,
    mediumPlus: 0,
    large: 0,
    largePlus: 0,
    extraLarge: 0,
    extraLargePlus: 0,
  } as Readonly<ISize['letterSpacing']>,
  lineHeight: {
    // Line heights optimized for Almarai's large x-height
    bodySmall: 16, // ~1.33 line height
    bodyMedium: 20, // ~1.43 line height
    bodyLarge: 24, // ~1.5 line height
    bodyXLarge: 26, // ~1.44 line height
    heading6: 24, // ~1.33 line height
    heading4: 32, // ~1.33 line height
    heading3: 40, // ~1.25 line height
    heading2: 56, // ~1.17 line height
    heading1: 72, // ~1.125 line height

    // Legacy support
    extraSmall: 16,
    extraSmallPlus: 20,
    small: 20,
    smallPlus: 24,
    medium: 24,
    mediumPlus: 26,
    large: 40,
    largePlus: 56,
    extraLarge: 72,
    extraLargePlus: 72,
  } as Readonly<ISize['lineHeight']>,
  spacing: {
    none: 0, // space / 0
    xSmall: 2, // space / 2
    small: 4, // space / 4
    medium: 8, // space / 8
    large: 12, // space / 12
    xLarge: 16, // space / 16
    xxLarge: 24, // space / 24 (2X-Large)
    xxxLarge: 32, // space / 32 (3X-Large)
    xxxxLarge: 48, // space / 48 (4X-Large)
    xxxxxLarge: 64, // space / 64 (5X-Large)
    xxxxxxLarge: 80, // space / 80 (6X-Large)
    full: 100, // space / 100 (Full)

    // Legacy support - keeping these for backward compatibility
    xs: 4, // Maps to small
    sm: 8, // Maps to medium
    md: 16, // Maps to xLarge
    lg: 24, // Maps to xxLarge
    xl: 32, // Maps to xxxLarge
  } as Readonly<ISize['spacing']>,
  borderRadius: {
    none: 0, // Border / 0
    xSmall: 2, // Border / 2
    small: 4, // Border / 4
    medium: 8, // Border / 8
    large: 12, // Border / 12
    xLarge: 16, // Border / 16
    xxLarge: 24, // Border / 24 (2X-Large)
    full: 1000, // Border / 1000 (Full)

    // Legacy support - keeping these for backward compatibility
    xs: 4, // Maps to small
    sm: 8, // Maps to medium
    md: 12, // Maps to large
    lg: 16, // Maps to xLarge
    xl: 24, // Maps to xxLarge
  } as Readonly<ISize['borderRadius']>,
  borderWidth: {
    none: 0, // Stroke / 0
    xSmall: 0.5, // Stroke / 0.5
    small: 1, // Stroke / 1
    medium: 1.5, // Stroke / 1.5
    large: 2, // Stroke / 2

    // Legacy support - keeping these for backward compatibility
    extraSmall: 0.5, // Maps to xSmall
  } as Readonly<ISize['borderWidth']>,
};
