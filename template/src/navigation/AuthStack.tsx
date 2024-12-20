import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../screens/Login/Login';
import {Splash} from '../screens/splash/Splash';

const Stack = createNativeStackNavigator();

const AuthScreens = [
  {
    id: 'Splash',
    component: Splash,
    options: {
      headerShown: false,
    },
  },
  {
    id: 'Login',
    component: Login,
    options: {
      headerShown: false,
    },
  },
];

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{animation: 'none'}}>
      {AuthScreens.map(s => (
        <Stack.Screen
          key={s.id}
          name={s.id}
          component={s.component}
          options={s.options}
        />
      ))}
    </Stack.Navigator>
  );
}
