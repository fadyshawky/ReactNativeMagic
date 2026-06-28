import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Logo} from '../../common/components/Logo';
import {RTLAwareText} from '../../common/components/RTLAwareText';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';

/**
 * Branded splash. Only ever shown to logged-out users (the token gate in
 * MainNavigation renders the app stack directly when a token exists), so it
 * simply brands the launch and hands off to Login.
 */
export function Splash(): JSX.Element {
  const navigation = useNavigation<any>();
  const {theme} = useTheme();

  useEffect(() => {
    const id = setTimeout(() => navigation.replace('Login'), 1100);
    return () => clearTimeout(id);
  }, [navigation]);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background_2}]}>
      <Logo size={112} variant="gradient" />
      <RTLAwareText
        style={[
          theme.text.bodySmallExtraBold,
          styles.tagline,
          {color: theme.colors.grayScale_200},
        ]}>
        REACT NATIVE MAGIC
      </RTLAwareText>
      <ActivityIndicator
        color={theme.colors.PlatinateBlue_400}
        style={styles.spinner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: CommonSizes.spacing.large,
  },
  tagline: {letterSpacing: 2},
  spinner: {marginTop: CommonSizes.spacing.large},
});
