import React, {FC, memo, useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Colors} from '../../core/theme/colors';

interface IProps {
  isSelected: boolean;
  disabled?: boolean;
}

export const RadioIcon: FC<IProps> = memo(({isSelected, disabled}) => {
  const outerCircleStyle = useMemo(() => {
    return disabled
      ? styles.outerCircle
      : isSelected
      ? styles.outerCircleSelected
      : styles.outerCircle;
  }, [isSelected, disabled]);

  return (
    <View style={outerCircleStyle}>
      {isSelected && <View style={styles.innerCircle} />}
    </View>
  );
});

const commonOuterCircle: ViewStyle = {
  width: 16,
  height: 16,
  borderRadius: 8,
  borderWidth: 2,
  justifyContent: 'center',
  alignItems: 'center',
};

const commonInnerCircle: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
};

const styles = StyleSheet.create({
  outerCircle: {
    ...commonOuterCircle,
    borderColor: Colors.blueNormalActive,
  } as ViewStyle,
  outerCircleSelected: {
    ...commonOuterCircle,
    borderColor: Colors.blueNormalActive,
  } as ViewStyle,
  innerCircle: {
    ...commonInnerCircle,
    backgroundColor: Colors.blueNormalActive,
  } as ViewStyle,
});
