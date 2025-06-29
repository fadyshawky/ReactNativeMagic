import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useTranslation} from '../common/localization/LocalizationProvider';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Profile} from '../screens';
import {HomeScreen} from '../screens/home/HomeScreen';
import {TabBar} from './TabBar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function AppMainNavigator() {
  const t = useTranslation();

  const MainScreens = [
    {
      id: 'Main',
      component: HomeScreen,
      options: {
        tabBarLabel: t('tabs.Main', 'mainNavigation'),
        headerShown: false,
        icon: 0,
        selectedIcon: 0,
      },
    },
    {
      id: 'Account',
      component: Profile,
      options: {
        tabBarLabel: t('tabs.Account', 'mainNavigation'),
        headerShown: false,
        icon: 0,
        selectedIcon: 0,
      },
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Main"
      backBehavior="history"
      detachInactiveScreens
      tabBar={props => {
        return <TabBar {...props} />;
      }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      {MainScreens.map(s => (
        <Tab.Screen
          key={s.id}
          name={s.id}
          component={s.component}
          options={s.options}
        />
      ))}
    </Tab.Navigator>
  );
}
