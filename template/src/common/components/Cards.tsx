import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {scaleHeight, scaleWidth} from '../../core/theme/scaling';
import {useTheme} from '../../core/theme/ThemeProvider';
import FastImage, {FastImageProps} from '@d11/react-native-fast-image';

interface CardProps {
  icon: {uri: string};
  title: string;
  onPress?: () => void;
  marginRight?: number;
  cardStyle?: ViewStyle;
}

export const Card = ({
  icon,
  title,
  onPress,
  marginRight,
  cardStyle,
}: CardProps): JSX.Element => {
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surfaceCard,
          borderColor: theme.colors.borderDefault,
          boxShadow: theme.shadows.sm,
        },
        {marginRight: marginRight},
        styles.cardOverflowHidden,
        cardStyle,
      ]}
      onPress={() => {
        onPress?.();
      }}>
      <View style={styles.iconContainer}>
        {icon && icon.uri && (
          <FastImage
            source={{uri: icon.uri, cache: FastImage.cacheControl.immutable}}
            // FastImage 8.13 types build ImageStyle on `FlexStyle`, which RN 0.87
            // no longer exports, so width/height are missing from its typings.
            style={styles.fastImage as FastImageProps['style']}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      </View>
      <Text style={[theme.text.h4, styles.titleCentered]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: CommonSizes.layout.cardPadding.sm,
    borderRadius: CommonSizes.borderRadius.lg,
    borderWidth: CommonSizes.borderWidth.hairline,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: CommonSizes.layout.related,
    width: scaleWidth(187),
    height: scaleHeight(280),
  },
  cardOverflowHidden: {
    overflow: 'hidden',
  },
  fastImage: {
    width: '100%',
    height: '100%',
  },
  titleCentered: {
    textAlign: 'center',
  },
  iconContainer: {
    width: '100%',
    height: scaleHeight(100),
  },
  favoriteContainer: {
    position: 'absolute',
    top: scaleHeight(17),
    left: scaleWidth(12),
  },
});
