import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';

interface CardScrollerProps<T> {
  data: T[];
  renderItem: (info: {item: T; index: number}) => React.ReactElement;
  cardWidth?: number;
}

const DEFAULT_CARD_WIDTH = 260;
const CARD_GAP = CommonSizes.spacing.medium;

/**
 * A horizontal, snap-to-card scroller. Cards are a fixed width with a uniform
 * gap between them and inset content padding. Fast deceleration + snapping
 * give a premium "shelf of cards" feel.
 */
export function CardScroller<T>({
  data,
  renderItem,
  cardWidth = DEFAULT_CARD_WIDTH,
}: CardScrollerProps<T>): JSX.Element {
  const renderCard = useCallback(
    ({item, index}: {item: T; index: number}) => (
      <View style={{width: cardWidth}}>{renderItem({item, index})}</View>
    ),
    [renderItem, cardWidth],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderCard}
      keyExtractor={(_, index) => `card-${index}`}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={cardWidth + CARD_GAP}
      snapToAlignment="start"
      decelerationRate="fast"
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.content}
    />
  );
}

function ItemSeparator(): JSX.Element {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: CommonSizes.spacing.large,
  },
  separator: {
    width: CARD_GAP,
  },
});
