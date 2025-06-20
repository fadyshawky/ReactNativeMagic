import React from 'react';
import {
  Image,
  ImageStyle,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../../core/theme/colors';
import {CommonSizes} from '../../../core/theme/commonSizes';
import {CarouselItem} from '../types';

interface CarouselSectionProps {
  items: CarouselItem[];
  imageStyle?: ImageStyle;
}

export function CarouselSection({
  items,
  imageStyle,
}: CarouselSectionProps): JSX.Element {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={styles.itemContainer}
          onPress={() => item.onPress?.(item)}>
          <Image
            source={{uri: item.imageUrl}}
            style={[styles.image, imageStyle]}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            {item.subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {item.subtitle}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: CommonSizes.spacing.lg,
  },
  itemContainer: {
    marginRight: CommonSizes.spacing.md,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: CommonSizes.borderRadius.md,
  },
  textContainer: {
    marginTop: CommonSizes.spacing.sm,
  },
  title: {
    fontSize: CommonSizes.font.medium,
    fontWeight: '600',
    color: Colors.blueDarker,
  },
  subtitle: {
    fontSize: CommonSizes.font.small,
    color: Colors.blueDarker,
    marginTop: 2,
  },
});
