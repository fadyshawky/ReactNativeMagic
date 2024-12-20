import {createNavigationContainerRef} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  // Add other screens here
  Profile: {userId: string};
  Settings: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<T extends keyof RootStackParamList>(
  name: never,
  params?: RootStackParamList[T],
) {
  if (navigationRef.isReady()) {
    // Type assertion is not needed since name and params are already properly typed
    navigationRef.current?.navigate(name, params);
  }
}

// Function to reset the navigation stack and navigate to the "Home" screen
export const resetToHomeScreen = () => {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'Home'}],
    }),
  );
};

// Call the function to reset the navigation stack and navigate to the "Home" screen
