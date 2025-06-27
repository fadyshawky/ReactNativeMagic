import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Image,
} from 'react-native';
import {ImageResources} from '../../common/ImageResources.g';
import {Container} from '../../common/components/Container';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {
  useLocalization,
  useRTL,
  useTranslation,
} from '../../common/localization/LocalizationProvider';
import {Languages} from '../../common/localization/localization';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Theme} from '../../core/theme/types';
import {scaleWidth, scaleHeight} from '../../core/theme/scaling';
import {useAppDispatch, useAppSelector} from '../../core/store/reduxHelpers';
import {setProvidersLogout} from '../../core/store/Providers/providersSlice';
import {setServiceLogout} from '../../core/store/Services/servicesSlice';
import {setCategoriesLogout} from '../../core/store/Categories/categorySlice';
import {setLogout} from '../../core/store/user/userSlice';
import DeviceInfo from 'react-native-device-info';

function SwitchButton({
  onValueChange,
  value,
}: {
  onValueChange: () => void;
  value: boolean;
}) {
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      onPressIn={() => {
        onValueChange();
      }}
      style={{
        width: scaleWidth(100),
        height: scaleHeight(53),
        backgroundColor: theme.colors.mutedLavender,
        borderRadius: theme.borderRadius.xl,
        paddingHorizontal: scaleWidth(5),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: scaleWidth(42),
          height: scaleWidth(42),
          backgroundColor: theme.colors.indigoBlue,
          borderRadius: theme.borderRadius.xl,
          alignSelf: value ? 'flex-end' : 'flex-start',
        }}
      />
    </TouchableOpacity>
  );
}

export function Profile(): JSX.Element {
  const {theme, toggleTheme} = useTheme();
  const {currentLanguage, changeLanguage} = useLocalization();
  const t = useTranslation();
  const isRTL = useRTL();
  const isArabic = currentLanguage === Languages.ar;
  const isDarkMode = theme.mode === 'dark';
  const {language: storedLanguage} = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  const styles = createStyles(theme);

  const handleLanguageToggle = () => {
    const newLanguage = isArabic ? Languages.en : Languages.ar;

    Alert.alert(
      t('languageChangeTitle', 'profile'),
      t('languageChangeMessage', 'profile'),
      [
        {
          text: t('cancel', 'common'),
          style: 'cancel',
        },
        {
          text: t('change', 'common'),
          onPress: () => changeLanguage(newLanguage),
        },
      ],
      {cancelable: true},
    );
  };

  function logout(): any {
    throw new Error('Function not implemented.');
  }

  return (
    <Container
      backgroundImage={ImageResources[`${theme.mode}_background_1`]}
      withoutPadding
      backgroundColor={theme.colors.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <RTLAwareText style={styles.mainTitle}>
            {t('account', 'profile')}
          </RTLAwareText>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Image source={ImageResources.account} style={styles.menuIcon} />
              <RTLAwareText style={theme.text.header2}>
                {t('editProfile', 'profile')}
              </RTLAwareText>
            </View>
          </TouchableOpacity>

          <RTLAwareView style={styles.menuItem}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                source={ImageResources.en}
                style={{
                  ...styles.menuIcon,
                  marginRight: scaleWidth(10),
                  width: scaleWidth(48),
                  height: scaleWidth(48),
                }}
              />
              <SwitchButton
                onValueChange={handleLanguageToggle}
                value={isArabic}
              />
              <Image
                tintColor={theme.colors.tintColor}
                source={ImageResources.ar}
                style={{
                  ...styles.menuIcon,
                  marginLeft: scaleWidth(10),
                  width: scaleWidth(48),
                  height: scaleWidth(48),
                }}
              />
            </View>
            <View style={styles.menuItemLeft}>
              <Image
                tintColor={theme.colors.tintColor}
                source={ImageResources.language}
                style={styles.menuIcon}
              />
              <RTLAwareText style={theme.text.header2}>
                {t('language', 'profile')}
              </RTLAwareText>
            </View>
          </RTLAwareView>

          <RTLAwareView style={styles.menuItem}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                tintColor={theme.colors.tintColor}
                source={ImageResources.light}
                style={{
                  ...styles.menuIcon,
                  marginRight: scaleWidth(10),
                  width: scaleWidth(48),
                  height: scaleWidth(48),
                }}
              />
              <SwitchButton onValueChange={toggleTheme} value={isDarkMode} />
              <Image
                tintColor={theme.colors.tintColor}
                source={ImageResources.dark}
                style={{
                  ...styles.menuIcon,
                  marginLeft: scaleWidth(10),
                  width: scaleWidth(48),
                  height: scaleWidth(48),
                }}
              />
            </View>
            <View style={styles.menuItemLeft}>
              <Image
                tintColor={theme.colors.tintColor}
                source={ImageResources.display}
                style={styles.menuIcon}
              />
              <RTLAwareText style={theme.text.header2}>
                {t('darkMode', 'profile')}
              </RTLAwareText>
            </View>
          </RTLAwareView>

          <TouchableOpacity
            onPressIn={() => {
              dispatch(setProvidersLogout());
              dispatch(setServiceLogout());
              dispatch(setCategoriesLogout());
              dispatch(setLogout());
            }}
            style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Image
                source={ImageResources.services}
                style={[styles.menuIcon, styles.logoutIcon]}
              />
              <RTLAwareText style={[theme.text.header2, styles.logoutText]}>
                {t('logout', 'profile')}
              </RTLAwareText>
            </View>
          </TouchableOpacity>
        </View>
        <RTLAwareText style={{...theme.text.body1, alignSelf: 'center'}}>
          {DeviceInfo.getVersion()}
        </RTLAwareText>
      </ScrollView>
    </Container>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    titleSection: {
      paddingHorizontal: scaleWidth(20),
      paddingTop: scaleWidth(20),
      paddingBottom: scaleWidth(10),
    },
    mainTitle: {
      ...theme.text.header1,
      marginBottom: scaleWidth(10),
    },
    menuSection: {
      paddingHorizontal: scaleWidth(20),
      paddingVertical: scaleWidth(10),
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: scaleWidth(15),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.shadow,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuIcon: {
      width: scaleWidth(71),
      height: scaleWidth(71),
      marginRight: scaleWidth(15),
      tintColor: theme.colors.tintColor,
      resizeMode: 'contain',
    },
    menuText: {
      ...theme.text.body1,
    },
    logoutText: {
      color: theme.colors.red,
    },
    logoutIcon: {
      tintColor: theme.colors.red,
    },
    languageOptions: {
      flexDirection: 'row',
      marginTop: scaleWidth(10),
    },
    languageOption: {
      marginRight: scaleWidth(20),
      paddingVertical: scaleWidth(5),
      paddingHorizontal: scaleWidth(10),
      borderRadius: theme.borderRadius.sm,
    },
    activeLanguage: {
      backgroundColor: theme.colors.indigoBlue,
      color: theme.colors.white,
    },
  });
