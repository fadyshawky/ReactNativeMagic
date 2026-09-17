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
    <View style={[styles.container, {backgroundColor: theme.colors.bgCanvas}]}>
      {/* Dead centre at MARK pt: the native launch screens (LaunchScreen.storyboard,
          Android splash_mark) draw the same mark there, so the handoff can't jump. */}
      <Logo size={MARK} variant="mark" />
      <View style={styles.below}>
        <RTLAwareText style={theme.text.eyebrow}>
          React Native Magic
        </RTLAwareText>
        <ActivityIndicator color={theme.colors.accent} style={styles.spinner} />
      </View>
    </View>
  );
}

const MARK = 88;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  below: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    marginTop: MARK / 2 + CommonSizes.spacing.xLarge,
    alignItems: 'center',
    gap: CommonSizes.spacing.xLarge,
  },
  spinner: {marginTop: CommonSizes.spacing.medium},
});
