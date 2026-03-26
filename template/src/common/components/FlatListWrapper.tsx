import React, {FC, useMemo} from 'react';
import {FlashList, FlashListProps} from '@shopify/flash-list';
import {LoadState} from '../../../types';
import {TryAgain} from './TryAgain';
import {Separator} from './Separator';
import {EmptyView} from './EmptyView';
import {LoadingComponent} from './LoadingComponent';
import {localization} from '../localization/localization';
import {defaultKeyIdExtractor} from '../helpers/defaultKeyIdExtractor';
import {CommonStyles} from '../../core/theme/commonStyles';

interface IProps extends FlashListProps<any> {
  loadState: LoadState;
  tryAgain?: () => void;
  error?: string | null;
}

// Shared FlashList defaults. Tune estimatedItemSize per-screen for long/heavy lists.
const FlatListWrapperProps = {
  keyExtractor: defaultKeyIdExtractor,
  estimatedItemSize: 72,
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
    if (loadState == LoadState.error) {
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
    return loadState == LoadState.pullToRefresh;
  }, [loadState]);

  if (loadState == LoadState.firstLoad) {
    return <LoadingComponent />;
  } else {
    return (
      <FlashList
        contentContainerStyle={CommonStyles.listContentContainer}
        {...FlatListWrapperProps}
        {...props}
        refreshing={refreshing}
        ListEmptyComponent={ListEmptyComponent}
      />
    );
  }
}
