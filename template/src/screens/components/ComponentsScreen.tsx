import React, {useState} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {ButtonType} from '../../../types';
import {AppBottomSheet} from '../../common/components/AppBottomSheet';
import {AppSwitch} from '../../common/components/AppSwitch';
import {AppTextInput} from '../../common/components/AppTextInput';
import {Avatar} from '../../common/components/Avatar';
import {Badge} from '../../common/components/Badge';
import {CardScroller} from '../../common/components/CardScroller';
import {Carousel} from '../../common/components/Carousel';
import {Checkbox} from '../../common/components/Checkbox';
import {Chip} from '../../common/components/Chip';
import {Container} from '../../common/components/Container';
import {Dropdown} from '../../common/components/Dropdown';
import {ListItem} from '../../common/components/ListItem';
import {ModalDialog} from '../../common/components/ModalDialog';
import {PrimaryButton} from '../../common/components/PrimaryButton';
import {RadioGroup} from '../../common/components/RadioGroup';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {RTLAwareView} from '../../common/components/RTLAwareView';
import {useTranslation} from '../../common/localization/LocalizationProvider';
import {SegmentedControl} from '../../common/components/SegmentedControl';
import {Skeleton} from '../../common/components/Skeleton';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';

const SLIDES = ['Build', 'Consistent', 'Ship'];
const CARDS = ['Start', 'Theme', 'Nav'];

const Section = ({
  title,
  children,
  cardStyle,
  titleStyle,
}: {
  title: string;
  children: React.ReactNode;
  cardStyle: ViewStyle | ViewStyle[];
  titleStyle: TextStyle | TextStyle[];
}) => (
  <View style={styles.section}>
    <RTLAwareText style={titleStyle}>{title}</RTLAwareText>
    <RTLAwareView style={cardStyle}>{children}</RTLAwareView>
  </View>
);

export function ComponentsScreen(): JSX.Element {
  const {theme} = useTheme();
  const tr = useTranslation();
  const t = (key: string) => tr(key, 'components');
  const slides = SLIDES.map(k => ({
    title: t(`slide${k}Title`),
    sub: t(`slide${k}Sub`),
  }));
  const cards = CARDS.map(k => ({
    title: t(`card${k}Title`),
    sub: t(`card${k}Sub`),
  }));
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [notes, setNotes] = useState('');
  const [country, setCountry] = useState<string | undefined>();
  const [agree, setAgree] = useState(false);
  const [notify, setNotify] = useState(true);
  const [plan, setPlan] = useState('a');
  const [seg, setSeg] = useState(0);
  const [chip, setChip] = useState('all');
  const [sheet, setSheet] = useState(false);
  const [dialog, setDialog] = useState(false);

  const {colors} = theme;
  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.surfaceCard,
      borderColor: colors.borderDefault,
      boxShadow: theme.shadows.sm,
    },
  ];
  const titleStyle = theme.text.eyebrow;

  return (
    <Container
      testID={'ComponentsScreenID'}
      backgroundImage={0}
      backgroundColor={colors.bgCanvas}
      style={styles.content}>
      <RTLAwareText style={theme.text.h1}>{t('title')}</RTLAwareText>

      <Section
        title={t('textInputs')}
        cardStyle={cardStyle}
        titleStyle={titleStyle}>
        <AppTextInput
          label={t('name')}
          value={name}
          onChangeText={setName}
          placeholder={t('namePlaceholder')}
        />
        <AppTextInput
          label={t('password')}
          value={pass}
          onChangeText={setPass}
          placeholder="••••••••"
          secureTextEntry
        />
        <AppTextInput
          label={t('notes')}
          value={notes}
          onChangeText={setNotes}
          placeholder={t('notesPlaceholder')}
          multiline
        />
        <Dropdown
          label={t('country')}
          value={country}
          placeholder={t('countryPlaceholder')}
          options={[
            {label: t('egypt'), value: 'eg'},
            {label: t('uae'), value: 'ae'},
            {label: t('saudi'), value: 'sa'},
          ]}
          onSelect={setCountry}
        />
      </Section>

      <Section
        title={t('toggles')}
        cardStyle={cardStyle}
        titleStyle={titleStyle}>
        <Checkbox checked={agree} onChange={setAgree} label={t('agreeTerms')} />
        <RTLAwareView style={styles.row}>
          <RTLAwareText style={theme.text.body}>
            {t('notifications')}
          </RTLAwareText>
          <AppSwitch value={notify} onValueChange={setNotify} />
        </RTLAwareView>
        <RadioGroup
          value={plan}
          options={[
            {label: t('starter'), value: 'a'},
            {label: t('pro'), value: 'b'},
            {label: t('team'), value: 'c'},
          ]}
          onChange={setPlan}
        />
      </Section>

      <Section
        title={t('selectionDisplay')}
        cardStyle={cardStyle}
        titleStyle={titleStyle}>
        <SegmentedControl
          segments={[t('segmentAll'), t('segmentActive'), t('segmentDone')]}
          index={seg}
          onChange={setSeg}
        />
        <RTLAwareView style={styles.chips}>
          {['All', 'Design', 'Code', 'Launch'].map(c => (
            <Chip
              key={c}
              label={t(`chip${c}`)}
              selected={chip === c}
              onPress={() => setChip(c)}
            />
          ))}
        </RTLAwareView>
        <RTLAwareView style={styles.row}>
          <Badge label={t('badgeNew')} variant="accent" />
          <Badge label={t('badgeLive')} variant="success" dot />
          <Badge label={t('badgeLowStock')} variant="warning" />
          <Badge label={t('badgeFailed')} variant="danger" dot />
          <Badge count={128} variant="neutral" />
        </RTLAwareView>
        <RTLAwareView style={styles.row}>
          <Avatar name="Fady Shawky" />
          <Avatar name="Alex Doe" size={36} />
          <Avatar size={36} />
        </RTLAwareView>
      </Section>

      <Section
        title={t('carousel')}
        cardStyle={cardStyle}
        titleStyle={titleStyle}>
        <Carousel
          data={slides}
          height={130}
          renderItem={({item}) => (
            <View
              style={[
                styles.slide,
                {
                  backgroundColor: colors.surfaceInset,
                  borderColor: colors.borderSubtle,
                },
              ]}>
              <RTLAwareText style={theme.text.h3}>{item.title}</RTLAwareText>
              <RTLAwareText style={theme.text.bodySm}>{item.sub}</RTLAwareText>
            </View>
          )}
        />
      </Section>

      <Section
        title={t('cardScroller')}
        cardStyle={cardStyle}
        titleStyle={titleStyle}>
        <CardScroller
          data={cards}
          cardWidth={220}
          renderItem={({item}) => (
            <View
              style={[
                styles.scard,
                {
                  backgroundColor: colors.surfaceCard,
                  borderColor: colors.borderDefault,
                },
              ]}>
              <RTLAwareText style={theme.text.h4}>{item.title}</RTLAwareText>
              <RTLAwareText
                style={[theme.text.bodySm, {color: colors.textTertiary}]}>
                {item.sub}
              </RTLAwareText>
            </View>
          )}
        />
      </Section>

      <Section
        title={t('listRows')}
        cardStyle={cardStyle}
        titleStyle={titleStyle}>
        <ListItem
          title={t('profile')}
          subtitle={t('editDetails')}
          left={<Avatar name="Fady Shawky" size={36} />}
          showChevron
          onPress={() => {}}
        />
        <ListItem
          title={t('notifications')}
          right={<AppSwitch value={notify} onValueChange={setNotify} />}
        />
        <ListItem
          title={t('language')}
          subtitle={t('languageValue')}
          showChevron
          onPress={() => {}}
        />
      </Section>

      <Section
        title={t('overlays')}
        cardStyle={cardStyle}
        titleStyle={titleStyle}>
        <PrimaryButton
          label={t('openSheet')}
          type={ButtonType.solid}
          onPressIn={() => setSheet(true)}
        />
        <PrimaryButton
          label={t('openDialog')}
          type={ButtonType.outline}
          onPressIn={() => setDialog(true)}
        />
        <View style={styles.skeletons}>
          <Skeleton height={16} />
          <Skeleton height={16} width="70%" />
          <Skeleton height={80} radius={CommonSizes.borderRadius.lg} />
        </View>
      </Section>

      <AppBottomSheet
        visible={sheet}
        onClose={() => setSheet(false)}
        title={t('choosePlan')}>
        <RadioGroup
          value={plan}
          options={[
            {label: t('starter'), value: 'a'},
            {label: t('pro'), value: 'b'},
            {label: t('team'), value: 'c'},
          ]}
          onChange={setPlan}
        />
        <PrimaryButton
          label={t('done')}
          type={ButtonType.solid}
          onPressIn={() => setSheet(false)}
        />
      </AppBottomSheet>

      <ModalDialog
        visible={dialog}
        onClose={() => setDialog(false)}
        title={t('deleteTitle')}
        message={t('deleteMessage')}
        actions={[
          {
            label: t('cancel'),
            onPress: () => setDialog(false),
            variant: 'ghost',
          },
          {
            label: t('deleteItem'),
            onPress: () => setDialog(false),
            variant: 'destructive',
          },
        ]}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {gap: CommonSizes.layout.sectionLoose},
  section: {gap: CommonSizes.layout.related},
  card: {
    borderRadius: CommonSizes.borderRadius.lg,
    borderWidth: CommonSizes.borderWidth.hairline,
    padding: CommonSizes.layout.cardPadding.md,
    gap: CommonSizes.spacing.xLargePlus,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: CommonSizes.spacing.medium,
    flexWrap: 'wrap',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CommonSizes.spacing.small,
  },
  slide: {
    flex: 1,
    height: 130,
    borderRadius: CommonSizes.borderRadius.lg,
    borderWidth: CommonSizes.borderWidth.hairline,
    alignItems: 'center',
    justifyContent: 'center',
    gap: CommonSizes.spacing.small,
  },
  scard: {
    width: 220,
    borderRadius: CommonSizes.borderRadius.lg,
    borderWidth: CommonSizes.borderWidth.hairline,
    padding: CommonSizes.layout.cardPadding.sm,
    gap: CommonSizes.spacing.small,
  },
  skeletons: {gap: CommonSizes.spacing.medium},
});
