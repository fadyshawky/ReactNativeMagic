import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {LoadingComponent} from '../../common/components/LoadingComponent';
import {useAppSelector} from '../../core/store/reduxHelpers';

export function Splash(): JSX.Element {
  const isUserLoggedIn = useAppSelector(state => state.user.accessToken);
  const navigation = useNavigation();

  useEffect(() => {
    if (isUserLoggedIn) {
      navigation.navigate('Main' as never);
    } else {
      navigation.navigate('Login' as never);
    }
  }, [isUserLoggedIn]);

  return <LoadingComponent />;
}
