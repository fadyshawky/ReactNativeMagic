import {useState, useEffect} from 'react';
import {CarouselItem} from '../types';

export function useHomeData() {
  const [isLoading, setIsLoading] = useState(false);
  const [featuredItems, setFeaturedItems] = useState<CarouselItem[]>([]);
  const [trendingItems, setTrendingItems] = useState<CarouselItem[]>([]);
  const [newItems, setNewItems] = useState<CarouselItem[]>([]);
  const [recommendedItems, setRecommendedItems] = useState<CarouselItem[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      // Replace with actual API calls in production
      setFeaturedItems([
        {
          id: '1',
          title: 'Featured Item 1',
          subtitle: 'Discover amazing features',
          imageUrl: 'https://picsum.photos/800/400',
        },
        // Add more items...
      ]);

      setTrendingItems([
        {
          id: '1',
          title: 'Trending Item 1',
          subtitle: 'Hot right now',
          imageUrl: 'https://picsum.photos/700/400',
        },
        // Add more items...
      ]);

      // Similar for newItems and recommendedItems...
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    isLoading,
    featuredItems,
    trendingItems,
    newItems,
    recommendedItems,
    refreshData,
  };
}
