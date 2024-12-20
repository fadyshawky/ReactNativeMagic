import {
  Dimensions,
  Platform,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Colors} from './colors';
import {CommonSizes} from './commonSizes';
import {Fonts} from './fonts';

export const screenComponentWidth = Dimensions.get('screen').width - 60;
export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;
export function justifyWidth(componentWidth: number) {
  return (componentWidth / 2048) * screenWidth;
}
export function justifyHeight(componentHeigght: number) {
  return (componentHeigght / 2048) * screenHeight;
}
export const CommonStyles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: Colors.background,
  } as ViewStyle,
  flex1Transparent: {
    flex: 1,
    backgroundColor: 'transparent',
  } as ViewStyle,
  flex1Padding: {
    flex: 1,
    paddingHorizontal: CommonSizes.spacing.large,
  } as ViewStyle,
  flex1PaddingTransparent: {
    flex: 1,
    paddingHorizontal: CommonSizes.spacing.large,
    backgroundColor: 'transparent',
  } as ViewStyle,
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  } as ViewStyle,
  flexColumnCenterStretch: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  } as ViewStyle,
  listContentContainer: {
    flexGrow: 1,
    paddingHorizontal: CommonSizes.spacing.large,
    paddingVertical: CommonSizes.spacing.medium,
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
    backgroundColor: Colors.white,
    shadowColor: '#2D9CDB',
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
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.medium,
    lineHeight: CommonSizes.lineHeight.medium,
    color: Colors.black,
  } as TextStyle,
  h1_bold: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.largePlus,
    lineHeight: CommonSizes.lineHeight.largePlus,
    color: Colors.black,
  } as TextStyle,
  h1_semiBold: {
    fontFamily: Fonts.semiBold,
    fontSize: CommonSizes.font.largePlus,
    lineHeight: CommonSizes.lineHeight.largePlus,
    color: Colors.black,
  } as TextStyle,
  h1_regular: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.largePlus,
    lineHeight: CommonSizes.lineHeight.largePlus,
    color: Colors.black,
  } as TextStyle,
  h2_bold: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.extraMedium,
    lineHeight: CommonSizes.lineHeight.mediumPlus,
    color: Colors.black,
  } as TextStyle,
  h2_semiBold: {
    fontFamily: Fonts.semiBold,
    fontSize: CommonSizes.font.extraMedium,
    lineHeight: CommonSizes.lineHeight.mediumPlus,
    color: Colors.black,
  } as TextStyle,
  h2_regular: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.extraMedium,
    lineHeight: CommonSizes.lineHeight.mediumPlus,
    color: Colors.black,
  } as TextStyle,
  h3_bold: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.mediumPlus,
    lineHeight: CommonSizes.lineHeight.medium,
    color: Colors.black,
  } as TextStyle,
  h3_bold_underlined: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.mediumPlus,
    lineHeight: CommonSizes.lineHeight.medium,
    textDecorationLine: 'underline',
    color: Colors.black,
  } as TextStyle,
  h3_semiBold: {
    fontFamily: Fonts.semiBold,
    fontSize: CommonSizes.font.mediumPlus,
    lineHeight: CommonSizes.lineHeight.medium,
    color: Colors.black,
  } as TextStyle,
  h3_regular: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.mediumPlus,
    lineHeight: CommonSizes.lineHeight.medium,
    color: Colors.black,
  } as TextStyle,
  h4_bold: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.medium,
    lineHeight: CommonSizes.lineHeight.medium,
    color: Colors.black,
  } as TextStyle,
  h4_bold_underlined: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.medium,
    lineHeight: CommonSizes.lineHeight.medium,
    textDecorationLine: 'underline',
    color: Colors.black,
  } as TextStyle,
  h4_semiBold: {
    fontFamily: Fonts.semiBold,
    fontSize: CommonSizes.font.medium,
    lineHeight: CommonSizes.lineHeight.medium,
    color: Colors.black,
  } as TextStyle,
  h4_regular: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.medium,
    lineHeight: CommonSizes.lineHeight.medium,
    color: Colors.black,
  } as TextStyle,
  body_bold: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.small,
    lineHeight: CommonSizes.lineHeight.small,
    color: Colors.black,
  } as TextStyle,
  body_bold_underlined: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.small,
    lineHeight: CommonSizes.lineHeight.small,
    textDecorationLine: 'underline',
    color: Colors.black,
  } as TextStyle,
  body_semiBold: {
    fontFamily: Fonts.semiBold,
    fontSize: CommonSizes.font.small,
    lineHeight: CommonSizes.lineHeight.small,
    color: Colors.black,
  } as TextStyle,
  body_regular: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.small,
    lineHeight: CommonSizes.lineHeight.small,
    color: Colors.black,
  } as TextStyle,
  tabBar_bold: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.extraSmallPlus,
    lineHeight: CommonSizes.lineHeight.extraSmallPlus,
    color: Colors.black,
  } as TextStyle,
  tabBar_regular: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.extraSmallPlus,
    lineHeight: CommonSizes.lineHeight.extraSmallPlus,
    color: Colors.black,
  } as TextStyle,
  dropShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  } as ViewStyle,
  textInputContainer: {
    width: '100%',
  } as ViewStyle,
});
