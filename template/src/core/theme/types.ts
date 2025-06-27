import {TextStyle} from 'react-native';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    indigoBlue: string;
    mutedLavender: string;
    tintColor: string;
    mutedLavender30: string;
    balanceBackground: string;
    white: string;
    backgroundOpacity: string;
    black: string;
    background: string;
    surface: string;
    card: string;
    shadow: string;
    red: string;
  };
  text: {
    header1: TextStyle;
    header2: TextStyle;
    balanceTitle: TextStyle;
    balanceAmount: TextStyle;
    balanceLabel: TextStyle;
    body1: TextStyle;
    body2: TextStyle;
    button: TextStyle;
    cards: TextStyle;
    SearchBar: TextStyle;
    label: TextStyle;
    hyperlink: TextStyle;
    navBar: TextStyle;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}
