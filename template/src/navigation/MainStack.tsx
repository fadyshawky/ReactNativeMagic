import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {ImageResources} from '../common/ImageResources.g';
import {localization} from '../common/localization/localization';
import {Main} from '../screens/main/Main';
import {Profile} from '../screens/profile/Profile';
import {Settings} from '../screens/Settings/Settings';
import {Header, HeaderBack} from './HeaderComponents';
import {TabBar} from './TabBar';
import {RootStackParamList} from './types';

const MainScreens = [
  {
    id: 'Main',
    component: Main,
    options: {
      headerShown: false,
    },
  },
  {
    id: 'Profile',
    component: Profile,
    options: {
      tabBarLabel: 'Profile',
      header: () => {
        return <Header title={localization.profile.studentProfile} />;
      },
    },
  },
];

const AppStack = [
  {
    id: 'Home',
    component: MainTabs,
    options: {
      headerShown: false,
    },
  },
  {
    id: 'Settings',
    component: Settings,
    options: {
      header: (props: NativeStackHeaderProps) => {
        return (
          <HeaderBack
            title={'Settings'}
            navigation={
              props.navigation as NativeStackNavigationProp<RootStackParamList>
            }
          />
        );
      },
    },
  },
];

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      tabBar={props => <TabBar {...props} />}>
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

export function AppMainNavigator() {
  return (
    <Stack.Navigator screenOptions={{animation: 'none'}}>
      {AppStack.map(s => {
        return (
          <Stack.Screen
            key={s.id}
            name={s.id}
            component={s.component}
            options={s.options}
          />
        );
      })}
    </Stack.Navigator>
  );
}
