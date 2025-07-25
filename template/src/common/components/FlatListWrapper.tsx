import React, {FC, useMemo} from 'react';
import {FlatList, FlatListProps} from 'react-native';
import {LoadState} from '../../../types';
import {TryAgain} from './TryAgain';
import {Separator} from './Separator';
import {EmptyView} from './EmptyView';
import {LoadingComponent} from './LoadingComponent';
import {localization} from '../localization/localization';
import {defaultKeyIdExtractor} from '../helpers/defaultKeyIdExtractor';
import {CommonStyles} from '../../core/theme/commonStyles';

interface IProps extends FlatListProps<any> {
  loadState: LoadState;
  tryAgain?: () => void;
  error?: string | null;
}

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
      <FlatList
        contentContainerStyle={CommonStyles.listContentContainer}
        {...FlatListWrapperProps}
        {...props}
        refreshing={refreshing}
        ListEmptyComponent={ListEmptyComponent}
        removeClippedSubviews={true}
      />
    );
  }
}
