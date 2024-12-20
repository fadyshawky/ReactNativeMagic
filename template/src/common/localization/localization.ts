import LocalizedStrings from 'react-native-localization';
import {commonLocalization} from './translations/commonLocalization';
import {errorsLocalization} from './translations/errorsLocalization';
import {emptyLocalization} from './translations/emptyLocalization';
import {pagesLocalization} from './translations/pagesLocalization';
import {onboardingLocalization} from './translations/onboardingLocalization';
import {setDateLocale} from './dateFormatter';
import {loginLocalization} from './translations/loginLocalization';
import {homeLocalization} from './translations/homeLocalization';
import {profileLocalization} from './translations/profileLocalization';

export enum Languages {
  en = 'en',
}

export const localization = {
  common: new LocalizedStrings(commonLocalization),
  errors: new LocalizedStrings(errorsLocalization),
  empty: new LocalizedStrings(emptyLocalization),
  pages: new LocalizedStrings(pagesLocalization),
  onboarding: new LocalizedStrings(onboardingLocalization),
  login: new LocalizedStrings(loginLocalization),
  home: new LocalizedStrings(homeLocalization),
  profile: new LocalizedStrings(profileLocalization),
};

export function getLanguage(): string {
  return localization.common.getLanguage();
}

export function getInterfaceLanguage(): string {
  return localization.common.getInterfaceLanguage();
}

export function setLanguage(language?: Languages): void {
  let localizationLanguage: Languages | string | undefined = language;

  if (localizationLanguage == null) {
    localizationLanguage = getLanguage();
  }

  const strings: any = Object.keys(localization);

  for (const key of strings) {
    if ((localization as any)[key].setLanguage) {
      (localization as any)[key].setLanguage(localizationLanguage);
    }
  }

  setDateLocale(localizationLanguage);
}
