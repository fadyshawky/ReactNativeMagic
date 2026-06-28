import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {RTLAwareText} from './RTLAwareText';
import {RTLAwareView} from './RTLAwareView';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  value?: string;
  options: RadioOption[];
  onChange: (value: string) => void;
}

export function RadioGroup(props: RadioGroupProps): JSX.Element {
  const {value, options, onChange} = props;
  const {theme} = useTheme();

  return (
    <RTLAwareView style={styles.container}>
      {options.map(option => {
        const isSelected = option.value === value;
        const ringStyle: ViewStyle = {
          width: 20,
          height: 20,
          borderRadius: CommonSizes.borderRadius.full,
          borderWidth: CommonSizes.borderWidth.medium,
          borderColor: isSelected
            ? theme.colors.PlatinateBlue_400
            : theme.colors.grayScale_50,
          alignItems: 'center',
          justifyContent: 'center',
        };
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            hitSlop={6}
            accessibilityRole="radio"
            accessibilityState={{selected: isSelected}}
            style={styles.rowPressable}>
            <RTLAwareView style={styles.row}>
              <View style={ringStyle}>
                {isSelected ? (
                  <View
                    style={[
                      styles.dot,
                      {backgroundColor: theme.colors.PlatinateBlue_400},
                    ]}
                  />
                ) : null}
              </View>
              <RTLAwareText
                style={[
                  theme.text.bodyLargeRegular,
                  styles.label,
                  {color: theme.colors.grayScale_700},
                ]}>
                {option.label}
              </RTLAwareText>
            </RTLAwareView>
          </Pressable>
        );
      })}
    </RTLAwareView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    gap: CommonSizes.spacing.large,
  } as ViewStyle,
  rowPressable: {
    paddingVertical: CommonSizes.spacing.small,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    marginStart: CommonSizes.spacing.large,
    flexShrink: 1,
  },
});
