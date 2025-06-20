import React, {createContext, useContext, useState, useEffect} from 'react';
import {I18nManager, Platform, NativeModules} from 'react-native';
import RNRestart from 'react-native-restart';
import {
  localization,
  Languages,
  setLanguage as setLanguageUtil,
  getInterfaceLanguage,
  DEFAULT_LANGUAGE,
} from './localization';
import {useAppDispatch, useAppSelector} from '../../core/store/reduxHelpers';
import {setLanguage as setLanguageAction} from '../../core/store/app/appSlice';

interface LocalizationContextType {
  currentLanguage: Languages;
  changeLanguage: (language: Languages) => void;
  t: (key: string, section?: keyof typeof localization) => string;
  isRTL: boolean;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined,
);

interface LocalizationProviderProps {
  children: React.ReactNode;
  initialLanguage?: Languages;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
  initialLanguage,
}) => {
  const dispatch = useAppDispatch();
  const {language: storedLanguage, isRTL: storedIsRTL} = useAppSelector(
    state => state.app,
  );

  const [currentLanguage, setCurrentLanguage] = useState<Languages>(
    storedLanguage ||
      initialLanguage ||
      (getInterfaceLanguage() as Languages) ||
      DEFAULT_LANGUAGE,
  );
  const [isRTL, setIsRTL] = useState<boolean>(
    storedIsRTL !== undefined ? storedIsRTL : currentLanguage === Languages.ar,
  );

  useEffect(() => {
    setLanguageUtil(currentLanguage);
    setIsRTL(currentLanguage === Languages.ar);

    // Force app restart on Android when changing RTL/LTR
    if (Platform.OS === 'android') {
      const shouldBeRTL = currentLanguage === Languages.ar;
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
      }
    }
  }, [currentLanguage]);

  const changeLanguage = (language: Languages) => {
    // Only restart if the language is actually changing
    if (language !== currentLanguage) {
      setCurrentLanguage(language);
      dispatch(setLanguageAction(language));

      // Set RTL configuration before restart
      const shouldBeRTL = language === Languages.ar;
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);

        // Restart the app to apply RTL/LTR changes properly
        // Small delay to ensure settings are applied
        setTimeout(() => {
          try {
            // Check if RNRestart is available
            if (RNRestart && typeof RNRestart.restart === 'function') {
              RNRestart.restart();
            } else if (Platform.OS === 'android') {
              // Fallback for Android using DevSettings
              const DevSettings = NativeModules.DevSettings;
              if (DevSettings && DevSettings.reload) {
                DevSettings.reload();
              }
            }
          } catch (error) {
            console.error('Failed to restart the app:', error);
          }
        }, 100);
      }
    }
  };

  // Helper function to get translations
  const t = (
    key: string,
    section: keyof typeof localization = 'common',
  ): string => {
    try {
      const keys = key.split('.');
      let result: any = localization[section];

      // If the key has dot notation (e.g., 'registration.title'), navigate through the object
      if (keys.length > 1) {
        for (const k of keys) {
          result = result[k];
        }
        return result || key;
      }

      // Simple key
      return result[key] || key;
    } catch (error) {
      console.warn(
        `Translation not found for key: ${key} in section: ${section}`,
      );
      return key;
    }
  };

  return (
    <LocalizationContext.Provider
      value={{currentLanguage, changeLanguage, t, isRTL}}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      'useLocalization must be used within a LocalizationProvider',
    );
  }
  return context;
};

// Shorthand hook for translations
export const useTranslation = () => {
  const {t} = useLocalization();
  return t;
};

// Hook to get RTL status
export const useRTL = () => {
  const {isRTL} = useLocalization();
  return isRTL;
};
