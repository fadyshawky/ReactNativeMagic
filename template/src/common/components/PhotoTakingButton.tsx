import React, {FC, Fragment, memo, ReactNode} from 'react';
import {
  Image,
  ImageBackground,
  ImageStyle,
  ImageURISource,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Image as CropperImage} from 'react-native-image-crop-picker';
import {CommonSizes} from '../../core/theme/commonSizes';

interface IProps {
  onPress?: () => void;
  icon?: ImageURISource;
  backgroundImage?: ImageURISource | CropperImage | null;
  style?: ViewStyle;
  iconStyle?: ImageStyle;
  imageStyle?: ImageStyle;
  disabled?: boolean;
}

export const PhotoTakingButton: FC<IProps> = memo(
  ({
    icon,
    onPress,
    backgroundImage,
    style,
    iconStyle,
    imageStyle,
    disabled,
  }) => {
    return (
      <TouchableOpacity
        style={[styles.button, style]}
        onPressIn={onPress}
        disabled={disabled}>
        <BackgroundComponent image={backgroundImage} style={imageStyle}>
          <Image style={[styles.icon, iconStyle]} source={icon!} />
        </BackgroundComponent>
      </TouchableOpacity>
    );
  },
);

interface IBackgroundComponentProps {
  image?: ImageURISource | null;
  style?: ImageStyle;
  children?: ReactNode;
}

const BackgroundComponent: FC<IBackgroundComponentProps> = memo(
  ({image, children, style}) => {
    if (image != null) {
      return (
        <ImageBackground
          source={image}
          style={[styles.image, style]}
          imageStyle={[styles.image, style]}>
          {children}
        </ImageBackground>
      );
    } else {
      return <Fragment>{children}</Fragment>;
    }
  },
);

const styles = StyleSheet.create({
  button: {
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CommonSizes.borderRadius.small,
    borderWidth: 1,
  } as ViewStyle,
  image: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CommonSizes.borderRadius.small,
    overflow: 'hidden',
  } as ImageStyle,
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    opacity: 0.8,
  } as ImageStyle,
});
