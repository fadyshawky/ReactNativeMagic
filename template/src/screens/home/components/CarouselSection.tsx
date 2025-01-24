import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageStyle,
  Text,
} from 'react-native';
import {CommonSizes} from '../../../core/theme/commonSizes';
import {CommonStyles} from '../../../core/theme/commonStyles';
import {CarouselItem} from '../types';
import {Colors} from '../../../core/theme/colors';

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
    paddingHorizontal: CommonSizes.spacing.large,
  },
  itemContainer: {
    marginRight: CommonSizes.spacing.medium,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: CommonSizes.borderRadius.medium,
  },
  textContainer: {
    marginTop: CommonSizes.spacing.small,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.blue100,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.blue100,
    marginTop: 2,
  },
});
