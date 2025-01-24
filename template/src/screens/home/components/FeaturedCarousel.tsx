import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Colors} from '../../../core/theme/colors';
import {CommonSizes} from '../../../core/theme/commonSizes';
import {CommonStyles} from '../../../core/theme/commonStyles';
import {CarouselItem} from '../types';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.85;

interface FeaturedCarouselProps {
  items: CarouselItem[];
}

export function FeaturedCarousel({items}: FeaturedCarouselProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({item}: {item: CarouselItem}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => item.onPress?.(item)}>
      <Image source={{uri: item.imageUrl}} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );

  const renderDot = (index: number) => (
    <View
      key={index}
      style={[styles.dot, index === activeIndex && styles.activeDot]}
    />
  );

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setActiveIndex(roundIndex);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={items}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        contentContainerStyle={styles.listContainer}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />
      <View style={styles.pagination}>
        {items.map((_, index) => renderDot(index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: (width - ITEM_WIDTH) / 2,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: CommonSizes.borderRadius.large,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: CommonSizes.borderRadius.large,
    padding: CommonSizes.spacing.large,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white,
    marginTop: CommonSizes.spacing.small,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: CommonSizes.spacing.medium,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.blue100,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
