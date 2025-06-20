import React, {FC, useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {hairlineWidth} from '../../core/theme/commonConsts';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
interface IProps {
  isFull?: boolean;
}

export const Separator: FC<IProps> = ({isFull = true}) => {
  const {theme} = useTheme();
  const containerStyle = useMemo(() => {
    return isFull ? styles.fullContainer : styles.container;
  }, [isFull]);

  return (
    <View
      style={[containerStyle, {backgroundColor: theme.colors.indigoBlue}]}
    />
  );
};

const sharedStyle: ViewStyle = {
  height: hairlineWidth,
};

const styles = StyleSheet.create({
  container: {
    ...sharedStyle,
    marginHorizontal: CommonSizes.spacing.md,
  } as ViewStyle,
  fullContainer: {
    ...sharedStyle,
  } as ViewStyle,
});
