import React, {useEffect, useRef} from 'react';
import {Animated, DimensionValue, ViewStyle} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {CommonSizes} from '../../core/theme/commonSizes';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  radius?: number;
}

/**
 * A lightweight shimmer placeholder. Loops its opacity between 0.4 and 1 to
 * signal loading content. Built on Animated only — no extra dependencies.
 */
export function Skeleton({width, height, radius}: SkeletonProps): JSX.Element {
  const {theme} = useTheme();
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  const blockStyle: ViewStyle = {
    width: (width ?? '100%') as DimensionValue,
    height: height ?? 16,
    borderRadius: radius ?? CommonSizes.borderRadius.medium,
    backgroundColor: theme.colors.grayScale_50,
  };

  return <Animated.View style={[blockStyle, {opacity}]} />;
}
