// We extend some of the types here to give us great intellisense

import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';

type Sheet = SheetDefinition;

// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'first-sheet': Sheet;
  }
}

export {};
