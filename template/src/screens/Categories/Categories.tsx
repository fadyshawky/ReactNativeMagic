import {useIsFocused, useNavigation} from '@react-navigation/native';
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
import {useTranslation} from '../../common/localization/LocalizationProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {scaleHeight, scaleWidth} from '../../core/theme/scaling';
import {useTheme} from '../../core/theme/ThemeProvider';
import {HeaderBack} from '../../navigation/HeaderComponents';
import {RootStackParamList} from '../../navigation/types';
import {useCategoriesData} from './hooks/useCategoriesData';
import {setSelectedCategory} from '../../core/store/Categories/categorySlice';
import {useAppDispatch} from '../../core/store/reduxHelpers';

export function Categories(): JSX.Element {
  const {isLoading, fetchData, categories} = useCategoriesData();
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const scroll = useRef<KeyboardAwareScrollView>(null);
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFocused && categories.length === 0) {
      fetchData();
    }
  }, [isFocused]);

  return (
    <Container
      ref={scroll}
      testID={'CategoriesScreenID'}
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
          <HeaderBack onPress={navigation.goBack} />
          <FlatListWrapper
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: scaleHeight(50),
            }}
            style={{
              flex: 1,
              alignSelf: 'center',
            }}
            ItemSeparatorComponent={() => (
              <View style={{height: CommonSizes.spacing.large}} />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            loadState={
              isLoading ? LoadState['loadingMore'] : LoadState['pullToRefresh']
            }
            data={categories}
            numColumns={3}
            renderItem={({item, index}) => (
              <Card
                cardStyle={{
                  width: scaleWidth(187),
                  height: scaleHeight(260),
                }}
                key={item.id}
                icon={{uri: item.img_url}}
                title={item.name}
                onPress={() => {
                  dispatch(setSelectedCategory(item));
                  navigation.navigate('Providers', {
                    categoryID: item?.id?.toString(),
                  });
                }}
                marginRight={
                  (index % 3) + 1 !== 3 ? CommonSizes.spacing.medium : undefined
                }
              />
            )}
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
