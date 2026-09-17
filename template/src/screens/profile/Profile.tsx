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
      backgroundColor: theme.colors.surfaceCard,
      borderColor: theme.colors.borderDefault,
      boxShadow: theme.shadows.sm,
    },
  ];
  const valueText = [theme.text.bodySm, {color: theme.colors.textTertiary}];
  const dividerStyle = [
    styles.divider,
    {backgroundColor: theme.colors.borderSubtle},
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
      backgroundColor={theme.colors.bgCanvas}>
      <RTLAwareView style={styles.headerRow}>
        <Avatar name={user?.full_name || 'U'} size={48} />
        <View style={styles.flex}>
          <RTLAwareText style={theme.text.h3} numberOfLines={1}>
            {user?.full_name || t('account', 'profile')}
          </RTLAwareText>
          <RTLAwareText
            style={[theme.text.mono, {color: theme.colors.textTertiary}]}>
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
              {theme.mode === 'dark'
                ? t('dark', 'profile')
                : t('light', 'profile')}
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
        type={ButtonType.outline}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommonSizes.spacing.large,
  },
  card: {
    borderRadius: CommonSizes.borderRadius.lg,
    borderWidth: CommonSizes.borderWidth.hairline,
    paddingHorizontal: CommonSizes.spacing.xLarge,
  },
  divider: {height: CommonSizes.borderWidth.hairline, width: '100%'},
});
