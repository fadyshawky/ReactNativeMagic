import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ButtonType} from '../../../types';
import {Avatar} from '../../common/components/Avatar';
import {FlatListWrapper} from '../../common/components/FlatListWrapper';
import {ListItem} from '../../common/components/ListItem';
import {Logo} from '../../common/components/Logo';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {useTranslation} from '../../common/localization/LocalizationProvider';
import {Category} from '../../core/store/categories/categoriesState';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
import {useHomeData} from './hooks/useHomeData';

export function HomeScreen(): JSX.Element {
  const {theme} = useTheme();
  const {colors} = theme;
  const t = useTranslation();
  const {user, categories, loadState, error, reload} = useHomeData();

  const renderItem = ({item}: {item: Category}) => (
    <ListItem
      title={item.name}
      subtitle={item.icon}
      showChevron
      onPress={() => {}}
      left={
        <View style={[styles.itemIcon, {backgroundColor: colors.accentSubtle}]}>
          <RTLAwareText style={[theme.text.label, {color: colors.textAccent}]}>
            {(item.name?.charAt(0) || '·').toUpperCase()}
          </RTLAwareText>
        </View>
      }
    />
  );

  const header = (
    <View>
      <RTLAwareView style={styles.topbar}>
        <RTLAwareView style={styles.greetWrap}>
          <Logo size={32} variant="mark" />
          <View style={styles.flex}>
            <RTLAwareText style={theme.text.bodySm}>
              {t('greeting', 'home')}
            </RTLAwareText>
            <RTLAwareText style={theme.text.h3} numberOfLines={1}>
              {user?.full_name || t('there', 'home')}
            </RTLAwareText>
          </View>
        </RTLAwareView>
        <Avatar name={user?.full_name || 'U'} size={40} />
      </RTLAwareView>

      <View style={[styles.hero, {backgroundColor: colors.accent}]}>
        <RTLAwareText style={[theme.text.eyebrow, styles.onAccentMuted]}>
          {t('heroEyebrow', 'home')}
        </RTLAwareText>
        <RTLAwareText style={[theme.text.h2, {color: colors.textOnAccent}]}>
          {t('heroTitle', 'home')}
        </RTLAwareText>
        <RTLAwareText style={[theme.text.bodySm, styles.onAccentSoft]}>
          {t('heroSubtitle', 'home')}
        </RTLAwareText>
        <View style={styles.heroCta}>
          <PrimaryButton
            label={t('explore', 'home')}
            type={ButtonType.outline}
            size="md"
            fullWidth={false}
            onPress={() => {}}
          />
        </View>
      </View>

      <RTLAwareText style={[theme.text.h3, styles.sectionTitle]}>
        {t('items', 'home')}
      </RTLAwareText>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.screen, {backgroundColor: colors.bgCanvas}]}
      edges={['top']}>
      <FlatListWrapper
        data={categories}
        loadState={loadState}
        error={error}
        tryAgain={reload}
        onRefresh={reload}
        renderItem={renderItem}
        ListHeaderComponent={header}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
  flex: {flex: 1},
  onAccentMuted: {color: 'rgba(255,255,255,0.72)'},
  onAccentSoft: {color: 'rgba(255,255,255,0.82)'},
  listContent: {
    paddingHorizontal: CommonSizes.layout.gutter,
    paddingBottom: CommonSizes.layout.screenBottom,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: CommonSizes.spacing.large,
    paddingBottom: CommonSizes.layout.gutter,
  },
  greetWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommonSizes.spacing.large,
    flex: 1,
  },
  hero: {
    borderRadius: CommonSizes.borderRadius.lg,
    padding: CommonSizes.layout.cardPadding.md,
    gap: CommonSizes.layout.related,
    marginBottom: CommonSizes.layout.sectionLoose,
  },
  // A form step below the copy (related gap + this = stack).
  heroCta: {
    alignItems: 'flex-start',
    marginTop: CommonSizes.layout.stack - CommonSizes.layout.related,
  },
  sectionTitle: {marginBottom: CommonSizes.layout.titleToBody},
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: CommonSizes.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
