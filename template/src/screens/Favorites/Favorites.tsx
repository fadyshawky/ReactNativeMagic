import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Container} from '../../common/components/Container';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {ImageResources} from '../../common/ImageResources.g';
import {
  useRTL,
  useTranslation,
} from '../../common/localization/LocalizationProvider';
import {setSelectedProvider} from '../../core/store/Providers/providersSlice';
import {ServiceProvider} from '../../core/store/Providers/providersState';
import {useAppDispatch, useAppSelector} from '../../core/store/reduxHelpers';
import {RootState} from '../../core/store/rootReducer';
import {CommonSizes} from '../../core/theme/commonSizes';
import {scaleHeight} from '../../core/theme/scaling';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Header} from '../../navigation/HeaderComponents';
import {RootStackParamList} from '../../navigation/types';

export function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const {favoriteProviders = []} = useAppSelector(
    (state: RootState) => state.user,
  );
  const {favoriteCategories = []} = useAppSelector(
    (state: RootState) => state.user,
  );
  const {providers} = useAppSelector((state: RootState) => state.providers);
  const {categories} = useAppSelector((state: RootState) => state.categories);
  const t = useTranslation();
  const isRTL = useRTL();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const scroll = useRef<KeyboardAwareScrollView>(null);

  const navigateToServices = useCallback(
    (provider: ServiceProvider) => {
      dispatch(setSelectedProvider(provider));
      navigation.navigate('Services', {
        providerID: provider?.id?.toString() as string,
      });
    },
    [dispatch, navigation],
  );

  return (
    <Container
      ref={scroll}
      testID={'FavoritesScreenID'}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      backgroundImage={ImageResources[`${theme.mode}_background_1`]}
      withoutPadding
      backgroundColor={theme.colors.background}>
      <Header />

      <RTLAwareView style={styles.sectionHeader}>
        <RTLAwareText style={theme.text.header2}>
          {t('favoriteCategories', 'common')}
        </RTLAwareText>
      </RTLAwareView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: scaleHeight(150),
    borderTopRightRadius: CommonSizes.spacing.large,
    borderTopLeftRadius: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.medium,
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
  sectionHeader: {
    width: '90%',
    marginVertical: CommonSizes.spacing.medium,
  },
  carouselContainer: {
    height: scaleHeight(570),
    width: '100%',
  },
  gridPage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: CommonSizes.spacing.large,
    overflow: 'hidden',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: CommonSizes.spacing.small,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cccccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#666666',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  emptyContainer: {
    height: scaleHeight(150),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
