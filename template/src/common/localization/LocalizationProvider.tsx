import React, {createContext, useContext, useState, useEffect} from 'react';
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

  // Switching between an LTR and an RTL language restarts the app: the persisted
  // `isRTL` changes and RTLInitializer applies it natively.
  const changeLanguage = (language: Languages) => {
    if (language !== currentLanguage) {
      setCurrentLanguage(language);
      dispatch(setLanguageAction(language));
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
    } catch {
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
