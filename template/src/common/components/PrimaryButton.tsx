import React, {FC, memo} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  ImageURISource,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {ButtonType, TouchablePlatformProps} from '../../../types';
import {ColorTokens} from '../../core/theme/colors';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Fonts} from '../../core/theme/fonts';
import {Motion} from '../../core/theme/motion';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Icon, IconName} from './Icon';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface IProps extends TouchablePlatformProps {
  label: string;
  type: ButtonType;
  /** Control height 32 / 40 / 48. Mobile default is `lg`. */
  size?: ButtonSize;
  /**
   * Stretch to the container. Defaults to true except for link buttons; when
   * false the button's cross-axis placement follows the parent's `alignItems`.
   */
  fullWidth?: boolean;
  /** Leading Lucide glyph (see `Icon`), tinted with the label colour. */
  iconName?: IconName;
  /** Leading bitmap icon, used when `iconName` isn't set. */
  icon?: ImageURISource;
  iconStyle?: StyleProp<ImageStyle>;
  labelStyle?: TextStyle;
  isLoading?: boolean;
}

const SIZES = {
  sm: {
    height: CommonSizes.control.sm,
    paddingHorizontal: 10,
    fontSize: 13,
    gap: 6,
    icon: 16,
  },
  md: {
    height: CommonSizes.control.md,
    paddingHorizontal: 14,
    fontSize: 14,
    gap: 8,
    icon: 16,
  },
  lg: {
    height: CommonSizes.control.lg,
    paddingHorizontal: 20,
    fontSize: 15,
    gap: 8,
    icon: 20,
  },
};

function skin(
  c: ColorTokens,
  type: ButtonType,
  pressed: boolean,
): {container: ViewStyle; color: string} {
  switch (type) {
    case ButtonType.outline:
      return {
        container: {
          backgroundColor: pressed ? c.bgSubtle : c.surfaceCard,
          borderColor: pressed ? c.borderStrong : c.borderDefault,
        },
        color: c.textPrimary,
      };
    case ButtonType.ghost:
      return {
        container: {backgroundColor: pressed ? c.pressVeil : 'transparent'},
        color: c.textSecondary,
      };
    case ButtonType.danger:
      return {
        container: {backgroundColor: pressed ? c.dangerHover : c.danger},
        color: '#FFFFFF',
      };
    case ButtonType.borderless:
      return {
        container: {height: undefined, paddingHorizontal: 0},
        color: pressed ? c.accentActive : c.textAccent,
      };
    case ButtonType.solid:
    default:
      return {
        container: {backgroundColor: pressed ? c.accentActive : c.accent},
        color: c.textOnAccent,
      };
  }
}

export const PrimaryButton: FC<IProps> = memo(
  ({
    label,
    type,
    size = 'lg',
    fullWidth,
    iconName,
    icon,
    iconStyle,
    labelStyle,
    isLoading,
    style,
    disabled,
    ...props
  }) => {
    const {theme} = useTheme();
    const s = SIZES[size];
    const off = !!disabled || !!isLoading;
    const isLink = type === ButtonType.borderless;
    const stretch = fullWidth ?? !isLink;

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{disabled: off, busy: !!isLoading}}
        disabled={off}
        {...props}
        style={({pressed}) => {
          const k = skin(theme.colors, type, pressed && !off);
          return [
            styles.base,
            {
              height: s.height,
              paddingHorizontal: s.paddingHorizontal,
              gap: s.gap,
              opacity: off ? 0.45 : 1,
              transform: [
                {scale: pressed && !off && !isLink ? Motion.pressScale : 1},
              ],
            },
            stretch ? styles.fullWidth : undefined,
            k.container,
            style,
          ];
        }}>
        {({pressed}) => {
          const color = skin(theme.colors, type, pressed && !off).color;
          if (isLoading) {
            return <ActivityIndicator color={color} size="small" />;
          }
          return (
            <>
              {iconName != null ? (
                <Icon name={iconName} size={s.icon} color={color} />
              ) : icon != null ? (
                <Image
                  source={icon}
                  style={[
                    {width: s.icon, height: s.icon, tintColor: color},
                    styles.icon,
                    iconStyle,
                  ]}
                />
              ) : null}
              <Text
                numberOfLines={1}
                style={[
                  styles.label,
                  {
                    fontSize: s.fontSize,
                    letterSpacing: s.fontSize * -0.006,
                    color,
                  },
                  isLink && pressed ? styles.underline : undefined,
                  labelStyle,
                ]}>
                {label}
              </Text>
            </>
          );
        }}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CommonSizes.borderRadius.sm,
    borderWidth: CommonSizes.borderWidth.hairline,
    borderColor: 'transparent',
  },
  fullWidth: {alignSelf: 'stretch'},
  icon: {resizeMode: 'contain'},
  label: {fontFamily: Fonts.medium},
  underline: {textDecorationLine: 'underline'},
});
