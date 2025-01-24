import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  Text,
} from 'react-native';
import {Colors} from '../../core/theme/colors';
import {CommonSizes} from '../../core/theme/commonSizes';
import {CommonStyles} from '../../core/theme/commonStyles';
import {CarouselSection} from './components/CarouselSection';
import {FeaturedCarousel} from './components/FeaturedCarousel';
import {useHomeData} from './hooks/useHomeData';

const {width} = Dimensions.get('window');

export function HomeScreen(): JSX.Element {
  const {
    featuredItems,
    trendingItems,
    newItems,
    recommendedItems,
    isLoading,
    refreshData,
  } = useHomeData();

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refreshData} />
      }>
      <View style={styles.content}>
        {/* Featured Section */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <FeaturedCarousel items={featuredItems} />
        </View>

        {/* Trending Section */}
        <View style={styles.carouselSection}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <CarouselSection
            items={trendingItems}
            imageStyle={styles.trendingImage}
          />
        </View>

        {/* New Arrivals Section */}
        <View style={styles.carouselSection}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <CarouselSection
            items={newItems}
            imageStyle={styles.newArrivalsImage}
          />
        </View>

        {/* Recommended Section */}
        <View style={styles.carouselSection}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <CarouselSection
            items={recommendedItems}
            imageStyle={styles.recommendedImage}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingVertical: CommonSizes.spacing.medium,
  },
  featuredSection: {
    marginBottom: CommonSizes.spacing.large,
  },
  carouselSection: {
    marginBottom: CommonSizes.spacing.large,
  },
  sectionTitle: {
    ...CommonStyles.h2_semiBold,
    marginHorizontal: CommonSizes.spacing.large,
    marginBottom: CommonSizes.spacing.medium,
  },
  trendingImage: {
    width: width * 0.7,
    height: 200,
    borderRadius: CommonSizes.borderRadius.medium,
  },
  newArrivalsImage: {
    width: width * 0.5,
    height: 180,
    borderRadius: CommonSizes.borderRadius.medium,
  },
  recommendedImage: {
    width: width * 0.6,
    height: 160,
    borderRadius: CommonSizes.borderRadius.medium,
  },
});
