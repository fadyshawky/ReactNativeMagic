import {Dimensions, PixelRatio, Platform} from 'react-native';

// Device dimensions
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

// Base dimensions (based on design specifications)
const BASE_WIDTH = 720;
const BASE_HEIGHT = 1440;

// Scale factors with increased scaling
const wScale = (SCREEN_WIDTH / BASE_WIDTH) * 1.2; // Increased by 20%
const hScale = (SCREEN_HEIGHT / BASE_HEIGHT) * 1.2; // Increased by 20%

/**
 * Scales width based on device screen width
 * @param size - Size to scale
 * @returns Scaled size
 */
export const scaleWidth = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * wScale);
};

/**
 * Scales height based on device screen height
 * @param size - Size to scale
 * @returns Scaled size
 */
export const scaleHeight = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * hScale);
};

/**
 * Scales size proportionally based on screen width
 * More suitable for general scaling of UI elements
 * @param size - Size to scale
 * @returns Scaled size
 */
export const scale = (size: number): number => {
  const scaleFactor = Math.min(wScale, hScale) * 1.1; // Additional 10% increase
  return PixelRatio.roundToNearestPixel(size * scaleFactor);
};

/**
 * Scales font size based on device screen size
 * Includes platform-specific adjustments with smaller reduction
 * @param size - Font size to scale
 * @returns Scaled font size
 */
export const scaleFontSize = (size: number): number => {
  const scaledSize = scale(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize)) - 1; // Reduced from -2 to -1
};

/**
 * Scales spacing/margin/padding based on screen width
 * @param size - Size to scale
 * @returns Scaled size
 */
export const scaleSpacing = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * wScale * 1.1); // Additional 10% increase
};

/**
 * Scales border radius based on screen width
 * @param size - Size to scale
 * @returns Scaled size
 */
export const scaleBorderRadius = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * Math.min(wScale * 1.1, 1.3)); // Increased max scale from 1.2 to 1.3
};

/**
 * Returns responsive value based on screen width breakpoints
 * @param options - Object containing size values for different breakpoints
 * @returns Appropriate value for current screen width
 */
export const responsiveSize = (options: {
  small?: number;
  medium?: number;
  large?: number;
  default: number;
}): number => {
  if (SCREEN_WIDTH < 720 && options.small !== undefined) {
    return options.small;
  }
  if (SCREEN_WIDTH > 1080 && options.large !== undefined) {
    return options.large;
  }
  if (
    options.medium !== undefined &&
    SCREEN_WIDTH >= 720 &&
    SCREEN_WIDTH <= 1080
  ) {
    return options.medium;
  }
  return options.default;
};
