import {TextStyle} from 'react-native';
import {PrimaryColors, NaturalColors, AlertColors} from './colors';
import {CommonSizes} from './commonSizes';
import {Fonts} from './fonts';
import {Theme} from './types';
import {Shadows} from './shadows';

const commonTextStyles = {
  // Heading styles using Almarai Bold
  header1: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.heading1,
    lineHeight: CommonSizes.lineHeight.heading1,
  },
  header2: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.heading2,
    lineHeight: CommonSizes.lineHeight.heading2,
  },
  header3: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.heading3,
    lineHeight: CommonSizes.lineHeight.heading3,
  },
  header4: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.heading4,
    lineHeight: CommonSizes.lineHeight.heading4,
  },
  header6: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.heading6,
    lineHeight: CommonSizes.lineHeight.heading6,
  },

  // Body text styles with different weights
  bodyXLargeLight: {
    fontFamily: Fonts.light,
    fontSize: CommonSizes.font.bodyXLarge,
    lineHeight: CommonSizes.lineHeight.bodyXLarge,
  },
  bodyXLargeRegular: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.bodyXLarge,
    lineHeight: CommonSizes.lineHeight.bodyXLarge,
  },
  bodyXLargeBold: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.bodyXLarge,
    lineHeight: CommonSizes.lineHeight.bodyXLarge,
  },
  bodyXLargeExtraBold: {
    fontFamily: Fonts.extraBold,
    fontSize: CommonSizes.font.bodyXLarge,
    lineHeight: CommonSizes.lineHeight.bodyXLarge,
  },

  bodyLargeLight: {
    fontFamily: Fonts.light,
    fontSize: CommonSizes.font.bodyLarge,
    lineHeight: CommonSizes.lineHeight.bodyLarge,
  },
  bodyLargeRegular: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.bodyLarge,
    lineHeight: CommonSizes.lineHeight.bodyLarge,
  },
  bodyLargeBold: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.bodyLarge,
    lineHeight: CommonSizes.lineHeight.bodyLarge,
  },
  bodyLargeExtraBold: {
    fontFamily: Fonts.extraBold,
    fontSize: CommonSizes.font.bodyLarge,
    lineHeight: CommonSizes.lineHeight.bodyLarge,
  },

  bodyMediumLight: {
    fontFamily: Fonts.light,
    fontSize: CommonSizes.font.bodyMedium,
    lineHeight: CommonSizes.lineHeight.bodyMedium,
  },
  bodyMediumRegular: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.bodyMedium,
    lineHeight: CommonSizes.lineHeight.bodyMedium,
  },
  bodyMediumBold: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.bodyMedium,
    lineHeight: CommonSizes.lineHeight.bodyMedium,
  },
  bodyMediumExtraBold: {
    fontFamily: Fonts.extraBold,
    fontSize: CommonSizes.font.bodyMedium,
    lineHeight: CommonSizes.lineHeight.bodyMedium,
  },

  bodySmallLight: {
    fontFamily: Fonts.light,
    fontSize: CommonSizes.font.bodySmall,
    lineHeight: CommonSizes.lineHeight.bodySmall,
  },
  bodySmallRegular: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.bodySmall,
    lineHeight: CommonSizes.lineHeight.bodySmall,
  },
  bodySmallBold: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.bodySmall,
    lineHeight: CommonSizes.lineHeight.bodySmall,
  },
  bodySmallExtraBold: {
    fontFamily: Fonts.extraBold,
    fontSize: CommonSizes.font.bodySmall,
    lineHeight: CommonSizes.lineHeight.bodySmall,
  },

  // Legacy styles for backward compatibility
  balanceTitle: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.bodyXLarge,
    textAlign: 'center',
  },
  balanceAmount: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.heading2,
    textAlign: 'center',
  },
  balanceLabel: {
    fontFamily: Fonts.light,
    fontSize: CommonSizes.font.bodyXLarge,
  },
  body1: {
    fontFamily: Fonts.light,
    fontSize: CommonSizes.font.bodyLarge,
  },
  body2: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.bodyXLarge,
  },
  button: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.bodyXLarge,
  },
  cards: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.bodyXLarge,
  },
  SearchBar: {
    fontFamily: Fonts.light,
    fontSize: CommonSizes.font.bodyXLarge,
  },
  label: {
    fontFamily: Fonts.light,
    fontSize: CommonSizes.font.bodyXLarge,
  },
  hyperlink: {
    fontFamily: Fonts.light,
    fontSize: CommonSizes.font.bodyXLarge,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: PrimaryColors.PlatinateBlue_400,
  } as TextStyle,
  navBar: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.bodyXLarge,
  },
};

// Light theme colors
const lightThemeColors = {
  indigoBlue: PrimaryColors.PlatinateBlue_400,
  mutedLavender: NaturalColors.naturalColor_100,
  tintColor: PrimaryColors.PlatinateBlue_400,
  mutedLavender30: NaturalColors.naturalColor_0,
  balanceBackground: NaturalColors.grayScale_0,
  white: NaturalColors.grayScale_0,
  backgroundOpacity: 'rgba(250, 250, 250, 0.8)',
  black: PrimaryColors.cetaceanBlue_700,
  background: NaturalColors.grayScale_0,
  surface: NaturalColors.grayScale_0,
  card: NaturalColors.grayScale_0,
  shadow: PrimaryColors.cetaceanBlue_700,
  red: AlertColors.error_400,
  strokeDeactive: NaturalColors.grayScale_50,
};

// Dark theme colors
const darkThemeColors = {
  indigoBlue: PrimaryColors.PlatinateBlue_200,
  mutedLavender: NaturalColors.grayScale_0,
  tintColor: PrimaryColors.PlatinateBlue_200,
  mutedLavender30: NaturalColors.naturalColor_700,
  balanceBackground: NaturalColors.grayScale_700,
  white: NaturalColors.grayScale_0,
  backgroundOpacity: 'rgba(0, 5, 17, 0.8)',
  black: PrimaryColors.cetaceanBlue_700,
  background: NaturalColors.grayScale_700,
  surface: NaturalColors.grayScale_600,
  card: NaturalColors.grayScale_600,
  shadow: PrimaryColors.cetaceanBlue_700,
  red: AlertColors.error_300,
  strokeDeactive: NaturalColors.grayScale_400,
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    ...PrimaryColors,
    ...NaturalColors,
    ...AlertColors,
  },
  text: {
    ...commonTextStyles,
    // Apply light theme colors to all text styles
    header1: {
      ...commonTextStyles.header1,
      color: lightThemeColors.black,
    },
    header2: {
      ...commonTextStyles.header2,
      color: lightThemeColors.black,
    },
    header3: {
      ...commonTextStyles.header3,
      color: lightThemeColors.black,
    },
    header4: {
      ...commonTextStyles.header4,
      color: lightThemeColors.black,
    },
    header6: {
      ...commonTextStyles.header6,
      color: lightThemeColors.black,
    },

    // Body text styles with light theme colors
    bodyXLargeLight: {
      ...commonTextStyles.bodyXLargeLight,
      color: lightThemeColors.black,
    },
    bodyXLargeRegular: {
      ...commonTextStyles.bodyXLargeRegular,
      color: lightThemeColors.black,
    },
    bodyXLargeBold: {
      ...commonTextStyles.bodyXLargeBold,
      color: lightThemeColors.black,
    },
    bodyXLargeExtraBold: {
      ...commonTextStyles.bodyXLargeExtraBold,
      color: lightThemeColors.black,
    },

    bodyLargeLight: {
      ...commonTextStyles.bodyLargeLight,
      color: lightThemeColors.black,
    },
    bodyLargeRegular: {
      ...commonTextStyles.bodyLargeRegular,
      color: lightThemeColors.black,
    },
    bodyLargeBold: {
      ...commonTextStyles.bodyLargeBold,
      color: lightThemeColors.black,
    },
    bodyLargeExtraBold: {
      ...commonTextStyles.bodyLargeExtraBold,
      color: lightThemeColors.black,
    },

    bodyMediumLight: {
      ...commonTextStyles.bodyMediumLight,
      color: lightThemeColors.black,
    },
    bodyMediumRegular: {
      ...commonTextStyles.bodyMediumRegular,
      color: lightThemeColors.black,
    },
    bodyMediumBold: {
      ...commonTextStyles.bodyMediumBold,
      color: lightThemeColors.black,
    },
    bodyMediumExtraBold: {
      ...commonTextStyles.bodyMediumExtraBold,
      color: lightThemeColors.black,
    },

    bodySmallLight: {
      ...commonTextStyles.bodySmallLight,
      color: lightThemeColors.black,
    },
    bodySmallRegular: {
      ...commonTextStyles.bodySmallRegular,
      color: lightThemeColors.black,
    },
    bodySmallBold: {
      ...commonTextStyles.bodySmallBold,
      color: lightThemeColors.black,
    },
    bodySmallExtraBold: {
      ...commonTextStyles.bodySmallExtraBold,
      color: lightThemeColors.black,
    },

    // Legacy styles
    balanceTitle: {
      ...commonTextStyles.balanceTitle,
      color: lightThemeColors.indigoBlue,
      textAlign: 'center',
    },
    balanceAmount: {
      ...commonTextStyles.balanceAmount,
      color: lightThemeColors.indigoBlue,
      textAlign: 'center',
    },
    balanceLabel: {
      ...commonTextStyles.balanceLabel,
      color: lightThemeColors.indigoBlue,
    },
    body1: {
      ...commonTextStyles.body1,
      color: lightThemeColors.black,
    },
    body2: {
      ...commonTextStyles.body2,
      color: lightThemeColors.black,
    },
    button: {
      ...commonTextStyles.button,
      color: lightThemeColors.white,
    },
    cards: {
      ...commonTextStyles.cards,
      color: lightThemeColors.black,
    },
    SearchBar: {
      ...commonTextStyles.SearchBar,
      color: lightThemeColors.black,
    },
    label: {
      ...commonTextStyles.label,
      color: lightThemeColors.black,
    },
    hyperlink: {
      ...commonTextStyles.hyperlink,
      color: lightThemeColors.indigoBlue,
    },
    navBar: {
      ...commonTextStyles.navBar,
      color: lightThemeColors.white,
    },
  },
  spacing: CommonSizes.spacing,
  borderRadius: CommonSizes.borderRadius,
  borderWidth: CommonSizes.borderWidth,
  shadows: {
    elevation1: Shadows[1],
    elevation2: Shadows[2],
    elevation3: Shadows[3],
    elevation4: Shadows[4],
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    ...PrimaryColors,
    ...NaturalColors,
    ...AlertColors,
  },
  text: {
    ...commonTextStyles,
    // Apply dark theme colors to all text styles
    header1: {
      ...commonTextStyles.header1,
      color: darkThemeColors.mutedLavender,
    },
    header2: {
      ...commonTextStyles.header2,
      color: darkThemeColors.mutedLavender,
    },
    header3: {
      ...commonTextStyles.header3,
      color: darkThemeColors.mutedLavender,
    },
    header4: {
      ...commonTextStyles.header4,
      color: darkThemeColors.mutedLavender,
    },
    header6: {
      ...commonTextStyles.header6,
      color: darkThemeColors.mutedLavender,
    },

    // Body text styles with dark theme colors
    bodyXLargeLight: {
      ...commonTextStyles.bodyXLargeLight,
      color: darkThemeColors.mutedLavender,
    },
    bodyXLargeRegular: {
      ...commonTextStyles.bodyXLargeRegular,
      color: darkThemeColors.mutedLavender,
    },
    bodyXLargeBold: {
      ...commonTextStyles.bodyXLargeBold,
      color: darkThemeColors.mutedLavender,
    },
    bodyXLargeExtraBold: {
      ...commonTextStyles.bodyXLargeExtraBold,
      color: darkThemeColors.mutedLavender,
    },

    bodyLargeLight: {
      ...commonTextStyles.bodyLargeLight,
      color: darkThemeColors.mutedLavender,
    },
    bodyLargeRegular: {
      ...commonTextStyles.bodyLargeRegular,
      color: darkThemeColors.mutedLavender,
    },
    bodyLargeBold: {
      ...commonTextStyles.bodyLargeBold,
      color: darkThemeColors.mutedLavender,
    },
    bodyLargeExtraBold: {
      ...commonTextStyles.bodyLargeExtraBold,
      color: darkThemeColors.mutedLavender,
    },

    bodyMediumLight: {
      ...commonTextStyles.bodyMediumLight,
      color: darkThemeColors.mutedLavender,
    },
    bodyMediumRegular: {
      ...commonTextStyles.bodyMediumRegular,
      color: darkThemeColors.mutedLavender,
    },
    bodyMediumBold: {
      ...commonTextStyles.bodyMediumBold,
      color: darkThemeColors.mutedLavender,
    },
    bodyMediumExtraBold: {
      ...commonTextStyles.bodyMediumExtraBold,
      color: darkThemeColors.mutedLavender,
    },

    bodySmallLight: {
      ...commonTextStyles.bodySmallLight,
      color: darkThemeColors.mutedLavender,
    },
    bodySmallRegular: {
      ...commonTextStyles.bodySmallRegular,
      color: darkThemeColors.mutedLavender,
    },
    bodySmallBold: {
      ...commonTextStyles.bodySmallBold,
      color: darkThemeColors.mutedLavender,
    },
    bodySmallExtraBold: {
      ...commonTextStyles.bodySmallExtraBold,
      color: darkThemeColors.mutedLavender,
    },

    // Legacy styles
    balanceTitle: {
      ...commonTextStyles.balanceTitle,
      color: darkThemeColors.mutedLavender,
      textAlign: 'center',
    },
    balanceAmount: {
      ...commonTextStyles.balanceAmount,
      color: darkThemeColors.mutedLavender,
      textAlign: 'center',
    },
    balanceLabel: {
      ...commonTextStyles.balanceLabel,
      color: darkThemeColors.mutedLavender,
    },
    body1: {
      ...commonTextStyles.body1,
      color: darkThemeColors.mutedLavender,
    },
    body2: {
      ...commonTextStyles.body2,
      color: darkThemeColors.mutedLavender,
    },
    button: {
      ...commonTextStyles.button,
      color: darkThemeColors.white,
    },
    cards: {
      ...commonTextStyles.cards,
      color: darkThemeColors.white,
    },
    SearchBar: {
      ...commonTextStyles.SearchBar,
      color: darkThemeColors.mutedLavender,
    },
    label: {
      ...commonTextStyles.label,
      color: darkThemeColors.black,
    },
    hyperlink: {
      ...commonTextStyles.hyperlink,
      color: darkThemeColors.mutedLavender,
    },
    navBar: {
      ...commonTextStyles.navBar,
      color: darkThemeColors.white,
    },
  },
  spacing: CommonSizes.spacing,
  borderRadius: CommonSizes.borderRadius,
  borderWidth: CommonSizes.borderWidth,
  shadows: {
    elevation1: Shadows[1],
    elevation2: Shadows[2],
    elevation3: Shadows[3],
    elevation4: Shadows[4],
  },
};
