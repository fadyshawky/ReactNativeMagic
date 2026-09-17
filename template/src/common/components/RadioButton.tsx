import React, {FC, FunctionComponent, memo, useCallback} from 'react';
import {StyleSheet, Text, ViewStyle} from 'react-native';
import {RadioIcon} from './RadioIcon';
import {TouchablePlatform} from './TouchablePlatform';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';

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
    const {theme} = useTheme();
    const onButtonPress = useCallback(() => {
      onPress(id, !isSelected);
    }, [onPress, isSelected, id]);

    return (
      <TouchablePlatform
        style={styles.container}
        onPressIn={onButtonPress}
        disabled={disabled}>
        {IconComponent && (
          <IconComponent disabled={disabled} isSelected={isSelected} />
        )}
        <Text
          style={[
            theme.text.body,
            styles.label,
            disabled && {color: theme.colors.textDisabled},
          ]}
          numberOfLines={1}>
          {label}
        </Text>
      </TouchablePlatform>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: CommonSizes.touchMin,
    paddingHorizontal: CommonSizes.spacing.medium,
    alignItems: 'center',
  } as ViewStyle,
  label: {
    flex: 1,
    paddingStart: 10,
  },
});
