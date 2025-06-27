import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoadState} from '../../../types';
import {Container} from '../../common/components/Container';
import {FlatListWrapper} from '../../common/components/FlatListWrapper';
import {ImageResources} from '../../common/ImageResources.g';
import {useAppDispatch} from '../../core/store/reduxHelpers';
import {resetServices} from '../../core/store/Services/servicesSlice';
import {CommonSizes} from '../../core/theme/commonSizes';
import {createThemedStyles} from '../../core/theme/commonStyles';
import {scaleHeight, scaleWidth} from '../../core/theme/scaling';
import {useTheme} from '../../core/theme/ThemeProvider';
import {HeaderBack} from '../../navigation/HeaderComponents';
import {RootStackParamList} from '../../navigation/types';
import {useServicesData} from './hooks/useServicesData';
import {SkypeIndicator} from 'react-native-indicators';

export function Services(): JSX.Element {
  const {theme} = useTheme();
  const scroll = useRef<KeyboardAwareScrollView>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  const {providerID} =
    useRoute<RouteProp<RootStackParamList, 'Services'>>().params;
  const {isLoading, refreshData, fetchData, services} =
    useServicesData(providerID);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);
  return (
    <Container
      ref={scroll}
      testID={'ServicesScreenID'}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      backgroundImage={ImageResources[`${theme.mode}_background_1`]}
      withoutPadding
      extendedBackground
      withoutScroll
      backgroundColor={theme.colors.background}>
      {isLoading ? (
        <SkypeIndicator size={80} color={theme.colors.mutedLavender} />
      ) : (
        <>
          <HeaderBack
            onPress={() => {
              dispatch(resetServices());
              navigation.goBack();
            }}
          />
          <FlatListWrapper
            loadState={LoadState.allIsLoaded}
            contentContainerStyle={{paddingHorizontal: undefined}}
            data={services}
            keyExtractor={item => item.id?.toString() || item.Id?.toString()}
            ItemSeparatorComponent={() => (
              <View style={{height: theme.spacing.md}} />
            )}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SingleService', {serviceID: item.id});
                  }}
                  style={{
                    paddingVertical: CommonSizes.spacing.large,
                    borderWidth: 1,
                    borderColor: theme.colors.indigoBlue,
                    paddingHorizontal: CommonSizes.spacing.large,
                    borderRadius: CommonSizes.borderRadius.large,
                    backgroundColor: theme.colors.surface,
                    ...createThemedStyles(theme).dropShadow,
                    overflow: 'hidden',
                  }}>
                  <Text style={{...theme.text.header2, width: '100%'}}>
                    {item.name || item.Name}
                  </Text>
                </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: CommonSizes.spacing.large,
    borderRadius: CommonSizes.spacing.huge,
  },
});
