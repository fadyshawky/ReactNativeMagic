/**
 * Elevation — cool, low shadows (`tokens/elevation.css`). Navy-tinted in
 * light mode, deeper near-black in dark mode where a tint would vanish.
 * Values are RN `boxShadow` strings (New Architecture), spread as
 * `{boxShadow: theme.shadows.sm}`. The 1px border does the structural work;
 * the shadow only hints at layering.
 *
 * Usage: cards `sm`, popovers/menus `md`, sheets `lg`, dialogs `dialog`.
 */
export type ShadowLevel = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'dialog';

export type ShadowTokens = Record<ShadowLevel, string>;

export const LightShadows: ShadowTokens = {
  none: 'none',
  xs: '0 1px 2px rgba(10,13,20,0.05)',
  sm: '0 1px 3px rgba(10,13,20,0.07), 0 1px 2px -1px rgba(10,13,20,0.06)',
  md: '0 4px 12px -3px rgba(10,13,20,0.09), 0 2px 4px -2px rgba(10,13,20,0.05)',
  lg: '0 12px 32px -10px rgba(10,13,20,0.14), 0 4px 10px -4px rgba(10,13,20,0.07)',
  dialog:
    '0 24px 64px -20px rgba(10,13,20,0.24), 0 8px 20px -8px rgba(10,13,20,0.1)',
};

export const DarkShadows: ShadowTokens = {
  none: 'none',
  xs: '0 1px 2px rgba(2,4,8,0.4)',
  sm: '0 1px 3px rgba(2,4,8,0.5), 0 1px 2px -1px rgba(2,4,8,0.4)',
  md: '0 4px 12px -3px rgba(2,4,8,0.6), 0 2px 4px -2px rgba(2,4,8,0.4)',
  lg: '0 12px 32px -10px rgba(2,4,8,0.7), 0 4px 10px -4px rgba(2,4,8,0.5)',
  dialog: '0 24px 64px -20px rgba(0,0,0,0.8), 0 8px 20px -8px rgba(0,0,0,0.6)',
};
