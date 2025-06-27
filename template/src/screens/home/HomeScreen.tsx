import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {Image, ImageURISource, StyleSheet, View, ViewStyle} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonType} from '../../../types';
import {Card} from '../../common/components/Cards';
import {Container} from '../../common/components/Container';
import {FlatListWrapper} from '../../common/components/FlatListWrapper';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {ImageResources} from '../../common/ImageResources.g';
import {
  useRTL,
  useTranslation,
} from '../../common/localization/LocalizationProvider';
import {
  clearSelectedCategory,
  setSelectedCategory,
} from '../../core/store/Categories/categorySlice';
import {Category} from '../../core/store/Categories/categoryState';
import {setSelectedProvider} from '../../core/store/Providers/providersSlice';
import {ServiceProvider} from '../../core/store/Providers/providersState';
import {useAppDispatch, useAppSelector} from '../../core/store/reduxHelpers';
import {RootState} from '../../core/store/rootReducer';
import {UserStatus} from '../../core/store/user/userState';
import {CommonSizes} from '../../core/theme/commonSizes';
import {scaleHeight, scaleWidth} from '../../core/theme/scaling';
import {useTheme} from '../../core/theme/ThemeProvider';
import {HomeHeader} from '../../navigation/HeaderComponents';
import {RootStackParamList} from '../../navigation/types';
import {useHomeData} from './hooks/useHomeData';
import {PayByCode} from './Components/PayByCode';

// Props for balance section component
interface BalanceSectionProps {
  title: string;
  image: ImageURISource;
  amount?: string;
  style?: ViewStyle;
}

// Balance section component
function BalanceSections({
  title,
  image,
  amount,
  style,
}: BalanceSectionProps): JSX.Element {
  const {theme} = useTheme();
  const t = useTranslation();

  return (
    <View style={[styles.balanceSection, style]}>
      <Image
        style={{...styles.sectionImage, tintColor: theme.colors.tintColor}}
        source={image}
        resizeMode="contain"
      />
      <RTLAwareText style={[theme.text.balanceAmount, styles.amountText]}>
        <RTLAwareText style={theme.text.balanceLabel}>
          {t('currency') + '\n'}
        </RTLAwareText>
        {amount}
      </RTLAwareText>
      <RTLAwareText style={theme.text.balanceTitle}>{title}</RTLAwareText>
    </View>
  );
}

// Props for see more section component
interface SeeMoreSectionProps {
  title: string;
  image: ImageURISource;
  style?: ViewStyle;
}

// See more section component
function SeeMoreSection({
  title,
  image,
  style,
}: SeeMoreSectionProps): JSX.Element {
  const {theme} = useTheme();
  return (
    <View style={[styles.seeMoreSection, style]}>
      <RTLAwareText style={theme.text.balanceTitle}>{title}</RTLAwareText>
      <Image
        style={{...styles.sectionImage, tintColor: theme.colors.tintColor}}
        source={image}
        resizeMode="contain"
      />
    </View>
  );
}

// Balance card component
function BalanceCard(): JSX.Element {
  const {theme} = useTheme();
  const t = useTranslation();
  const isRTL = useRTL();
  const {current_balance, daily_commission} = useAppSelector(
    (state: RootState) => state.user,
  );

  return (
    <RTLAwareView
      style={[
        styles.balanceCard,
        {backgroundColor: theme.colors.balanceBackground},
      ]}>
      <RTLAwareView
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingVertical: CommonSizes.spacing.large,
        }}>
        <BalanceSections
          title={t('currentBalance', 'home')}
          image={ImageResources.balance}
          amount={`${current_balance?.toFixed(2) ?? 0}`}
        />
        <BalanceSections
          title={t('dailyCommission', 'home')}
          image={ImageResources.commission}
          amount={`${daily_commission ?? 0}`}
        />
      </RTLAwareView>
    </RTLAwareView>
  );
}

export function HomeScreen(): JSX.Element {
  const {
    isLoading,
    refreshData,
    fetchData,
    user,
    categories,
    loadState,
    homeProviders,
    isPayByCodeModalVisible,
    setIsPayByCodeModalVisible,
  } = useHomeData();
  const dispatch = useAppDispatch();

  const t = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {theme} = useTheme();
  const scroll = useRef<KeyboardAwareScrollView>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (user.status === UserStatus.REGISTERED) {
      navigation.navigate('ForceChangePassword');
    }
  }, [user.status]);

  useEffect(() => {
    if (categories.length === 0) {
      fetchData();
    }
  }, [isFocused]);

  function navigateToServices(provider: ServiceProvider) {
    dispatch(clearSelectedCategory());
    setTimeout(() => {
      dispatch(setSelectedProvider(provider));
      navigation.navigate('Services', {
        providerID:
          provider?.provider === 'Fawry'
            ? provider?.BillerId?.toString()
            : (provider?.id?.toString() as string),
      });
    }, 200);
  }

  function navigateToProviders(category: Category) {
    dispatch(setSelectedCategory(category));
    navigation.navigate('Providers', {
      categoryID: category.id?.toString(),
    });
  }

  return (
    <Container
      ref={scroll}
      testID={'HomeScreenID'}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      backgroundImage={ImageResources[`${theme.mode}_background_1`]}
      withoutPadding
      backgroundColor={theme.colors.background}>
      {isLoading ? (
        <SkypeIndicator size={80} color={theme.colors.mutedLavender} />
      ) : (
        <>
          <HomeHeader onPress={refreshData} />
          <PrimaryButton
            label={t('payByCode', 'home')}
            type={ButtonType.solid}
            onPress={() => setIsPayByCodeModalVisible(!isPayByCodeModalVisible)}
          />
          <BalanceCard />
          <PrimaryButton
            onPressIn={async () => {
              navigation.navigate('Categories');
            }}
            label={t('allServices', 'common')}
            type={ButtonType.solid}
          />
          <FlatListWrapper
            keyExtractor={(item, index) => `${item.id}-${index}`}
            loadState={loadState}
            data={categories?.slice(1, 6)}
            horizontal
            renderItem={({item}) => (
              <Card
                key={item.id}
                icon={{uri: item.img_url}}
                title={item.name}
                onPress={() => {
                  navigateToProviders(item);
                }}
                marginRight={CommonSizes.spacing.extraLarge}
              />
            )}
          />
          <FlatListWrapper
            keyExtractor={(item, index) => `${item.id}-${index}`}
            loadState={loadState}
            data={homeProviders?.slice(0, 5)}
            horizontal
            renderItem={({item}) => (
              <Card
                key={item.id}
                icon={{uri: item.img_url}}
                title={item.name || item.BillerName}
                onPress={() => navigateToServices(item)}
                marginRight={CommonSizes.spacing.extraLarge}
              />
            )}
          />
        </>
      )}
      <PayByCode
        isVisible={isPayByCodeModalVisible}
        onClose={() => setIsPayByCodeModalVisible(false)}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: scaleHeight(130),
    borderTopRightRadius: CommonSizes.spacing.large,
    borderTopLeftRadius: CommonSizes.spacing.large,
    paddingHorizontal: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.large,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    flexGrow: 1,
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
