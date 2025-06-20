import {SearchBar} from 'react-native-screens';
import {BlackColors, WhiteColors} from './colors';
import {FontSizes} from './commonSizes';
import {Fonts} from './fonts';
import {Theme} from './types';
import {TextStyle} from 'react-native';

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

const commonTextStyles = {
  header1: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.header1,
  },
  header2: {
    fontFamily: Fonts.normal,
    fontSize: FontSizes.header2,
  },
  balanceTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.body2,
    textAlign: 'center',
  },
  balanceAmount: {
    fontFamily: Fonts.normal,
    fontSize: FontSizes.header2,
    textAlign: 'center',
  },
  balanceLabel: {
    fontFamily: Fonts.light,
    fontSize: FontSizes.balanceLabel,
  },
  body1: {
    fontFamily: Fonts.light,
    fontSize: FontSizes.body1,
  },
  body2: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.body2,
  },
  button: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.button,
  },
  cards: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.card,
  },
  SearchBar: {
    fontFamily: Fonts.light,
    fontSize: FontSizes.searchBar,
  },
  label: {
    fontFamily: Fonts.light,
    fontSize: FontSizes.label,
  },
  hyperlink: {
    fontFamily: Fonts.light,
    fontSize: FontSizes.hyperlink,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: WhiteColors.indigoBlue,
  } as TextStyle,
  navBar: {
    fontFamily: Fonts.normal,
    fontSize: FontSizes.navBar,
  },
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    ...WhiteColors,
  },
  text: {
    ...commonTextStyles,
    header1: {
      ...commonTextStyles.header1,
      color: WhiteColors.black,
    },
    balanceTitle: {
      ...commonTextStyles.balanceTitle,
      color: WhiteColors.indigoBlue,
      textAlign: 'center',
    },
    balanceAmount: {
      ...commonTextStyles.balanceAmount,
      color: WhiteColors.indigoBlue,
      textAlign: 'center',
    },
    balanceLabel: {
      ...commonTextStyles.balanceLabel,
      color: WhiteColors.indigoBlue,
    },
    header2: {
      ...commonTextStyles.header2,
      color: WhiteColors.black,
    },
    body1: {
      ...commonTextStyles.body1,
      color: WhiteColors.black,
    },
    body2: {
      ...commonTextStyles.body2,
      color: WhiteColors.black,
    },
    button: {
      ...commonTextStyles.button,
      color: WhiteColors.white,
    },
    cards: {
      ...commonTextStyles.cards,
      color: WhiteColors.black,
    },
    SearchBar: {
      ...commonTextStyles.SearchBar,
      color: WhiteColors.black,
    },
    label: {
      ...commonTextStyles.label,
      color: WhiteColors.black,
    },
    hyperlink: {
      ...commonTextStyles.hyperlink,
      color: WhiteColors.indigoBlue,
    },
    navBar: {
      ...commonTextStyles.navBar,
      color: WhiteColors.white,
    },
  },
  spacing,
  borderRadius,
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    ...BlackColors,
  },
  text: {
    ...commonTextStyles,
    header1: {
      ...commonTextStyles.header1,
      color: BlackColors.mutedLavender,
    },
    header2: {
      ...commonTextStyles.header2,
      color: BlackColors.mutedLavender,
    },
    balanceTitle: {
      ...commonTextStyles.balanceTitle,
      color: BlackColors.mutedLavender,
      textAlign: 'center',
    },
    balanceAmount: {
      ...commonTextStyles.balanceAmount,
      color: BlackColors.mutedLavender,
      textAlign: 'center',
    },
    balanceLabel: {
      ...commonTextStyles.balanceLabel,
      color: BlackColors.mutedLavender,
    },
    body1: {
      ...commonTextStyles.body1,
      color: BlackColors.mutedLavender,
    },
    body2: {
      ...commonTextStyles.body2,
      color: BlackColors.mutedLavender,
    },
    button: {
      ...commonTextStyles.button,
      color: BlackColors.white,
    },
    cards: {
      ...commonTextStyles.cards,
      color: BlackColors.white,
    },
    SearchBar: {
      ...commonTextStyles.SearchBar,
      color: BlackColors.mutedLavender,
    },
    label: {
      ...commonTextStyles.label,
      color: BlackColors.black,
    },
    hyperlink: {
      ...commonTextStyles.hyperlink,
      color: BlackColors.mutedLavender,
    },
    navBar: {
      ...commonTextStyles.navBar,
      color: BlackColors.white,
    },
  },
  spacing,
  borderRadius,
};
