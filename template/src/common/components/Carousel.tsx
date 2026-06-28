import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';

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

function Chevron({dir, color}: {dir: 'left' | 'right'; color: string}) {
  const d = dir === 'left' ? 'M15 5 L8 12 L15 19' : 'M9 5 L16 12 L9 19';
  return (
    <Svg width={18} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d={d}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

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
  const listRef = useRef<FlatList<T>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = data.length - 1;

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(index, data.length - 1));
      listRef.current?.scrollToOffset({
        offset: next * ITEM_WIDTH,
        animated: true,
      });
      setActiveIndex(next);
    },
    [data.length],
  );

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      setActiveIndex(Math.round(offsetX / ITEM_WIDTH));
    },
    [],
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
  const arrowColor = theme.colors.PlatinateBlue_400;
  const disabledColor = theme.colors.grayScale_100;

  const prevArrowStyle = {
    backgroundColor: theme.colors.grayScale_0,
    borderColor: theme.colors.grayScale_50,
    opacity: prevDisabled ? 0.4 : 1,
  };
  const nextArrowStyle = {
    backgroundColor: theme.colors.grayScale_0,
    borderColor: theme.colors.grayScale_50,
    opacity: nextDisabled ? 0.4 : 1,
  };

  return (
    <View>
      <View style={styles.row}>
        <Pressable
          onPress={() => goTo(activeIndex - 1)}
          disabled={prevDisabled}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Previous"
          style={[styles.arrow, prevArrowStyle]}>
          <Chevron dir="left" color={prevDisabled ? disabledColor : arrowColor} />
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
          accessibilityLabel="Next"
          style={[styles.arrow, nextArrowStyle]}>
          <Chevron
            dir="right"
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
                    ? theme.colors.PlatinateBlue_400
                    : theme.colors.grayScale_50,
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
    borderRadius: CommonSizes.borderRadius.full,
    borderWidth: CommonSizes.borderWidth.small,
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
