import React from 'react';
import Svg, {Defs, LinearGradient, Path, Rect, Stop} from 'react-native-svg';

/**
 * Fady Shawky "FS" brand mark — a bold filled F beside a clean S, in a rounded
 * chip. Premium "Midnight" black + blue treatment. Pure geometry (filled rects
 * for the F, one stroked path for the S), so it renders identically in
 * react-native-svg and plain SVG and stays legible at small sizes.
 *
 * variants:
 *  - 'gradient' (default): blue-black chip, blue mark — the primary logo
 *  - 'mono':  dark chip, white mark — for dark UI
 *  - 'light': near-white chip, ink mark — for light UI
 *  - 'mark':  no chip, blue mark — inline / nav usage
 */
export type LogoVariant = 'gradient' | 'mono' | 'light' | 'mark';

interface LogoProps {
  size?: number;
  variant?: LogoVariant;
}

const S_PATH =
  'M101 42 C101 32 91 28 83 28 C73 28 67 35 67 44 C67 52 75 56 84 59 C93 62 101 66 101 76 C101 86 91 91 83 91 C73 91 67 85 66 77';

function chipFill(variant: LogoVariant): string | undefined {
  switch (variant) {
    case 'gradient':
      return 'url(#fsChip)';
    case 'mono':
      return '#0D1124';
    case 'light':
      return '#F4F6FE';
    case 'mark':
      return undefined;
  }
}

function markColor(variant: LogoVariant): string {
  switch (variant) {
    case 'gradient':
      return '#6BA0FF';
    case 'mono':
      return '#FFFFFF';
    case 'light':
      return '#0A1230';
    case 'mark':
      return '#2F6BFF';
  }
}

export function Logo({size = 96, variant = 'gradient'}: LogoProps) {
  const fill = chipFill(variant);
  const c = markColor(variant);
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <Defs>
        <LinearGradient id="fsChip" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#0A1230" />
          <Stop offset="1" stopColor="#1B45B8" />
        </LinearGradient>
      </Defs>
      {fill ? <Rect x="0" y="0" width="120" height="120" rx="30" fill={fill} /> : null}
      <Rect x="25" y="24" width="13" height="72" rx="3" fill={c} />
      <Rect x="25" y="24" width="33" height="13" rx="3" fill={c} />
      <Rect x="25" y="52" width="26" height="12" rx="3" fill={c} />
      <Path
        d={S_PATH}
        stroke={c}
        strokeWidth={13}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
