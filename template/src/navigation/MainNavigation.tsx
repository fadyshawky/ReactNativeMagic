// In App.js in a new project

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {useRef} from 'react';
import {useAppSelector} from '../core/store/reduxHelpers';
import {AuthStack} from './AuthStack';
import {AppMainNavigator} from './MainStack';
import {navigationRef} from './RootNavigation';
import {NewColors} from '../core/theme/colors';
import {Fonts} from '../core/theme/fonts';

function AppNavigator() {
  const routeNameRef = useRef<string | undefined>(undefined);
  const {accessToken} = useAppSelector(state => state.user);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        dark: false,
        colors: {
          primary: '#000',
          background: NewColors.background,
          card: '#fff',
          text: '#000',
          border: '#000',
          notification: '#ff0000',
        },
        fonts: {
          regular: {
            fontFamily: Fonts.regular,
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: Fonts.medium,
            fontWeight: '500',
          },
          bold: {
            fontFamily: Fonts.bold,
            fontWeight: '700',
          },
          heavy: {
            fontFamily: Fonts.bold,
            fontWeight: '900',
          },
        },
      }}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}>
      {!accessToken ? <AuthStack /> : <AppMainNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;
