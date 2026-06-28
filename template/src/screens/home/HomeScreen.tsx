import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar} from '../../common/components/Avatar';
import {Chip} from '../../common/components/Chip';
import {FlatListWrapper} from '../../common/components/FlatListWrapper';
import {ListItem} from '../../common/components/ListItem';
import {Logo} from '../../common/components/Logo';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {useTranslation} from '../../common/localization/LocalizationProvider';
import {Category} from '../../core/store/categories/categoriesState';
import {BrandGradients, GradientDirection, Glow} from '../../core/theme/brand';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
import {useHomeData} from './hooks/useHomeData';

export function HomeScreen(): JSX.Element {
  const {theme} = useTheme();
  const t = useTranslation();
  const {user, categories, loadState, error, reload} = useHomeData();

  const renderItem = ({item}: {item: Category}) => (
    <ListItem
      title={item.name}
      subtitle={item.icon}
      showChevron
      onPress={() => {}}
      left={
        <LinearGradient
          colors={BrandGradients.primary}
          start={GradientDirection.start}
          end={GradientDirection.end}
          style={styles.itemIcon}>
          <RTLAwareText
            style={[theme.text.bodyMediumExtraBold, styles.onGradientText]}>
            {(item.name?.charAt(0) || '•').toUpperCase()}
          </RTLAwareText>
        </LinearGradient>
      }
    />
  );

  const header = (
    <View>
      <RTLAwareView style={styles.topbar}>
        <RTLAwareView style={styles.greetWrap}>
          <Logo size={36} variant="gradient" />
          <View style={styles.flex}>
            <RTLAwareText
              style={{
                ...theme.text.bodySmallRegular,
                color: theme.colors.grayScale_200,
              }}>
              {t('greeting', 'home')}
            </RTLAwareText>
            <RTLAwareText style={theme.text.bodyXLargeBold} numberOfLines={1}>
              {user?.full_name || t('there', 'home')}
            </RTLAwareText>
          </View>
        </RTLAwareView>
        <Avatar name={user?.full_name || 'U'} size={40} />
      </RTLAwareView>

      <LinearGradient
        colors={BrandGradients.primary}
        start={GradientDirection.start}
        end={GradientDirection.end}
        style={[styles.hero, Glow.primary]}>
        <RTLAwareText
          style={[theme.text.bodySmallExtraBold, styles.onGradientText]}>
          {t('heroEyebrow', 'home')}
        </RTLAwareText>
        <RTLAwareText style={[theme.text.header3, styles.onGradientText]}>
          {t('heroTitle', 'home')}
        </RTLAwareText>
        <RTLAwareText
          style={[theme.text.bodyMediumRegular, styles.onGradientText]}>
          {t('heroSubtitle', 'home')}
        </RTLAwareText>
        <RTLAwareView style={styles.heroCta}>
          <Chip label={t('explore', 'home')} onPress={() => {}} />
        </RTLAwareView>
      </LinearGradient>

      <RTLAwareText style={[theme.text.bodyXLargeBold, styles.sectionTitle]}>
        {t('items', 'home')}
      </RTLAwareText>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.screen, {backgroundColor: theme.colors.background_2}]}
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
  onGradientText: {color: '#EAF0FF'},
  listContent: {
    paddingHorizontal: CommonSizes.spacing.large,
    paddingBottom: CommonSizes.spacing.xxxLarge,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: CommonSizes.spacing.large,
    paddingBottom: CommonSizes.spacing.xLarge,
  },
  greetWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommonSizes.spacing.medium,
    flex: 1,
  },
  hero: {
    borderRadius: CommonSizes.borderRadius.xLarge,
    padding: CommonSizes.spacing.xLarge,
    gap: CommonSizes.spacing.small,
    marginBottom: CommonSizes.spacing.xLarge,
  },
  heroCta: {alignSelf: 'flex-start', marginTop: CommonSizes.spacing.small},
  sectionTitle: {marginBottom: CommonSizes.spacing.medium},
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: CommonSizes.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
