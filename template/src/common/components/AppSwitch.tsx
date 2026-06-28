import React, {useEffect, useRef} from 'react';
import {Animated, Pressable, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {CommonSizes} from '../../core/theme/commonSizes';

interface AppSwitchProps {
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
}

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 24;
const PADDING = (TRACK_HEIGHT - THUMB_SIZE) / 2;
const TRAVEL = TRACK_WIDTH - THUMB_SIZE - PADDING * 2;

export function AppSwitch(props: AppSwitchProps): JSX.Element {
  const {value, onValueChange, disabled} = props;
  const {theme} = useTheme();
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [value, anim]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TRAVEL],
  });

  const trackStyle: ViewStyle = {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: CommonSizes.borderRadius.full,
    padding: PADDING,
    justifyContent: 'center',
    backgroundColor: value
      ? theme.colors.PlatinateBlue_400
      : theme.colors.grayScale_50,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
      hitSlop={8}
      accessibilityRole="switch"
      accessibilityState={{checked: value, disabled}}
      style={trackStyle}>
      <Animated.View
        style={[styles.thumb, {transform: [{translateX}]}]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#06080F',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 1},
    elevation: 3,
  },
});
