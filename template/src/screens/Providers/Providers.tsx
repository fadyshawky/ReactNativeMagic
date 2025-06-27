import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoadState} from '../../../types';
import {Card} from '../../common/components/Cards';
import {Container} from '../../common/components/Container';
import {FlatListWrapper} from '../../common/components/FlatListWrapper';
import {ImageResources} from '../../common/ImageResources.g';
import {
  resetProviders,
  setSelectedProvider,
} from '../../core/store/Providers/providersSlice';
import {ServiceProvider} from '../../core/store/Providers/providersState';
import {useAppDispatch} from '../../core/store/reduxHelpers';
import {CommonSizes} from '../../core/theme/commonSizes';
import {scaleHeight, scaleWidth} from '../../core/theme/scaling';
import {useTheme} from '../../core/theme/ThemeProvider';
import {HeaderBack} from '../../navigation/HeaderComponents';
import {RootStackParamList} from '../../navigation/types';
import {useProvidersData} from './hooks/useProvidersData';

export function Providers(): JSX.Element {
  const dispatch = useAppDispatch();
  const {categoryID} =
    useRoute<RouteProp<RootStackParamList, 'Providers'>>().params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {fetchData, providers, isLoading} = useProvidersData(categoryID);
  const {theme} = useTheme();
  const scroll = useRef<KeyboardAwareScrollView>(null);

  function navigateToServices(provider: ServiceProvider) {
    dispatch(setSelectedProvider(provider));
    navigation.navigate('Services', {
      providerID:
        provider?.provider === 'Fawry'
          ? (provider?.BillerId?.toString() as string)
          : (provider?.id?.toString() as string),
    });
  }
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  return (
    <Container
      ref={scroll}
      testID={'ProvidersScreenID'}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      backgroundImage={ImageResources[`${theme.mode}_background_1`]}
      withoutPadding
      withoutScroll
      backgroundColor={theme.colors.background}>
      {isLoading ? (
        <SkypeIndicator size={80} color={theme.colors.mutedLavender} />
      ) : (
        <>
          <HeaderBack
            onPress={() => {
              dispatch(resetProviders());
              navigation.goBack();
            }}
          />

          <FlatListWrapper
            contentContainerStyle={{
              alignItems: 'flex-start',
              paddingBottom: scaleHeight(50),
              paddingLeft: CommonSizes.spacing.medium,
            }}
            style={{
              flex: 1,
              alignSelf: 'flex-start',
            }}
            ItemSeparatorComponent={() => (
              <View style={{height: CommonSizes.spacing.large}} />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            loadState={LoadState.needLoad}
            data={providers}
            numColumns={3}
            renderItem={({item, index}) => {
              return (
                <Card
                  cardStyle={{
                    width: scaleWidth(187),
                    height: scaleHeight(260),
                  }}
                  key={item.id}
                  icon={{uri: item.img_url}}
                  title={item.name || item?.BillerName}
                  onPress={() => {
                    navigateToServices(item);
                  }}
                  marginRight={
                    (index % 3) + 1 !== 3
                      ? CommonSizes.spacing.medium
                      : undefined
                  }
                />
              );
            }}
          />
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderTopRightRadius: CommonSizes.spacing.large,
    borderTopLeftRadius: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.large,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
  },
  searchBar: {
    width: '90%',
    alignSelf: 'center',
    marginTop: CommonSizes.spacing.medium,
  },
  formContainer: {
    alignItems: 'center',
    paddingHorizontal: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.large,
  },
  balanceSection: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: CommonSizes.spacing.large,
  },
  seeMoreSection: {
    alignItems: 'center',
    gap: CommonSizes.spacing.large,
    alignSelf: 'center',
  },
  sectionImage: {
    width: scaleWidth(120),
    height: scaleHeight(70),
  },
  amountText: {
    textAlign: 'left',
  },
  balanceCard: {
    width: '100%',
    borderRadius: CommonSizes.spacing.huge,
  },
});
