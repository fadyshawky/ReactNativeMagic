export interface CarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  onPress?: (item: CarouselItem) => void;
}
