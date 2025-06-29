import React, {useEffect, useState} from 'react';
import {I18nManager, Platform, NativeModules} from 'react-native';
import {useAppSelector} from '../../core/store/reduxHelpers';
import {Languages} from './localization';

interface RTLInitializerProps {
  children: React.ReactNode;
}

export const RTLInitializer: React.FC<RTLInitializerProps> = ({children}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const {language, isRTL} = useAppSelector(state => state.app);

  useEffect(() => {
    const initializeRTL = () => {
      console.log('=== RTL Initializer - Starting initialization ===');
      console.log('Stored language:', language);
      console.log('Stored isRTL:', isRTL);
      console.log('Current I18nManager.isRTL:', I18nManager.isRTL);
      console.log('Current I18nManager.forceRTL:', I18nManager.forceRTL);

      // Determine the correct RTL setting with better logic
      let shouldBeRTL: boolean;

      if (isRTL !== undefined) {
        // Use stored RTL setting if available (highest priority)
        shouldBeRTL = isRTL;
        console.log('✅ Using stored isRTL setting:', shouldBeRTL);
      } else if (language) {
        // Use stored language to determine RTL
        shouldBeRTL = language === Languages.ar;
        console.log('✅ Using language-based RTL setting:', shouldBeRTL);
      } else {
        // Fall back to default (Arabic/RTL)
        shouldBeRTL = true;
        console.log('✅ Using default RTL setting:', shouldBeRTL);
      }

      // Apply RTL setting if it differs from current
      if (I18nManager.isRTL !== shouldBeRTL) {
        console.log(
          '🔄 Updating I18nManager RTL from',
          I18nManager.isRTL,
          'to',
          shouldBeRTL,
        );

        // Force the RTL setting
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);

        // Double-check the setting was applied
        setTimeout(() => {
          console.log(
            ' Verification - I18nManager.isRTL after update:',
            I18nManager.isRTL,
          );
          if (I18nManager.isRTL !== shouldBeRTL) {
            console.warn('⚠️ RTL setting was not applied correctly!');
          } else {
            console.log('✅ RTL setting applied successfully');
          }
        }, 100);
      } else {
        console.log(
          '✅ I18nManager RTL setting is already correct:',
          I18nManager.isRTL,
        );
      }

      // Mark as initialized
      setIsInitialized(true);
      console.log('=== RTL Initializer - Initialization complete ===');
    };

    // Wait longer to ensure Redux state is fully hydrated
    // Increased timeout to handle slower devices
    const timer = setTimeout(initializeRTL, 800);
    return () => clearTimeout(timer);
  }, [language, isRTL]);

  // Don't render children until RTL is initialized
  if (!isInitialized) {
    console.log('⏳ RTL Initializer: Waiting for initialization...');
    return null; // or a loading screen
  }

  console.log('🚀 RTL Initializer: Rendering children');
  return <>{children}</>;
};
