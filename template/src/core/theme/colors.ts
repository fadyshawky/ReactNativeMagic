/**
 * Colors — the Fady Shawky design system (`tokens/colors.css`).
 *
 * A cool navy-tinted slate ramp carries every neutral; electric blue is the
 * ONE accent (primary action, active nav, selected tab, links). Semantic hues
 * are for state only, never decoration. Dark mode is not an inversion:
 * surfaces step UP from the canvas and borders do the structural work.
 *
 * Components read the semantic `ColorTokens` via `useTheme().theme.colors`.
 * The raw ramps are exported for the rare case that needs a fixed value.
 */
export const Slate = {
  0: '#FFFFFF',
  25: '#F9FAFC',
  50: '#F3F5F9',
  100: '#E8ECF3',
  200: '#D8DEE8',
  300: '#BCC5D3',
  400: '#8E99AB',
  500: '#697687',
  600: '#4D5868',
  700: '#39424F',
  800: '#232B36',
  900: '#151B24',
  950: '#0F141C',
  1000: '#0A0D14',
} as const;

export const Blue = {
  50: '#EFF4FE',
  100: '#DCE7FD',
  200: '#BCD0FB',
  300: '#8FB0F8',
  400: '#5C8AF4',
  500: '#3B6EF6',
  600: '#2563EB',
  700: '#1D4FD0',
  800: '#1A42A8',
  900: '#18387F',
} as const;

export const Green = {
  50: '#E8F7F0',
  400: '#22C58A',
  500: '#15A46E',
  900: '#0B3C2A',
} as const;
export const Amber = {
  50: '#FBF3E3',
  400: '#E0A526',
  500: '#C2820B',
  900: '#42300A',
} as const;
export const Red = {
  50: '#FCEDEC',
  400: '#F05A50',
  500: '#D8382F',
  900: '#4A1613',
} as const;

/** Monogram silver gradient stops — brand marks only. */
export const Silver = {hi: '#F3F5F9', mid: '#B9C0CE', lo: '#E6E9F0'} as const;

export interface ColorTokens {
  bgCanvas: string;
  bgSubtle: string;
  bgSunken: string;
  surfaceCard: string;
  surfaceRaised: string;
  surfaceInset: string;
  surfaceOverlay: string;
  surfaceScrim: string;

  borderSubtle: string;
  borderDefault: string;
  borderStrong: string;
  borderAccent: string;

  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textInverse: string;
  textAccent: string;
  textOnAccent: string;

  accent: string;
  accentHover: string;
  accentActive: string;
  accentSubtle: string;
  accentSubtleHover: string;
  accentBorder: string;
  accentRing: string;

  success: string;
  successSubtle: string;
  successFg: string;
  warning: string;
  warningSubtle: string;
  warningFg: string;
  danger: string;
  dangerSubtle: string;
  dangerFg: string;
  dangerHover: string;
  info: string;
  infoSubtle: string;
  infoFg: string;

  hoverVeil: string;
  pressVeil: string;
  selectedVeil: string;
}

export const LightColors: ColorTokens = {
  bgCanvas: Slate[0],
  bgSubtle: Slate[25],
  bgSunken: Slate[50],
  surfaceCard: Slate[0],
  surfaceRaised: Slate[0],
  surfaceInset: Slate[50],
  surfaceOverlay: Slate[0],
  surfaceScrim: 'rgba(10,13,20,0.44)',

  borderSubtle: Slate[100],
  borderDefault: Slate[200],
  borderStrong: Slate[300],
  borderAccent: Blue[600],

  textPrimary: Slate[1000],
  textSecondary: Slate[600],
  textTertiary: Slate[500],
  textDisabled: Slate[400],
  textInverse: Slate[0],
  textAccent: Blue[600],
  textOnAccent: '#FFFFFF',

  accent: Blue[600],
  accentHover: Blue[700],
  accentActive: Blue[800],
  accentSubtle: Blue[50],
  accentSubtleHover: Blue[100],
  accentBorder: Blue[200],
  accentRing: 'rgba(37,99,235,0.28)',

  success: Green[500],
  successSubtle: Green[50],
  successFg: '#0B6B47',
  warning: Amber[500],
  warningSubtle: Amber[50],
  warningFg: '#8A5C07',
  danger: Red[500],
  dangerSubtle: Red[50],
  dangerFg: '#A8231C',
  dangerHover: '#B72A22',
  info: Blue[600],
  infoSubtle: Blue[50],
  infoFg: Blue[800],

  hoverVeil: 'rgba(10,13,20,0.04)',
  pressVeil: 'rgba(10,13,20,0.08)',
  selectedVeil: 'rgba(37,99,235,0.08)',
};

export const DarkColors: ColorTokens = {
  bgCanvas: Slate[1000],
  bgSubtle: '#0D1118',
  bgSunken: '#070A0F',
  surfaceCard: '#111722',
  surfaceRaised: '#161D29',
  surfaceInset: '#0D131C',
  surfaceOverlay: '#151C28',
  surfaceScrim: 'rgba(4,6,10,0.66)',

  borderSubtle: '#1A222F',
  borderDefault: '#232C3B',
  borderStrong: '#313C4D',
  borderAccent: Blue[500],

  textPrimary: '#EEF2F7',
  textSecondary: '#A2AEC0',
  textTertiary: '#7A8798',
  textDisabled: '#525E6E',
  textInverse: Slate[1000],
  textAccent: '#6E96F9',
  textOnAccent: '#FFFFFF',

  accent: Blue[500],
  accentHover: '#5484F8',
  accentActive: '#2E5FE0',
  accentSubtle: 'rgba(59,110,246,0.14)',
  accentSubtleHover: 'rgba(59,110,246,0.22)',
  accentBorder: 'rgba(59,110,246,0.38)',
  accentRing: 'rgba(59,110,246,0.36)',

  success: Green[400],
  successSubtle: 'rgba(34,197,138,0.14)',
  successFg: '#5FE0AE',
  warning: Amber[400],
  warningSubtle: 'rgba(224,165,38,0.14)',
  warningFg: '#F0C465',
  danger: Red[400],
  dangerSubtle: 'rgba(240,90,80,0.14)',
  dangerFg: '#FF8C84',
  dangerHover: '#F4736B',
  info: Blue[500],
  infoSubtle: 'rgba(59,110,246,0.14)',
  infoFg: Blue[300],

  hoverVeil: 'rgba(255,255,255,0.04)',
  pressVeil: 'rgba(255,255,255,0.08)',
  selectedVeil: 'rgba(59,110,246,0.12)',
};
