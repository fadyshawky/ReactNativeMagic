import {createSlice} from '@reduxjs/toolkit';

import {appInitialState} from './appState';

export const {reducer: AppReducer, actions} = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {},
});

export const {} = actions;
