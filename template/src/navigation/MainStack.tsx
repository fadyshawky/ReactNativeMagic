import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from '../screens/home/HomeScreen';
import {Profile} from '../screens/profile/Profile';
import {Settings} from '../screens/Settings/Settings';
import {TabBar} from './TabBar';

const MainScreens = [
  {
    id: 'Home',
    component: HomeScreen,
    options: {
      tabBarLabel: 'Profile',
    },
  },
  {
    id: 'Profile',
    component: Profile,
    options: {
      tabBarLabel: 'Profile',
    },
  },
];

const AppStack = [
  {
    id: 'Main',
    component: MainTabs,
    options: {
      headerShown: false,
    },
  },
  {
    id: 'Settings',
    component: Settings,
    options: {},
  },
];

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
