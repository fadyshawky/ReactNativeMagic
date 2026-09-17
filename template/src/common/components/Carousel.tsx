import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  I18nManager,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Icon} from './Icon';
import {useTheme} from '../../core/theme/ThemeProvider';
import {useTranslation} from '../localization/LocalizationProvider';

interface CarouselProps<T> {
  data: T[];
  renderItem: (info: {item: T; index: number}) => React.ReactElement;
  height?: number;
}

const ARROW = 32;
const GAP = CommonSizes.spacing.medium;
const CONTENT_WIDTH =
  Dimensions.get('window').width - 2 * CommonSizes.spacing.large;
// Card width = content minus the two arrow gutters, so arrows sit BESIDE the
// card (in the side gutters), never overlapping it.
const ITEM_WIDTH = CONTENT_WIDTH - 2 * (ARROW + GAP);

// Horizontal scroll offsets are measured from the physical left edge on both
// platforms, but under RTL the list is laid out right to left (item 0 on the
// right), so the logical index runs the other way.
const toOffset = (index: number, count: number) =>
  (I18nManager.isRTL ? count - 1 - index : index) * ITEM_WIDTH;
const toIndex = (offset: number, count: number) => {
  const page = Math.round(offset / ITEM_WIDTH);
  return I18nManager.isRTL ? count - 1 - page : page;
};

/**
 * Horizontal paging carousel with the card flanked by prev/next arrow buttons
 * in the side gutters (never over the card), plus pagination dots below.
 * Active dot is wide + primary blue; the rest are small + muted.
 */
export function Carousel<T>({
  data,
  renderItem,
  height,
}: CarouselProps<T>): JSX.Element {
  const {theme} = useTheme();
  const t = useTranslation();
  const listRef = useRef<FlatList<T>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = data.length - 1;

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(index, data.length - 1));
      listRef.current?.scrollToOffset({
        offset: toOffset(next, data.length),
        animated: true,
      });
      setActiveIndex(next);
    },
    [data.length],
  );

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      setActiveIndex(toIndex(offsetX, data.length));
    },
    [data.length],
  );

  const renderCarouselItem = useCallback(
    ({item, index}: {item: T; index: number}) => (
      <View style={[styles.itemContainer, height != null ? {height} : null]}>
        {renderItem({item, index})}
      </View>
    ),
    [renderItem, height],
  );

  const prevDisabled = activeIndex <= 0;
  const nextDisabled = activeIndex >= lastIndex;
  const arrowColor = theme.colors.textSecondary;
  const disabledColor = theme.colors.textDisabled;

  const prevArrowStyle = {
    backgroundColor: theme.colors.surfaceCard,
    borderColor: theme.colors.borderDefault,
    opacity: prevDisabled ? 0.45 : 1,
  };
  const nextArrowStyle = {
    backgroundColor: theme.colors.surfaceCard,
    borderColor: theme.colors.borderDefault,
    opacity: nextDisabled ? 0.45 : 1,
  };

  return (
    <View>
      <View style={styles.row}>
        <Pressable
          onPress={() => goTo(activeIndex - 1)}
          disabled={prevDisabled}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={t('previous')}
          style={[styles.arrow, prevArrowStyle]}>
          <Icon
            name="chevron-left"
            size={CommonSizes.icon.sm}
            color={prevDisabled ? disabledColor : arrowColor}
          />
        </Pressable>

        <FlatList
          ref={listRef}
          data={data}
          renderItem={renderCarouselItem}
          keyExtractor={(_, index) => `carousel-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          snapToAlignment="start"
          decelerationRate="fast"
          disableIntervalMomentum
          onMomentumScrollEnd={onMomentumScrollEnd}
          style={styles.list}
        />

        <Pressable
          onPress={() => goTo(activeIndex + 1)}
          disabled={nextDisabled}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={t('next')}
          style={[styles.arrow, nextArrowStyle]}>
          <Icon
            name="chevron-right"
            size={CommonSizes.icon.sm}
            color={nextDisabled ? disabledColor : arrowColor}
          />
        </Pressable>
      </View>

      <View style={styles.dotsRow}>
        {data.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <View
              key={`dot-${index}`}
              style={[
                styles.dot,
                isActive ? styles.dotActive : styles.dotInactive,
                {
                  backgroundColor: isActive
                    ? theme.colors.accent
                    : theme.colors.borderStrong,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
  list: {width: ITEM_WIDTH, flexGrow: 0},
  itemContainer: {width: ITEM_WIDTH},
  arrow: {
    width: ARROW,
    height: ARROW,
    borderRadius: CommonSizes.borderRadius.sm,
    borderWidth: CommonSizes.borderWidth.hairline,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: GAP / 2,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: CommonSizes.spacing.large,
  },
  dot: {
    height: 6,
    borderRadius: CommonSizes.borderRadius.full,
    marginHorizontal: CommonSizes.spacing.small,
  },
  dotActive: {width: 18},
  dotInactive: {width: 6},
});
