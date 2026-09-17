import React, {useMemo} from 'react';
import {FlashList, FlashListProps} from '@shopify/flash-list';
import {LoadState} from '../../../types';
import {TryAgain} from './TryAgain';
import {Separator} from './Separator';
import {EmptyView} from './EmptyView';
import {LoadingComponent} from './LoadingComponent';
import {localization} from '../localization/localization';
import {defaultKeyIdExtractor} from '../helpers/defaultKeyIdExtractor';
import {CommonSizes} from '../../core/theme/commonSizes';
import {StyleSheet} from 'react-native';

interface IProps extends FlashListProps<any> {
  loadState: LoadState;
  tryAgain?: () => void;
  error?: string | null;
}

// Shared FlashList defaults. Tune estimatedItemSize per-screen for long/heavy lists.
const FlatListWrapperProps = {
  keyExtractor: defaultKeyIdExtractor,
  ListEmptyComponent: (
    <EmptyView
      title={localization.empty.noData}
      description={localization.empty.checkThisPageLater}
    />
  ),
  onEndReachedThreshold: 1,
  ItemSeparatorComponent: Separator,
};

export function FlatListWrapper({
  loadState,
  tryAgain,
  error,
  ...props
}: IProps) {
  const ListEmptyComponent = useMemo(() => {
    if (loadState === LoadState.error) {
      return (
        <TryAgain
          onPress={tryAgain}
          errorText={error || localization.errors.listErrorTitle}
        />
      );
    } else {
      return props.ListEmptyComponent;
    }
  }, [loadState, props.ListEmptyComponent, error, tryAgain]);

  const refreshing = useMemo(() => {
    return loadState === LoadState.pullToRefresh;
  }, [loadState]);

  if (loadState === LoadState.firstLoad) {
    return <LoadingComponent />;
  } else {
    return (
      <FlashList
        contentContainerStyle={styles.content}
        {...FlatListWrapperProps}
        {...props}
        refreshing={refreshing}
        ListEmptyComponent={ListEmptyComponent}
      />
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: CommonSizes.layout.gutter,
    paddingVertical: CommonSizes.spacing.medium,
  },
});
