import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonType} from '../../../types';
import {Container} from '../../common/components/Container';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {normalizeAndTrimWhitespace} from '../../common/helpers/stringsHelpers';
import {ImageResources} from '../../common/ImageResources.g';
import {useTranslation} from '../../common/localization/LocalizationProvider';
import {useAppDispatch} from '../../core/store/reduxHelpers';
import {getBalance} from '../../core/store/user/userActions';
import {CommonSizes} from '../../core/theme/commonSizes';
import {createThemedStyles} from '../../core/theme/commonStyles';
import {scaleHeight} from '../../core/theme/scaling';
import {useTheme} from '../../core/theme/ThemeProvider';
import {decryptTripleDES} from '../../core/utils/stringUtils';
import {HeaderButton} from '../../navigation/HeaderComponents';
import {RootStackParamList} from '../../navigation/types';
import {onPrint} from '../../utils/SunmiPrinter';
import {useReceiptData} from './hooks/useReceiptData';
import {getSeparator, getTextStyle, getLabel} from './utils/utils';
import {reverseService} from '../../core/store/Services/servicesActions';

export function ReceiptScreen(): JSX.Element {
  const {theme} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const params =
    useRoute<RouteProp<RootStackParamList, 'ReceiptScreen'>>()?.params;
  const scroll = useRef<KeyboardAwareScrollView>(null);
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  // Use combined hook
  const {fetchData, receiptData, service, isLoading} = useReceiptData(
    params?.type,
    params?.historyID,
  );

  useEffect(() => {
    if (params?.type === 'print') {
      // For print type, data is already in the store
      return;
    } else if (isFocused && params?.type === 'history') {
      fetchData();
    }
  }, [isFocused, params?.type]);

  const handlePrint = async () => {
    if (params?.type === 'print') {
      dispatch(getBalance());
      await onPrint(receiptData);
      setTimeout(() => {
        navigation.goBack();
        if (service?.PmtType === 'POST') {
          navigation.goBack();
        }
        navigation.goBack();
      }, 200);
    } else {
      onPrint(receiptData);
    }
  };

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  return (
    <Container
      ref={scroll}
      testID={'ReceiptScreenID'}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      backgroundImage={ImageResources.background_2}
      withoutPadding
      extendedBackground
      withoutScroll
      bounces={true}
      backgroundColor={theme.colors.background}>
      {isLoading ? (
        <SkypeIndicator size={80} color={theme.colors.mutedLavender} />
      ) : (
        <>
          <HeaderButton onPress={() => navigation.goBack()} />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollViewContent,
              {backgroundColor: theme.colors.surface},
              createThemedStyles(theme).dropShadow,
            ]}>
            {Array.isArray(receiptData) &&
              receiptData?.map((h, i) => (
                <RTLAwareView
                  key={`${h.label}-${i}`}
                  style={styles.receiptItem}>
                  {getSeparator(h.type, theme)}
                  <RTLAwareView
                    style={getTextStyle(h.type, theme)?.container as ViewStyle}>
                    <RTLAwareText
                      style={getTextStyle(h.type, theme)?.value as TextStyle}>
                      {h.label === 'VouchPIN'
                        ? decryptTripleDES(
                            h.value,
                            '8pe/hqinrZQV6pHNkQ0WwbD0ZHkaAbbj',
                          )
                        : normalizeAndTrimWhitespace(h.value)}
                    </RTLAwareText>
                    {h.label &&
                      h.label !== 'VouchPIN' &&
                      getLabel(h.type, h.label, theme)}
                  </RTLAwareView>
                </RTLAwareView>
              ))}
          </ScrollView>
          <PrimaryButton
            label={t('print', 'common')}
            type={ButtonType.solid}
            onPressIn={handlePrint}
          />
          {params?.type === 'print' && (
            <PrimaryButton
              label={t('backToHome', 'common')}
              onPress={handleBackToHome}
              style={styles.backToHomeButton}
              type={ButtonType.outlineNegative}
            />
          )}
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: scaleHeight(20),
    borderTopRightRadius: CommonSizes.spacing.large,
    borderTopLeftRadius: CommonSizes.spacing.large,
    paddingHorizontal: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.xl,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    flexGrow: 1,
  },
  scrollView: {
    width: '100%',
    borderRadius: CommonSizes.borderRadius.medium,
    flexGrow: 1,
  },
  scrollViewContent: {
    paddingHorizontal: CommonSizes.spacing.huge,
    gap: CommonSizes.spacing.large,
    paddingVertical: CommonSizes.spacing.huge,
    flexGrow: 1,
  },
  receiptItem: {
    width: '100%',
    gap: CommonSizes.spacing.medium,
  },
  backToHomeButton: {
    alignSelf: 'flex-end',
  },
});
