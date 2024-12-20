import {createSlice} from '@reduxjs/toolkit';
import {newState} from '../../../common/utils/newState';

import {appInitialState, AppInitialEntity} from './appState';

export const {reducer: AppReducer, actions} = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {},
});

export const {} = actions;
