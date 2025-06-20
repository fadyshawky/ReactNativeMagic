import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {createThemedStyles} from '../../core/theme/commonStyles';
import {scaleHeight, scaleWidth} from '../../core/theme/scaling';
import {useTheme} from '../../core/theme/ThemeProvider';
import FastImage from '@d11/react-native-fast-image';

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
        {backgroundColor: theme.colors.surface},
        createThemedStyles(theme).dropShadow,
        {marginRight: marginRight},
        {overflow: 'hidden'},
        cardStyle,
      ]}
      onPress={() => {
        onPress?.();
      }}>
      <View style={styles.iconContainer}>
        {icon && icon.uri && (
          <FastImage
            source={{uri: icon.uri, cache: FastImage.cacheControl.immutable}}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      </View>
      <Text style={[theme.text.cards, {textAlign: 'center'}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: CommonSizes.spacing.md,
    borderRadius: CommonSizes.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: scaleHeight(10),
    width: scaleWidth(187),
    height: scaleHeight(280),
  },
  blurContainer: {
    flex: 1,
    padding: CommonSizes.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: '100%',
    height: scaleHeight(100),
  },
  title: {
    fontSize: CommonSizes.font.medium,
    textAlign: 'center',
    marginBottom: CommonSizes.spacing.sm,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  whiteDropShadow: {
    // iOS shadow
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    // Android shadow
    elevation: 5,
    // Add a very subtle border to enhance the white shadow effect
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  favoriteContainer: {
    position: 'absolute',
    top: scaleHeight(17),
    left: scaleWidth(12),
  },
});
