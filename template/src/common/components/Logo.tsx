import React from 'react';
import Svg, {
  Defs,
  G,
  LinearGradient,
  Polygon,
  Rect,
  Stop,
} from 'react-native-svg';
import {Blue, Silver} from '../../core/theme/colors';
import {useTheme} from '../../core/theme/ThemeProvider';

/**
 * Fady Shawky brand marks, drawn from the same geometry as
 * `src/assets/brand/fs-*.svg`: an angular interlocked F and S on a 14° slant.
 * Never re-space, re-colour, re-slant or re-draw it.
 *
 * variants:
 *  - 'mark' (default): contained rounded-square mark, follows the theme
 *    (silver on dark chip in light mode, dark on white chip in dark mode)
 *  - 'mark-silver' | 'mark-white' | 'mark-black' | 'mark-blue': pinned mark
 *  - 'monogram-blue' | 'monogram-white' | 'monogram-black' | 'monogram-silver':
 *    bare monogram for large brand moments. Silver is dark-ground only.
 */
export type LogoVariant =
  | 'mark'
  | 'mark-silver'
  | 'mark-white'
  | 'mark-black'
  | 'mark-blue'
  | 'monogram-blue'
  | 'monogram-white'
  | 'monogram-black'
  | 'monogram-silver';

interface LogoProps {
  /** Width in px; the monogram keeps its 122:64 aspect. */
  size?: number;
  variant?: LogoVariant;
}

const INK = '#10151F';
const SILVER = 'url(#fsSilver)';
const SKEW = Math.tan((-14 * Math.PI) / 180);

// skewX(-14) applied up front: x' = x + tan(-14°)·y.
const POLYGONS = [
  [10, 0, 24, 0, 24, 60, 10, 60],
  [10, 0, 60, 0, 60, 14, 10, 14],
  [10, 23, 52, 23, 52, 37, 10, 37],
  [66, 0, 110, 0, 110, 14, 80, 14, 80, 23, 66, 23],
  [66, 23, 110, 23, 110, 37, 66, 37],
  [96, 37, 110, 37, 110, 60, 56, 60, 56, 46, 96, 46],
].map(p => {
  const pairs: string[] = [];
  for (let i = 0; i < p.length; i += 2) {
    pairs.push(`${(p[i] + SKEW * p[i + 1]).toFixed(3)},${p[i + 1]}`);
  }
  return pairs.join(' ');
});

const MARKS: Record<string, {chip: string; glyph: string}> = {
  'mark-silver': {chip: INK, glyph: SILVER},
  'mark-white': {chip: '#FFFFFF', glyph: INK},
  'mark-black': {chip: INK, glyph: '#FFFFFF'},
  'mark-blue': {chip: Blue[600], glyph: '#FFFFFF'},
};

const MONOGRAMS: Record<string, string> = {
  'monogram-blue': Blue[600],
  'monogram-white': '#FFFFFF',
  'monogram-black': INK,
  'monogram-silver': SILVER,
};

function SilverGradient(): JSX.Element {
  return (
    <Defs>
      <LinearGradient id="fsSilver" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor={Silver.hi} />
        <Stop offset="0.5" stopColor={Silver.mid} />
        <Stop offset="1" stopColor={Silver.lo} />
      </LinearGradient>
    </Defs>
  );
}

function Monogram({fill}: {fill: string}): JSX.Element {
  return (
    <>
      {POLYGONS.map(points => (
        <Polygon key={points} points={points} fill={fill} />
      ))}
    </>
  );
}

export function Logo({size = 96, variant = 'mark'}: LogoProps): JSX.Element {
  const {theme} = useTheme();

  const monogramFill = MONOGRAMS[variant];
  if (monogramFill) {
    return (
      <Svg width={size} height={(size * 64) / 122} viewBox="-8 -2 122 64">
        {monogramFill === SILVER ? <SilverGradient /> : null}
        <Monogram fill={monogramFill} />
      </Svg>
    );
  }

  const resolved =
    variant === 'mark'
      ? theme.mode === 'dark'
        ? 'mark-white'
        : 'mark-silver'
      : variant;
  const {chip, glyph} = MARKS[resolved];
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {glyph === SILVER ? <SilverGradient /> : null}
      <Rect width="100" height="100" rx="22" fill={chip} />
      <G transform="translate(18 26) scale(0.56)">
        <Monogram fill={glyph} />
      </G>
    </Svg>
  );
}
