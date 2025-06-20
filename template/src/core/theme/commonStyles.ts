import {
  Dimensions,
  Platform,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Theme} from './types';
import {FontSizes, LineHeight, Spacing} from './commonSizes';
import {Fonts} from './fonts';

export const screenComponentWidth = Dimensions.get('screen').width - 60;
export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export function justifyWidth(componentWidth: number) {
  return (componentWidth / 2048) * screenWidth;
}

export function justifyHeight(componentHeight: number) {
  return (componentHeight / 2048) * screenHeight;
}

export const createThemedStyles = (theme: Theme) =>
  StyleSheet.create({
    flex1: {
      flex: 1,
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    flex1Transparent: {
      flex: 1,
      backgroundColor: 'transparent',
    } as ViewStyle,
    flex1Padding: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
    } as ViewStyle,
    flex1PaddingTransparent: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: 'transparent',
    } as ViewStyle,
    flexCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    flexColumnCenterStretch: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    listContentContainer: {
      flexGrow: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    } as ViewStyle,
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
    columnAlignStart: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    } as ViewStyle,
    shadow: {
      backgroundColor: theme.colors.card,
      shadowColor: theme.colors.shadow,
      ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
        } as ViewStyle,
        android: {
          elevation: 4,
        } as ViewStyle,
      }),
    } as ViewStyle,
    iPhoneXFooter: {
      height: 20,
    } as ViewStyle,
    normalText: {
      // fontFamily: Fonts.regular,
      // fontSize: FontSizes.medium,
      // lineHeight: LineHeight.medium,
    } as TextStyle,
    h1_bold: {
      fontFamily: Fonts.bold,
    } as TextStyle,
    h1_semiBold: {
      fontFamily: Fonts.semiBold,
    } as TextStyle,
    h1_regular: {
      fontFamily: Fonts.regular,
    } as TextStyle,
    h2_bold: {
      fontFamily: Fonts.bold,
    } as TextStyle,
    h2_semiBold: {
      fontFamily: Fonts.semiBold,
    } as TextStyle,
    h2_regular: {
      fontFamily: Fonts.regular,
    } as TextStyle,
    h3_bold: {
      fontFamily: Fonts.bold,
    } as TextStyle,
    h3_bold_underlined: {
      fontFamily: Fonts.bold,
      textDecorationLine: 'underline',
    } as TextStyle,
    h3_semiBold: {
      fontFamily: Fonts.semiBold,
    } as TextStyle,
    h3_regular: {
      fontFamily: Fonts.regular,
    } as TextStyle,
    h4_bold: {
      fontFamily: Fonts.bold,
    } as TextStyle,
    h4_bold_underlined: {
      fontFamily: Fonts.bold,
      textDecorationLine: 'underline',
    } as TextStyle,
    h4_semiBold: {
      fontFamily: Fonts.semiBold,
      fontSize: FontSizes.medium,
      lineHeight: LineHeight.medium,
    } as TextStyle,
    h4_regular: {
      fontFamily: Fonts.regular,
      fontSize: FontSizes.medium,
      lineHeight: LineHeight.medium,
    } as TextStyle,
    body_bold: {
      fontFamily: Fonts.bold,
      fontSize: FontSizes.small,
      lineHeight: LineHeight.small,
    } as TextStyle,
    body_bold_underlined: {
      fontFamily: Fonts.bold,
      fontSize: FontSizes.small,
      lineHeight: LineHeight.small,
      textDecorationLine: 'underline',
    } as TextStyle,
    body_semiBold: {
      fontFamily: Fonts.semiBold,
      fontSize: FontSizes.small,
      lineHeight: LineHeight.small,
    } as TextStyle,
    body_regular: {
      fontFamily: Fonts.regular,
      fontSize: FontSizes.small,
      lineHeight: LineHeight.small,
    } as TextStyle,
    tabBar_bold: {
      fontFamily: Fonts.bold,
    } as TextStyle,
    tabBar_regular: {
      fontFamily: Fonts.regular,
    } as TextStyle,
    dropShadow: {
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
      borderWidth: 0.5,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    } as ViewStyle,
    textInputContainer: {
      width: '100%',
    } as ViewStyle,
  });

// For backward compatibility and static styles
export const CommonStyles = createThemedStyles({
  mode: 'light',
  colors: {
    indigoBlue: '#2D9CDB',
    mutedLavender: '#B3B5FF',
    tintColor: '#2D9CDB',
    mutedLavender30: 'rgba(184, 186, 255, 0.3)',
    white: '#FFFFFF',
    backgroundOpacity: 'rgba(41, 45, 50, 0.8)',
    black: '#000000',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    card: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.1)',
    red: '#FB043E',
    balanceBackground: '#F5F5F5',
  },
  text: {
    header1: {
      fontFamily: Fonts.medium,
      fontSize: FontSizes.header1,
      color: '#000000',
    },
    header2: {
      fontFamily: Fonts.normal,
      fontSize: FontSizes.header2,
      color: '#000000',
    },
    body1: {
      fontFamily: Fonts.light,
      fontSize: FontSizes.body1,
      color: '#000000',
    },
    body2: {
      fontFamily: Fonts.regular,
      fontSize: FontSizes.body2,
      color: '#000000',
    },
    button: {
      fontFamily: Fonts.regular,
      fontSize: FontSizes.button,
      color: '#FFFFFF',
    },
    cards: {
      fontFamily: Fonts.semiBold,
      fontSize: FontSizes.card,
      color: '#000000',
    },
    SearchBar: {
      fontFamily: Fonts.light,
      fontSize: FontSizes.searchBar,
      color: '#000000',
    },
    label: {
      fontFamily: Fonts.light,
      fontSize: FontSizes.label,
      color: '#000000',
    },
    hyperlink: {
      fontFamily: Fonts.light,
      fontSize: FontSizes.hyperlink,
      color: '#000000',
      textDecorationLine: 'underline',
    },
    balanceTitle: {
      fontFamily: Fonts.semiBold,
      fontSize: 16,
      color: '#000000',
    },
    balanceAmount: {
      fontFamily: Fonts.semiBold,
      fontSize: 16,
      color: '#000000',
    },
    balanceLabel: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: '#000000',
    },
    navBar: {
      fontFamily: Fonts.semiBold,
      fontSize: 16,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
});
