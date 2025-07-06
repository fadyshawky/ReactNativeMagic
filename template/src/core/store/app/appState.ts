import {Languages} from '../../../common/localization/localization';

export interface AppInitialEntity {
  language?: Languages;
  isRTL?: boolean;
}

export const appInitialState: AppInitialEntity = {
  language: Languages.en,
  isRTL: false,
};
