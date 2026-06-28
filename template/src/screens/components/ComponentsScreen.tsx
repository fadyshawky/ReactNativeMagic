import React, {useState} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
import {SegmentedControl} from '../../common/components/SegmentedControl';
import {Skeleton} from '../../common/components/Skeleton';
import {BrandGradients, GradientDirection} from '../../core/theme/brand';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';

const SLIDES = [
  {title: 'Build fast', sub: 'Scaffolded for you'},
  {title: 'Stay consistent', sub: 'One design system'},
  {title: 'Ship anywhere', sub: 'iOS · Android'},
];
const CARDS = [
  {title: 'Getting started', sub: 'Set up your env'},
  {title: 'Theming', sub: 'Tokens & gradients'},
  {title: 'Navigation', sub: 'Token-gated stacks'},
];

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

  const cardStyle = [
    styles.card,
    {
      backgroundColor: theme.colors.grayScale_0,
      borderColor: theme.colors.grayScale_50,
    },
  ];
  const titleStyle = [theme.text.bodyXLargeBold, styles.h];

  return (
    <Container
      testID={'ComponentsScreenID'}
      backgroundImage={0}
      backgroundColor={theme.colors.background_2}
      contentContainerStyle={styles.content}>
      <RTLAwareText style={theme.text.header3}>Components</RTLAwareText>

      <Section title="Text inputs" cardStyle={cardStyle} titleStyle={titleStyle}>
        <AppTextInput label="Name" value={name} onChangeText={setName} placeholder="Your name" />
        <AppTextInput
          label="Password"
          value={pass}
          onChangeText={setPass}
          placeholder="••••••••"
          secureTextEntry
        />
        <AppTextInput
          label="Notes"
          value={notes}
          onChangeText={setNotes}
          placeholder="Write something…"
          multiline
        />
        <Dropdown
          label="Country"
          value={country}
          placeholder="Select a country"
          options={[
            {label: 'Egypt', value: 'eg'},
            {label: 'United Arab Emirates', value: 'ae'},
            {label: 'Saudi Arabia', value: 'sa'},
          ]}
          onSelect={setCountry}
        />
      </Section>

      <Section title="Toggles" cardStyle={cardStyle} titleStyle={titleStyle}>
        <Checkbox checked={agree} onChange={setAgree} label="I agree to the terms" />
        <RTLAwareView style={styles.row}>
          <RTLAwareText style={theme.text.bodyLargeRegular}>Notifications</RTLAwareText>
          <AppSwitch value={notify} onValueChange={setNotify} />
        </RTLAwareView>
        <RadioGroup
          value={plan}
          options={[
            {label: 'Starter', value: 'a'},
            {label: 'Pro', value: 'b'},
            {label: 'Team', value: 'c'},
          ]}
          onChange={setPlan}
        />
      </Section>

      <Section
        title="Selection & display"
        cardStyle={cardStyle}
        titleStyle={titleStyle}>
        <SegmentedControl segments={['All', 'Active', 'Done']} index={seg} onChange={setSeg} />
        <RTLAwareView style={styles.chips}>
          {['all', 'design', 'code', 'launch'].map(c => (
            <Chip key={c} label={c} selected={chip === c} onPress={() => setChip(c)} />
          ))}
        </RTLAwareView>
        <RTLAwareView style={styles.row}>
          <Badge label="New" variant="primary" />
          <Badge label="Live" variant="success" />
          <Badge label="Error" variant="error" />
          <Badge count={128} variant="neutral" />
        </RTLAwareView>
        <RTLAwareView style={styles.row}>
          <Avatar name="Fady Shawky" />
          <Avatar name="Alex Doe" size={36} />
          <Avatar size={36} />
        </RTLAwareView>
      </Section>

      <Section title="Carousel" cardStyle={cardStyle} titleStyle={titleStyle}>
        <Carousel
          data={SLIDES}
          height={130}
          renderItem={({item}) => (
            <LinearGradient
              colors={BrandGradients.primary}
              start={GradientDirection.start}
              end={GradientDirection.end}
              style={styles.slide}>
              <RTLAwareText style={[theme.text.header4, styles.onGradientText]}>
                {item.title}
              </RTLAwareText>
              <RTLAwareText
                style={[theme.text.bodyMediumRegular, styles.onGradientText]}>
                {item.sub}
              </RTLAwareText>
            </LinearGradient>
          )}
        />
      </Section>

      <Section title="Card scroller" cardStyle={cardStyle} titleStyle={titleStyle}>
        <CardScroller
          data={CARDS}
          cardWidth={220}
          renderItem={({item}) => (
            <View
              style={[
                styles.scard,
                {
                  backgroundColor: theme.colors.background_2,
                  borderColor: theme.colors.grayScale_50,
                },
              ]}>
              <RTLAwareText style={theme.text.bodyLargeBold}>{item.title}</RTLAwareText>
              <RTLAwareText
                style={{...theme.text.bodySmallRegular, color: theme.colors.grayScale_200}}>
                {item.sub}
              </RTLAwareText>
            </View>
          )}
        />
      </Section>

      <Section title="List rows" cardStyle={cardStyle} titleStyle={titleStyle}>
        <ListItem
          title="Profile"
          subtitle="Edit your details"
          left={<Avatar name="Fady Shawky" size={36} />}
          showChevron
          onPress={() => {}}
        />
        <ListItem title="Notifications" right={<AppSwitch value={notify} onValueChange={setNotify} />} />
        <ListItem title="Language" subtitle="English" showChevron onPress={() => {}} />
      </Section>

      <Section
        title="Overlays & loading"
        cardStyle={cardStyle}
        titleStyle={titleStyle}>
        <PrimaryButton
          label="Open bottom sheet"
          type={ButtonType.solid}
          onPressIn={() => setSheet(true)}
        />
        <PrimaryButton
          label="Open dialog"
          type={ButtonType.outline}
          onPressIn={() => setDialog(true)}
        />
        <View style={styles.skeletons}>
          <Skeleton height={16} />
          <Skeleton height={16} width="70%" />
          <Skeleton height={80} radius={CommonSizes.borderRadius.large} />
        </View>
      </Section>

      <AppBottomSheet visible={sheet} onClose={() => setSheet(false)} title="Choose a plan">
        <RadioGroup
          value={plan}
          options={[
            {label: 'Starter', value: 'a'},
            {label: 'Pro', value: 'b'},
            {label: 'Team', value: 'c'},
          ]}
          onChange={setPlan}
        />
        <PrimaryButton label="Done" type={ButtonType.solid} onPressIn={() => setSheet(false)} />
      </AppBottomSheet>

      <ModalDialog
        visible={dialog}
        onClose={() => setDialog(false)}
        title="Delete item?"
        message="This action cannot be undone."
        actions={[
          {label: 'Cancel', onPress: () => setDialog(false), variant: 'ghost'},
          {label: 'Delete', onPress: () => setDialog(false), variant: 'destructive'},
        ]}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: CommonSizes.spacing.large,
    paddingTop: CommonSizes.spacing.large,
    paddingBottom: CommonSizes.spacing.xxxLarge,
    gap: CommonSizes.spacing.xLarge,
  },
  section: {gap: CommonSizes.spacing.medium},
  h: {marginBottom: CommonSizes.spacing.small},
  onGradientText: {color: '#EAF0FF'},
  card: {
    borderRadius: CommonSizes.borderRadius.large,
    borderWidth: CommonSizes.borderWidth.small,
    padding: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.large,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: CommonSizes.spacing.medium,
    flexWrap: 'wrap',
  },
  chips: {flexDirection: 'row', flexWrap: 'wrap', gap: CommonSizes.spacing.small},
  slide: {
    flex: 1,
    height: 130,
    borderRadius: CommonSizes.borderRadius.large,
    alignItems: 'center',
    justifyContent: 'center',
    gap: CommonSizes.spacing.small,
  },
  scard: {
    width: 220,
    borderRadius: CommonSizes.borderRadius.large,
    borderWidth: CommonSizes.borderWidth.small,
    padding: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.small,
  },
  skeletons: {gap: CommonSizes.spacing.medium},
});
