import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Icon} from './Icon';
import {RTLAwareText} from './RTLAwareText';
import {RTLAwareView} from './RTLAwareView';

interface CheckboxProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Checkbox(props: CheckboxProps): JSX.Element {
  const {checked, onChange, label, disabled} = props;
  const {theme} = useTheme();

  const boxStyle: ViewStyle = {
    width: 18,
    height: 18,
    borderRadius: CommonSizes.borderRadius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: checked ? theme.colors.accent : theme.colors.surfaceCard,
    borderWidth: CommonSizes.borderWidth.hairline,
    borderColor: checked ? theme.colors.accent : theme.colors.borderDefault,
    boxShadow: theme.shadows.xs,
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
          {checked ? (
            <Icon name="check" size={13} color="#FFFFFF" strokeWidth={2.5} />
          ) : null}
        </View>
        {label ? (
          <RTLAwareText style={[theme.text.body, styles.label]}>
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
    marginStart: 10,
    flexShrink: 1,
  },
});
