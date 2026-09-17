import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Icon} from '../common/components/Icon';
import {Logo} from '../common/components/Logo';
import {CommonSizes} from '../core/theme/commonSizes';
import {useTheme} from '../core/theme/ThemeProvider';
import {RootStackParamList} from './types';
import {useTranslation} from '../common/localization/LocalizationProvider';

export function Header() {
  return (
    <View style={styles.headerBase}>
      <Logo size={30} variant="mark" />
    </View>
  );
}

export function HeaderBack({onPress}: {onPress: () => void}) {
  return (
    <View style={styles.headerWithBack}>
      <BackButton onPress={onPress} />
      <Logo size={30} variant="mark" />
      <View style={styles.spacer} />
    </View>
  );
}

export function HeaderButton({onPress}: {onPress: () => void}) {
  return (
    <View style={styles.headerWithBack}>
      <BackButton onPress={onPress} />
      <View style={styles.spacer} />
    </View>
  );
}

export function WebViewHeader({
  navigation: _navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) {
  return <View style={styles.webViewHeader} />;
}

function BackButton({onPress}: {onPress: () => void}) {
  const {theme} = useTheme();
  const t = useTranslation();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t('back')}
      style={({pressed}) => [
        styles.backButton,
        pressed && {backgroundColor: theme.colors.pressVeil},
      ]}>
      <Icon name="arrow-left" color={theme.colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingVertical: CommonSizes.spacing.medium,
  },
  headerWithBack: {
    alignSelf: 'stretch',
    height: 52,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  webViewHeader: {
    width: '100%',
    height: 60,
  },
  spacer: {
    width: CommonSizes.control.lg,
  },
  backButton: {
    width: CommonSizes.control.lg,
    height: CommonSizes.control.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CommonSizes.borderRadius.sm,
  },
});
