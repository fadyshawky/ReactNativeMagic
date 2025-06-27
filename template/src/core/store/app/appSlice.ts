import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {newState} from '../../../common/utils/newState';
import {Languages} from '../../../common/localization/localization';
import {appInitialState, AppInitialEntity} from './appState';

export const {reducer: AppReducer, actions} = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Languages>) => {
      return newState(state, {
        language: action.payload,
        isRTL: action.payload === Languages.ar,
      });
    },
  },
});

export const {setLanguage} = actions;
