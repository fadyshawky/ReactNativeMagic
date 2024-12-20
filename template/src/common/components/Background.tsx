import React from 'react';
import {ImageBackground, StyleSheet, ViewStyle} from 'react-native';
import {CommonStyles} from '../../core/theme/commonStyles';
import {ImageResources} from '../ImageResources.g';

interface BackgroundType {
  children: React.ReactNode;
  inverted?: boolean;
  extraStyle?: ViewStyle;
}

export const Background = ({
  children,
  inverted,
  extraStyle,
}: BackgroundType) => {
  const styles = StyleSheet.create({
    imageContainer: {
      ...CommonStyles.flex1,
      flexGrow: 1,
      // justifyContent: 'flex-end',
    },
  });

  return (
    <ImageBackground
      resizeMode="cover"
      style={{...styles.imageContainer, ...extraStyle}}
      imageStyle={inverted ? {transform: [{rotateY: '180deg'}]} : undefined}
      source={0}>
      {children}
    </ImageBackground>
  );
};
