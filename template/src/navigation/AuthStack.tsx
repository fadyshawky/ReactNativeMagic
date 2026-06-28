import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../screens/Login/Login';
import {OTPScreen} from '../screens/OTP/OTPScreen';
import {Splash} from '../screens/splash/Splash';

const Stack = createNativeStackNavigator();

export function AuthStack() {
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
    {
      id: 'OTP',
      component: OTPScreen,
      options: {
        headerShown: false,
      },
    },
  ];

  return (
    <Stack.Navigator
      initialRouteName="Splash"
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
