import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from '../../core/theme/ThemeProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {RTLAwareText} from './RTLAwareText';
import {RTLAwareView} from './RTLAwareView';

interface CheckboxProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
}

function CheckMark({color}: {color: string}): JSX.Element {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12.5L10 17.5L19 7"
        stroke={color}
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Checkbox(props: CheckboxProps): JSX.Element {
  const {checked, onChange, label, disabled} = props;
  const {theme} = useTheme();

  const boxStyle: ViewStyle = {
    width: 22,
    height: 22,
    borderRadius: CommonSizes.borderRadius.small,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: checked ? theme.colors.PlatinateBlue_400 : 'transparent',
    borderWidth: CommonSizes.borderWidth.medium,
    borderColor: checked
      ? theme.colors.PlatinateBlue_400
      : theme.colors.grayScale_50,
  };

  const boxOpacity = {opacity: disabled ? 0.5 : 1};

  return (
    <Pressable
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
      hitSlop={8}
      accessibilityRole="checkbox"
      accessibilityState={{checked, disabled}}
      style={boxOpacity}>
      <RTLAwareView style={styles.row}>
        <View style={boxStyle}>
          {checked ? <CheckMark color={'#FFFFFF'} /> : null}
        </View>
        {label ? (
          <RTLAwareText
            style={[
              theme.text.bodyLargeRegular,
              styles.label,
              {color: theme.colors.grayScale_700},
            ]}>
            {label}
          </RTLAwareText>
        ) : null}
      </RTLAwareView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  label: {
    marginStart: CommonSizes.spacing.large,
    flexShrink: 1,
  },
});
