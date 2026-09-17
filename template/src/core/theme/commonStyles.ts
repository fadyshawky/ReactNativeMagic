import {Dimensions} from 'react-native';

export const screenComponentWidth = Dimensions.get('screen').width - 60;
export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export function justifyWidth(componentWidth: number) {
  return (componentWidth / 2048) * screenWidth;
}

export function justifyHeight(componentHeight: number) {
  return (componentHeight / 2048) * screenHeight;
}
