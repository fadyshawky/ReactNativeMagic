import React from 'react';
import {I18nManager, StyleSheet} from 'react-native';
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';

/**
 * Lucide glyphs (v0.469.0, ISC — https://lucide.dev) drawn with react-native-svg.
 * The design system uses Lucide exclusively at a 1.75 stroke, sized 16 inline /
 * 20 in controls and top bars / 24 in nav and empty states. No emoji.
 *
 * To add an icon, copy its node list from lucide.dev (or
 * `lucide-react/dist/esm/icons/<name>.js`) into GLYPHS.
 */
type GlyphNode = ['path' | 'circle' | 'rect', Record<string, string>];

const GLYPHS = {
  house: [
    ['path', {d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8'}],
    [
      'path',
      {
        d: 'M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
      },
    ],
  ],
  'layout-grid': [
    ['rect', {width: '7', height: '7', x: '3', y: '3', rx: '1'}],
    ['rect', {width: '7', height: '7', x: '14', y: '3', rx: '1'}],
    ['rect', {width: '7', height: '7', x: '14', y: '14', rx: '1'}],
    ['rect', {width: '7', height: '7', x: '3', y: '14', rx: '1'}],
  ],
  user: [
    ['path', {d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'}],
    ['circle', {cx: '12', cy: '7', r: '4'}],
  ],
  'arrow-left': [
    ['path', {d: 'm12 19-7-7 7-7'}],
    ['path', {d: 'M19 12H5'}],
  ],
  search: [
    ['circle', {cx: '11', cy: '11', r: '8'}],
    ['path', {d: 'm21 21-4.3-4.3'}],
  ],
  x: [
    ['path', {d: 'M18 6 6 18'}],
    ['path', {d: 'm6 6 12 12'}],
  ],
  'circle-x': [
    ['circle', {cx: '12', cy: '12', r: '10'}],
    ['path', {d: 'm15 9-6 6'}],
    ['path', {d: 'm9 9 6 6'}],
  ],
  check: [['path', {d: 'M20 6 9 17l-5-5'}]],
  'chevron-right': [['path', {d: 'm9 18 6-6-6-6'}]],
  'chevron-left': [['path', {d: 'm15 18-6-6 6-6'}]],
  'chevron-down': [['path', {d: 'm6 9 6 6 6-6'}]],
  eye: [
    [
      'path',
      {
        d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
      },
    ],
    ['circle', {cx: '12', cy: '12', r: '3'}],
  ],
  'eye-off': [
    [
      'path',
      {
        d: 'M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49',
      },
    ],
    ['path', {d: 'M14.084 14.158a3 3 0 0 1-4.242-4.242'}],
    [
      'path',
      {
        d: 'M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143',
      },
    ],
    ['path', {d: 'm2 2 20 20'}],
  ],
} satisfies Record<string, GlyphNode[]>;

export type IconName = keyof typeof GLYPHS;

// Glyphs that point along the reading direction mirror in RTL.
const DIRECTIONAL = new Set<IconName>([
  'arrow-left',
  'chevron-left',
  'chevron-right',
]);

interface IconProps {
  name: IconName;
  /** Defaults to 20 (controls, top bars). */
  size?: number;
  /** Defaults to the theme's secondary text colour. */
  color?: string;
  strokeWidth?: number;
}

export function Icon({
  name,
  size = CommonSizes.icon.md,
  color,
  strokeWidth = CommonSizes.icon.stroke,
}: IconProps): JSX.Element {
  const {theme} = useTheme();
  const stroke = color ?? theme.colors.textSecondary;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={
        I18nManager.isRTL && DIRECTIONAL.has(name) ? styles.mirrored : undefined
      }>
      {(GLYPHS[name] as GlyphNode[]).map(([tag, attrs], i) => {
        switch (tag) {
          case 'circle':
            return <Circle key={i} {...attrs} />;
          case 'rect':
            return <Rect key={i} {...attrs} />;
          default:
            return <Path key={i} d={attrs.d} />;
        }
      })}
    </Svg>
  );
}

const styles = StyleSheet.create({
  mirrored: {transform: [{scaleX: -1}]},
});
