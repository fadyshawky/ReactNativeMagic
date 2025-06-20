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
import {useTheme} from '../../core/theme/ThemeProvider';
import {createThemedStyles} from '../../core/theme/commonStyles';
import {Theme} from '../../core/theme/types';
import {IconPlatform} from './IconPlatform';
import {TouchablePlatform} from './TouchablePlatform';
import {scaleHeight, scaleSpacing} from '../../core/theme/scaling';
import {CommonSizes} from '../../core/theme/commonSizes';

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
    const {theme} = useTheme();
    const styles = useMemo(() => {
      return getStyles(theme, type, rounded, props.disabled);
    }, [theme, type, rounded, props.disabled]);

    const content = useMemo(() => {
      if (isLoading) {
        return (
          <ActivityIndicator
            animating={true}
            color={theme.colors.grayScale_50}
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
      theme,
    ]);

    return (
      <TouchablePlatform
        style={[styles.button, style] as ViewStyle[]}
        highlightColor={theme.colors.grayScale_50}
        {...props}>
        {content}
      </TouchablePlatform>
    );
  },
);

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
  theme: Theme,
  type: ButtonType,
  rounded?: boolean,
  disabled?: boolean | null,
): IStyles {
  const baseStyles = createButtonStyles(theme);

  switch (type) {
    case ButtonType.solid:
      return mergeStylesWithDisabled(
        theme,
        rounded ? createSmallSolidStyles(theme) : baseStyles.solid,
        disabled,
      );
    case ButtonType.outline:
      return mergeStylesWithDisabled(
        theme,
        rounded ? createSmallOutlineStyles(theme) : baseStyles.outline,
        disabled,
        true,
      );
    case ButtonType.outlineNegative:
      return mergeStylesWithDisabled(
        theme,
        rounded ? createSmallOutlineStyles(theme) : baseStyles.outlineNegative,
        disabled,
        true,
      );
    case ButtonType.borderless:
      return baseStyles.borderless;
    default:
      throw new Error('Unknown button type: ' + type);
  }
}

function mergeStylesWithDisabled(
  theme: Theme,
  styles: IStyles,
  disabled?: boolean | null,
  outline?: boolean,
): IStyles {
  if (!disabled) return styles;

  return {
    ...styles,
    button: {
      ...styles.button,
      backgroundColor: theme.colors.grayScale_50,
      borderColor: outline
        ? theme.colors.grayScale_50
        : styles.button.borderColor,
      elevation: 0,
    } as ViewStyle,
    icon: {
      ...styles.icon,
      tintColor: theme.colors.grayScale_50,
    } as ImageStyle,
    label: {
      ...styles.label,
      color: theme.colors.grayScale_50,
    } as TextStyle,
  };
}

interface IStyles {
  button: ViewStyle;
  icon: ImageStyle;
  label: TextStyle;
}

function createButtonStyles(theme: Theme) {
  const commonButtonStyle: ViewStyle = {
    height: scaleHeight(97),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
  };

  const commonLabelStyle: TextStyle = {
    ...createThemedStyles(theme).h4_bold,
    color: theme.colors.grayScale_0,
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
    marginHorizontal: scaleSpacing(12),
    resizeMode: 'contain',
    tintColor: theme.colors.PlatinateBlue_700,
  };

  return {
    solid: StyleSheet.create({
      button: {
        ...commonButtonStyle,
        backgroundColor: theme.colors.PlatinateBlue_700,
      } as ViewStyle,
      label: theme.text.button,
      icon: {
        ...commonIcon,
        tintColor: theme.colors.grayScale_0,
      },
    }),

    outline: StyleSheet.create({
      button: {
        ...commonButtonStyle,
        borderColor: theme.colors.PlatinateBlue_700,
        borderWidth: 2,
      } as ViewStyle,
      label: {
        ...theme.text.button,
      } as TextStyle,
      icon: commonIcon,
    }),

    outlineNegative: StyleSheet.create({
      button: {
        ...commonButtonStyle,
        borderColor: theme.colors.PlatinateBlue_700,
        borderWidth: 2,
      } as ViewStyle,
      label: {
        ...theme.text.button,
      } as TextStyle,
      icon: {
        ...commonIcon,
        tintColor: theme.colors.PlatinateBlue_700,
      },
    }),

    borderless: StyleSheet.create({
      button: {
        ...commonButtonStyle,
        borderRadius: undefined,
        width: undefined,
        padding: undefined,
      } as ViewStyle,
      label: {
        ...theme.text.hyperlink,
      } as TextStyle,
      icon: commonIcon,
    }),
  };
}

function createSmallSolidStyles(theme: Theme): IStyles {
  const commonStyles = createThemedStyles(theme);
  return StyleSheet.create({
    button: {
      padding: CommonSizes.spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: CommonSizes.borderRadius.xl,
      flexDirection: 'row',
      backgroundColor: theme.colors.PlatinateBlue_700,
      // width: 175,
    } as ViewStyle,
    label: {
      ...theme.text.button,
    } as TextStyle,
    icon: {
      width: 22,
      height: 22,
      resizeMode: 'contain',
      tintColor: theme.colors.grayScale_0,
    } as ImageStyle,
  });
}

function createSmallOutlineStyles(theme: Theme): IStyles {
  const commonStyles = createThemedStyles(theme);
  return StyleSheet.create({
    button: {
      padding: CommonSizes.spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: CommonSizes.borderRadius.xl,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      width: 175,
      borderColor: theme.colors.PlatinateBlue_700,
      borderWidth: 1,
    } as ViewStyle,
    label: {
      ...commonStyles.normalText,
      color: theme.colors.PlatinateBlue_700,
    } as TextStyle,
    icon: {
      width: 22,
      height: 22,
      resizeMode: 'contain',
      tintColor: theme.colors.PlatinateBlue_700,
    } as ImageStyle,
  });
}
