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

  // Update RTL state when stored values change
  useEffect(() => {
    if (storedIsRTL !== undefined) {
      setIsRTL(storedIsRTL);
    } else if (storedLanguage) {
      setIsRTL(storedLanguage === Languages.ar);
    }
  }, [storedLanguage, storedIsRTL]);

  // Set language utility when currentLanguage changes
  useEffect(() => {
    if (currentLanguage) {
      setLanguageUtil(currentLanguage);
    }
  }, [currentLanguage]);

  const changeLanguage = (language: Languages) => {
    if (language !== currentLanguage) {
      console.log('Changing language from', currentLanguage, 'to', language);

      setCurrentLanguage(language);
      dispatch(setLanguageAction(language));

      // Set RTL configuration before restart
      const shouldBeRTL = language === Languages.ar;
      if (I18nManager.isRTL !== shouldBeRTL) {
        console.log('Language change requires RTL update:', shouldBeRTL);
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);

        // Restart the app to apply RTL/LTR changes properly
        setTimeout(() => {
          try {
            if (RNRestart && typeof RNRestart.restart === 'function') {
              RNRestart.restart();
            } else if (Platform.OS === 'android') {
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

      if (keys.length > 1) {
        for (const k of keys) {
          result = result[k];
        }
        return result || key;
      }

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

export const useTranslation = () => {
  const {t} = useLocalization();
  return t;
};

export const useRTL = () => {
  const {isRTL} = useLocalization();
  return isRTL;
};
