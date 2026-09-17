import dayjs from 'dayjs';
import {
  Dimensions,
  I18nManager,
  PixelRatio,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {createPerfectSize} from '../../common/utils/createPerfectSize';

const windowDimensions = Dimensions.get('window');

// React Native swaps textAlign left/right under RTL for Text, not TextInput, so
// inputs name the physical side (otherwise Arabic placeholders sit on the left).
export const inputTextAlign = I18nManager.isRTL ? 'right' : 'left';
export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const hasDynamicIsland = DeviceInfo.hasDynamicIsland();
export const hasNotch = DeviceInfo.hasNotch() || hasDynamicIsland;
export const isIpad = Platform.OS === 'ios' && Platform.isPad;
export const isTablet = DeviceInfo.isTablet();
export const isAndroid11AndHigher =
  Platform.OS === 'android' && Platform.Version >= 30;

export const windowWidth = windowDimensions.width;
export const windowHeight =
  windowDimensions.height - (!isIos ? StatusBar.currentHeight || 0 : 0);

export const screenTabInitialLayout = {height: 0, width: windowWidth};
export const hairlineWidth = StyleSheet.hairlineWidth;

export const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};
export const hitSlopBig = {top: 20, bottom: 20, left: 20, right: 20};

export const pixelRatio = PixelRatio.get();

export const perfectSize = createPerfectSize(
  PixelRatio.roundToNearestPixel(windowWidth * pixelRatio),
  PixelRatio.roundToNearestPixel(windowHeight * pixelRatio),
);

export const maxWindowDimension = Math.max(windowWidth, windowHeight);
export const minWindowDimension = Math.min(windowHeight, windowWidth);

export const minimalLegalAge = dayjs().subtract(16, 'years').toDate();
export const maximalAge = dayjs().subtract(100, 'years').toDate();
