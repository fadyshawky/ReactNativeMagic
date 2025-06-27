import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {ImageResources} from '../common/ImageResources.g';
import {useTranslation} from '../common/localization/LocalizationProvider';

import {TabBar} from './TabBar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Favorites,
  History,
  Profile,
  Services,
  SingleService,
  InquiredBill,
  PaymentConfirmation,
  Categories,
  Providers,
  ReceiptScreen,
} from '../screens';
import {ForceChangePasswordScreen} from '../screens/ForceChangePassword/ForceChangePasswordScreen';
import {HomeScreen} from '../screens/home/HomeScreen';

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
        icon: ImageResources.services,
        selectedIcon: ImageResources.services,
      },
    },
    {
      id: 'Favorites',
      component: Favorites,
      options: {
        tabBarLabel: t('tabs.Favorites', 'mainNavigation'),
        headerShown: false,
        icon: ImageResources.favourites,
        selectedIcon: ImageResources.favourites,
      },
    },
    {
      id: 'Financials',
      component: History,
      options: {
        tabBarLabel: t('tabs.Financials', 'mainNavigation'),
        headerShown: false,
        icon: ImageResources.financials,
        selectedIcon: ImageResources.financials,
      },
    },
    {
      id: 'Account',
      component: Profile,
      options: {
        tabBarLabel: t('tabs.Account', 'mainNavigation'),
        headerShown: false,
        icon: ImageResources.account,
        selectedIcon: ImageResources.account,
      },
    },
    {
      id: 'ForceChangePassword',
      component: ForceChangePasswordScreen,
      options: {
        headerShown: false,
        title: t('screens.ForceChangePassword', 'mainNavigation'),
      },
    },
    {
      id: 'Services',
      component: Services,
      options: {
        headerShown: false,
        title: t('screens.Services', 'mainNavigation'),
      },
    },
    {
      id: 'SingleService',
      component: SingleService,
      options: {
        headerShown: false,
      },
    },
    {
      id: 'InquiredBill',
      component: InquiredBill,
      options: {
        headerShown: false,
      },
    },
    {
      id: 'PaymentConfirmation',
      component: PaymentConfirmation,
      options: {
        headerShown: false,
      },
    },
    {
      id: 'ReceiptScreen',
      component: ReceiptScreen,
      options: {
        headerShown: false,
      },
    },
    {
      id: 'Categories',
      component: Categories,
      options: {
        headerShown: false,
      },
    },
    {
      id: 'Providers',
      component: Providers,
      options: {
        headerShown: false,
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
