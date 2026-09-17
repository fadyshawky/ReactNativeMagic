// In App.js in a new project

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {useRef} from 'react';
import {useAppSelector} from '../core/store/reduxHelpers';
import {useTheme} from '../core/theme/ThemeProvider';
import {AuthStack} from './AuthStack';
import {AppMainNavigator} from './MainStack';
import {navigationRef} from './RootNavigation';

function AppNavigator() {
  const routeNameRef = useRef<string | undefined>(undefined);
  const {accessToken} = useAppSelector(state => state.user);
  const {theme} = useTheme();
  const {colors} = theme;

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      theme={{
        dark: theme.mode === 'dark',
        colors: {
          primary: colors.accent,
          background: colors.bgCanvas,
          card: colors.surfaceCard,
          text: colors.textPrimary,
          border: colors.borderSubtle,
          notification: colors.danger,
        },
        fonts: DefaultTheme.fonts,
      }}>
      {!accessToken ? <AuthStack /> : <AppMainNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;
