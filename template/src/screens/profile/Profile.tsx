import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {ButtonType} from '../../../types';
import {AppSwitch} from '../../common/components/AppSwitch';
import {Avatar} from '../../common/components/Avatar';
import {Container} from '../../common/components/Container';
import {ListItem} from '../../common/components/ListItem';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {Languages} from '../../common/localization/localization';
import {
  useLocalization,
  useTranslation,
} from '../../common/localization/LocalizationProvider';
import {useAppDispatch, useAppSelector} from '../../core/store/reduxHelpers';
import {setLogout} from '../../core/store/user/userSlice';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';

export function Profile(): JSX.Element {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user);
  const {theme, toggleTheme} = useTheme();
  const t = useTranslation();
  const {currentLanguage, changeLanguage} = useLocalization();
  const [notify, setNotify] = useState(true);

  const cardStyle = [
    styles.card,
    {
      backgroundColor: theme.colors.grayScale_0,
      borderColor: theme.colors.grayScale_50,
    },
  ];
  const valueText = {
    ...theme.text.bodyMediumBold,
    color: theme.colors.PlatinateBlue_400,
  };
  const dividerStyle = [
    styles.divider,
    {backgroundColor: theme.colors.grayScale_50},
  ];

  const onToggleLanguage = () =>
    changeLanguage(
      currentLanguage === Languages.ar ? Languages.en : Languages.ar,
    );

  const onLogout = () =>
    Alert.alert(t('logout', 'profile'), t('logoutConfirm', 'profile'), [
      {text: t('cancel', 'common'), style: 'cancel'},
      {
        text: t('logout', 'profile'),
        style: 'destructive',
        onPress: () => dispatch(setLogout()),
      },
    ]);

  return (
    <Container
      testID={'ProfileScreenID'}
      backgroundImage={0}
      contentContainerStyle={styles.content}
      backgroundColor={theme.colors.background_2}>
      <RTLAwareView style={styles.headerRow}>
        <Avatar name={user?.full_name || 'U'} size={64} />
        <View style={styles.flex}>
          <RTLAwareText style={theme.text.header4} numberOfLines={1}>
            {user?.full_name || t('account', 'profile')}
          </RTLAwareText>
          <RTLAwareText
            style={{
              ...theme.text.bodyMediumRegular,
              color: theme.colors.grayScale_200,
            }}>
            {user?.mobile_number || '—'}
          </RTLAwareText>
        </View>
      </RTLAwareView>

      <RTLAwareView style={cardStyle}>
        <ListItem
          title={t('editProfile', 'profile')}
          showChevron
          onPress={() => {}}
        />
        <View style={dividerStyle} />
        <ListItem
          title={t('language', 'profile')}
          onPress={onToggleLanguage}
          right={
            <RTLAwareText style={valueText}>
              {currentLanguage === Languages.ar ? 'العربية' : 'English'}
            </RTLAwareText>
          }
        />
        <View style={dividerStyle} />
        <ListItem
          title={t('appearance', 'profile')}
          onPress={toggleTheme}
          right={
            <RTLAwareText style={valueText}>
              {theme.mode === 'dark' ? t('dark', 'profile') : t('light', 'profile')}
            </RTLAwareText>
          }
        />
        <View style={dividerStyle} />
        <ListItem
          title={t('notifications', 'profile')}
          right={<AppSwitch value={notify} onValueChange={setNotify} />}
        />
      </RTLAwareView>

      <PrimaryButton
        label={t('logout', 'profile')}
        onPressIn={onLogout}
        type={ButtonType.outlineNegative}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: CommonSizes.spacing.large,
    paddingTop: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.xLarge,
  },
  flex: {flex: 1},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommonSizes.spacing.large,
  },
  card: {
    borderRadius: CommonSizes.borderRadius.large,
    borderWidth: CommonSizes.borderWidth.small,
    paddingHorizontal: CommonSizes.spacing.large,
  },
  divider: {height: CommonSizes.borderWidth.small, width: '100%'},
});
