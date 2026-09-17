import {TextStyle} from 'react-native';
import {ColorTokens} from './colors';
import {ShadowTokens} from './shadows';

export type ThemeMode = 'light' | 'dark';

/**
 * Text roles from `tokens/typography.css`. Sentence case everywhere — the
 * mono `eyebrow` is the only uppercase in the system.
 */
export type TextRole =
  | 'displayLg'
  | 'displayMd'
  | 'displaySm'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bodyLg'
  | 'body'
  | 'bodySm'
  | 'label'
  | 'caption'
  | 'eyebrow'
  | 'mono'
  | 'amount';

export interface Theme {
  mode: ThemeMode;
  colors: ColorTokens;
  text: Record<TextRole, TextStyle>;
  shadows: ShadowTokens;
}
