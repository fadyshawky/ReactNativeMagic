import React, {FC, FunctionComponent, memo, useCallback, useMemo} from 'react';
import {StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import {RadioIcon} from './RadioIcon';
import {TouchablePlatform} from './TouchablePlatform';
import {CommonSizes} from '../../core/theme/commonSizes';
import {CommonStyles} from '../../core/theme/commonStyles';

interface IIconComponentProps {
  isSelected: boolean;
  disabled?: boolean;
}

interface IProps extends IIconComponentProps {
  id: string;
  label: string;
  onPress: (id: string, nextValue: boolean) => void;
  IconComponent?: FunctionComponent<IIconComponentProps>;
}

export const RadioButton: FC<IProps> = memo(
  ({isSelected, label, onPress, disabled, IconComponent = RadioIcon, id}) => {
    const onButtonPress = useCallback(() => {
      onPress(id, !isSelected);
    }, [onPress, isSelected, id]);

    const labelStyle = useMemo(() => {
      return disabled ? styles.labelDisabled : styles.label;
    }, [disabled]);

    return (
      <TouchablePlatform
        style={styles.container}
        onPressIn={onButtonPress}
        disabled={disabled}>
        {IconComponent && (
          <IconComponent disabled={disabled} isSelected={isSelected} />
        )}
        <Text style={labelStyle} numberOfLines={1}>
          {label}
        </Text>
      </TouchablePlatform>
    );
  },
);

const commonLabel: TextStyle = {
  ...CommonStyles.normalText,
  flex: 1,
  paddingStart: CommonSizes.spacing.extraSmall,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: CommonSizes.spacing.medium,
    alignItems: 'center',
  } as ViewStyle,
  label: {
    ...commonLabel,
  } as TextStyle,
  labelDisabled: {
    ...commonLabel,
  } as TextStyle,
});
