import {createNavigationContainerRef} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {RootStackParamList} from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T],
) {
  if (navigationRef.isReady()) {
    (navigationRef.current as any)?.navigate(name as never, params as never);
  }
}

// Reset the navigation stack to the main (authenticated) screen.
export const resetToHomeScreen = () => {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'Main'}],
    }),
  );
};
