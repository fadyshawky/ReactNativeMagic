// In App.js in a new project

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {useRef} from 'react';
import {useAppSelector} from '../core/store/reduxHelpers';
import {AuthStack} from './AuthStack';
import {AppMainNavigator} from './MainStack';
import {navigationRef} from './RootNavigation';

function AppNavigator() {
  const routeNameRef = useRef<string | undefined>(undefined);
  const {accessToken} = useAppSelector(state => state.user);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      theme={{
        dark: false,
        colors: {
          primary: '#000',
          background: 'white',
          card: '#fff',
          text: '#000',
          border: '#000',
          notification: '#ff0000',
        },
        fonts: DefaultTheme.fonts,
      }}>
      {!accessToken ? <AuthStack /> : <AppMainNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;
