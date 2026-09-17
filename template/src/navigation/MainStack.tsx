import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import {IconName} from '../common/components/Icon';
import {useTranslation} from '../common/localization/LocalizationProvider';

import {Profile} from '../screens';
import {ComponentsScreen} from '../screens/components/ComponentsScreen';
import {HomeScreen} from '../screens/home/HomeScreen';
import {TabBar} from './TabBar';

const Tab = createBottomTabNavigator();

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

export function AppMainNavigator() {
  const t = useTranslation();

  const MainScreens = [
    {
      id: 'Main',
      component: HomeScreen,
      options: {
        tabBarLabel: t('tabs.Main', 'mainNavigation'),
        headerShown: false,
        icon: 'house' as IconName,
      },
    },
    {
      id: 'Components',
      component: ComponentsScreen,
      options: {
        tabBarLabel: t('tabs.Components', 'mainNavigation'),
        headerShown: false,
        icon: 'layout-grid' as IconName,
      },
    },
    {
      id: 'Account',
      component: Profile,
      options: {
        tabBarLabel: t('tabs.Account', 'mainNavigation'),
        headerShown: false,
        icon: 'user' as IconName,
      },
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Main"
      backBehavior="history"
      detachInactiveScreens
      tabBar={renderTabBar}
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
