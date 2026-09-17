import React, {useEffect} from 'react';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import {useAppSelector} from '../../core/store/reduxHelpers';
import {Languages} from './localization';

interface RTLInitializerProps {
  children: React.ReactNode;
}

/**
 * Single owner of the native layout direction.
 *
 * `I18nManager.forceRTL()` is persisted natively and only takes effect on the
 * next launch, so whenever it disagrees with the persisted language preference
 * (`app.isRTL`) — after switching language, or on first launch — this applies
 * the preference and restarts once. Mounted inside `PersistGate`, so the store
 * is already hydrated when it runs.
 */
export const RTLInitializer: React.FC<RTLInitializerProps> = ({children}) => {
  const {language, isRTL} = useAppSelector(state => state.app);
  const shouldBeRTL = isRTL ?? language === Languages.ar;
  const needsRestart = I18nManager.isRTL !== shouldBeRTL;

  useEffect(() => {
    if (!needsRestart) {
      return;
    }
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
    RNRestart.restart();
  }, [needsRestart, shouldBeRTL]);

  return needsRestart ? null : <>{children}</>;
};
