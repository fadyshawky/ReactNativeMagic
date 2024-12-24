import React, {FC, memo, useMemo} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  ImageURISource,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  ButtonType,
  IIconPlatformProps,
  TouchablePlatformProps,
} from '../../../types';
import {Colors, NewColors} from '../../core/theme/colors';
import {CommonSizes} from '../../core/theme/commonSizes';
import {CommonStyles} from '../../core/theme/commonStyles';
import {IconPlatform} from './IconPlatform';
import {TouchablePlatform} from './TouchablePlatform';

interface IProps extends TouchablePlatformProps {
  label: string;
  type: ButtonType;
  rounded?: boolean;
  icon?: ImageURISource;
  iconStyle?: StyleProp<ImageStyle>;
  platformIconProps?: IIconPlatformProps;
  labelStyle?: TextStyle;
  isLoading?: boolean;
}

export const PrimaryButton: FC<IProps> = memo(
  ({
    label,
    icon,
    iconStyle,
    type,
    rounded,
    labelStyle,
    style,
    isLoading,
    platformIconProps,
    ...props
  }) => {
    const styles = useMemo(() => {
      return getStyles(type, rounded, props.disabled);
    }, [type, rounded, props.disabled]);

    const content = useMemo(() => {
      if (isLoading) {
        return (
          <ActivityIndicator
            animating={true}
            color={activityIndicatorColor}
            size={'small'}
          />
        );
      } else {
        return (
          <>
            <ButtonIcon
              icon={icon}
              iconStyle={[styles.icon, iconStyle]}
              platformIconProps={platformIconProps}
            />
            <Text style={[styles.label, labelStyle]} numberOfLines={1}>
              {label}
            </Text>
          </>
        );
      }
    }, [
      icon,
      iconStyle,
      isLoading,
      label,
      labelStyle,
      platformIconProps,
      styles.icon,
      styles.label,
    ]);

    return (
      <TouchablePlatform
        style={[styles.button, style] as ViewStyle[]}
        highlightColor={'rgba(0,0,0,0.05)'}
        {...props}>
        {content}
      </TouchablePlatform>
    );
  },
);

const activityIndicatorColor = Colors.gray_disabled;

const ButtonIcon: FC<Pick<IProps, 'icon' | 'iconStyle' | 'platformIconProps'>> =
  memo(props => {
    if (props.icon != null) {
      return <Image source={props.icon} style={props.iconStyle} />;
    } else if (props.platformIconProps != null) {
      return <IconPlatform {...props.platformIconProps} />;
    } else {
      return null;
    }
  });

function getStyles(
  type: ButtonType,
  rounded?: boolean,
  disabled?: boolean | null,
): IStyles {
  switch (type) {
    case ButtonType.solid:
      return mergeStylesWithDisabled(
        rounded ? smallSolidStyles : solidStyles,
        disabled,
      );
    case ButtonType.outline:
      return mergeStylesWithDisabled(
        rounded ? smallOutlineStyles : outlineStyles,
        disabled,
        true,
      );
    case ButtonType.outlineNegative:
      return mergeStylesWithDisabled(
        rounded ? smallOutlineStyles : outlineNegativeStyles,
        disabled,
        true,
      );
    case ButtonType.borderless:
      return borderlessStyles;
    default:
      throw new Error('Unknown button type: ' + type);
  }
}

function mergeStylesWithDisabled(
  styles: IStyles,
  disabled?: boolean | null,
  outline?: boolean,
): IStyles {
  return disabled
    ? {
        ...styles,
        button: {
          ...styles.button,
          backgroundColor: Colors.gray_disabled,
          borderColor: outline ? Colors.teal100 : styles.button.borderColor,
          elevation: 0,
        } as ViewStyle,
        icon: {
          ...styles.icon,
          tintColor: Colors.gray,
        } as ImageStyle,
        label: {
          ...styles.label,
          color: Colors.black,
        } as TextStyle,
      }
    : styles;
}

interface IStyles {
  button: ViewStyle;
  icon: ImageStyle;
  label: TextStyle;
}

const commonButtonStyle: ViewStyle = {
  padding: CommonSizes.spacing.medium,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: CommonSizes.borderRadius.extraLargePlus,
  flexDirection: 'row',
  backgroundColor: Colors.transparent,
  width: '100%',
};

const commonLabelStyle: TextStyle = {
  ...CommonStyles.h4_bold,
  color: Colors.white,
  textAlign: 'center',
  textAlignVertical: 'center',
  ...Platform.select({
    android: {
      textTransform: 'uppercase',
    } as TextStyle,
  }),
};

const commonIcon: ImageStyle = {
  width: 22,
  height: 22,
  marginHorizontal: CommonSizes.spacing.extraSmall,
  resizeMode: 'contain',
  tintColor: Colors.blue100,
};

const solidStyles = StyleSheet.create({
  button: {
    ...commonButtonStyle,
    backgroundColor: NewColors.blueNormalActive,
  } as ViewStyle,
  label: {
    ...commonLabelStyle,
  } as TextStyle,
  icon: {
    ...commonIcon,
    tintColor: Colors.white,
  },
});

const outlineStyles = StyleSheet.create({
  button: {
    ...commonButtonStyle,
    borderColor: NewColors.blueNormalActive,
    borderWidth: 2,
  } as ViewStyle,
  label: {
    ...commonLabelStyle,
    color: NewColors.blueNormalActive,
  } as TextStyle,
  icon: {
    ...commonIcon,
    tintColor: Colors.blue100,
  } as ImageStyle,
});

const outlineNegativeStyles = StyleSheet.create({
  button: {
    ...commonButtonStyle,
    borderColor: Colors.red,
    borderWidth: 2,
  } as ViewStyle,
  label: {
    ...commonLabelStyle,
    color: Colors.red,
  } as TextStyle,
  icon: {
    ...commonIcon,
    tintColor: Colors.red,
  } as ImageStyle,
});

const borderlessStyles = StyleSheet.create({
  button: {
    ...commonButtonStyle,
    borderRadius: undefined,
    width: undefined,
    padding: undefined,
  } as ViewStyle,
  label: {
    ...commonLabelStyle,
    color: NewColors.blueNormalActive,
    textDecorationLine: 'underline',
  } as TextStyle,
  icon: {
    ...commonIcon,
    tintColor: Colors.blue100,
  } as ImageStyle,
});

const roundedButtonStyle: ViewStyle = {
  paddingHorizontal: CommonSizes.spacing.medium,
  paddingVertical: CommonSizes.spacing.extraSmall,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: CommonSizes.borderRadius.extraLarge,
  flexDirection: 'row',
  backgroundColor: Colors.transparent,
  width: 175,
};

const smallSolidStyles = StyleSheet.create({
  button: {
    ...roundedButtonStyle,
    backgroundColor: NewColors.blueNormalActive,
  } as ViewStyle,
  label: {
    ...CommonStyles.normalText,
  } as TextStyle,
  icon: {
    ...commonIcon,
  },
});

const smallOutlineStyles = StyleSheet.create({
  button: {
    ...roundedButtonStyle,
    borderColor: Colors.blue100,
    borderWidth: 1,
  } as ViewStyle,
  label: {
    ...CommonStyles.normalText,
    color: Colors.blue100,
  } as TextStyle,
  icon: {
    ...commonIcon,
    tintColor: Colors.blue100,
  } as ImageStyle,
});
