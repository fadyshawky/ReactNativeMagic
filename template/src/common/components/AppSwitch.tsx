import React, {useEffect, useRef} from 'react';
import {
  Animated,
  I18nManager,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {useReducedMotion} from 'react-native-reanimated';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Motion} from '../../core/theme/motion';
import {useTheme} from '../../core/theme/ThemeProvider';

interface AppSwitchProps {
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
}

const TRACK_WIDTH = 42;
const TRACK_HEIGHT = 24;
const KNOB = 18;
const PADDING = (TRACK_HEIGHT - KNOB) / 2;
const TRAVEL = TRACK_WIDTH - KNOB - PADDING * 2;

/**
 * Design-system Switch: accent track when on, strong-border track when off,
 * white knob that springs across (the one place the system overshoots).
 */
export function AppSwitch(props: AppSwitchProps): JSX.Element {
  const {value, onValueChange, disabled} = props;
  const {theme} = useTheme();
  const reduceMotion = useReducedMotion();
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: reduceMotion ? 1 : Motion.duration.base,
      easing: Motion.easing.spring,
      useNativeDriver: true,
    }).start();
  }, [value, anim, reduceMotion]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    // The knob starts on the leading side; "on" is the trailing side.
    outputRange: [0, I18nManager.isRTL ? -TRAVEL : TRAVEL],
  });

  const trackStyle: ViewStyle = {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: CommonSizes.borderRadius.full,
    padding: PADDING,
    justifyContent: 'center',
    backgroundColor: value ? theme.colors.accent : theme.colors.borderStrong,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
      hitSlop={10}
      accessibilityRole="switch"
      accessibilityState={{checked: value, disabled}}
      style={trackStyle}>
      <Animated.View style={[styles.knob, {transform: [{translateX}]}]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  knob: {
    width: KNOB,
    height: KNOB,
    borderRadius: CommonSizes.borderRadius.full,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 1px 2px rgba(10,13,20,0.28)',
  },
});
