import React, {FC, memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';

interface IProps {
  isSelected: boolean;
  disabled?: boolean;
}

export const RadioIcon: FC<IProps> = memo(({isSelected, disabled}) => {
  const {theme} = useTheme();
  return (
    <View
      style={[
        styles.ring,
        {
          backgroundColor: theme.colors.surfaceCard,
          borderColor:
            isSelected && !disabled
              ? theme.colors.accent
              : theme.colors.borderDefault,
        },
        disabled && styles.disabled,
      ]}>
      {isSelected && (
        <View style={[styles.dot, {backgroundColor: theme.colors.accent}]} />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  ring: {
    width: 18,
    height: 18,
    borderRadius: CommonSizes.borderRadius.full,
    borderWidth: CommonSizes.borderWidth.hairline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {opacity: 0.5},
  dot: {
    width: 9,
    height: 9,
    borderRadius: CommonSizes.borderRadius.full,
  },
});
