// In App.js in a new project

import {NavigationContainer} from '@react-navigation/native';
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
      theme={{
        dark: false,
        colors: {
          primary: '#000',
          background: 'transparent',
          card: '#fff',
          text: '#000',
          border: '#000',
          notification: '#ff0000',
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'System',
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
