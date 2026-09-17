import {I18nManager, TextStyle} from 'react-native';
import {ColorTokens, DarkColors, LightColors} from './colors';
import {CommonSizes} from './commonSizes';
import {Fonts} from './fonts';
import {DarkShadows, LightShadows} from './shadows';
import {TextRole, Theme} from './types';

const {font} = CommonSizes;

// Under RTL (fixed per launch; RTLInitializer restarts when it changes):
// - iOS aligns natural text by writing direction, not layout direction, so
//   roles carry `writingDirection: 'rtl'` to right-align.
// - Arabic joins its letters, so tracking and uppercase are Latin-only, and
//   Geist Mono has no Arabic glyphs, so worded mono roles use Geist.
const LATIN = !I18nManager.isRTL;

// RN takes absolute px, the tokens are ratios: line-height × size, tracking em × size.
function role(
  fontFamily: string,
  fontSize: number,
  leading: number,
  trackingEm: number,
  color: string,
): TextStyle {
  return {
    fontFamily,
    fontSize,
    lineHeight: Math.round(fontSize * leading),
    letterSpacing: LATIN ? Math.round(fontSize * trackingEm * 100) / 100 : 0,
    color,
    ...(LATIN ? null : {writingDirection: 'rtl' as const}),
  };
}

const DISPLAY = 1.04;
const HEADING = 1.18;
const SNUG = 1.35;
const BODY = 1.55;
const TRACK_DISPLAY = -0.032;
const TRACK_HEADING = -0.018;
const TRACK_BODY = -0.006;
const TRACK_MONO = 0.01;

function textRoles(c: ColorTokens): Record<TextRole, TextStyle> {
  return {
    displayLg: role(
      Fonts.semiBold,
      font.displayLg,
      DISPLAY,
      TRACK_DISPLAY,
      c.textPrimary,
    ),
    displayMd: role(
      Fonts.semiBold,
      font.displayMd,
      DISPLAY,
      TRACK_DISPLAY,
      c.textPrimary,
    ),
    displaySm: role(
      Fonts.semiBold,
      font.displaySm,
      DISPLAY,
      TRACK_DISPLAY,
      c.textPrimary,
    ),
    h1: role(Fonts.semiBold, font.h1, HEADING, TRACK_HEADING, c.textPrimary),
    h2: role(Fonts.semiBold, font.h2, HEADING, TRACK_HEADING, c.textPrimary),
    h3: role(Fonts.medium, font.h3, SNUG, TRACK_HEADING, c.textPrimary),
    h4: role(Fonts.medium, font.h4, SNUG, TRACK_HEADING, c.textPrimary),
    bodyLg: role(Fonts.regular, font.bodyLg, BODY, TRACK_BODY, c.textPrimary),
    body: role(Fonts.regular, font.body, BODY, TRACK_BODY, c.textPrimary),
    bodySm: role(Fonts.regular, font.bodySm, BODY, TRACK_BODY, c.textSecondary),
    label: role(Fonts.medium, font.bodySm, 1.2, TRACK_BODY, c.textSecondary),
    caption: role(Fonts.regular, font.caption, 1.4, TRACK_BODY, c.textTertiary),
    eyebrow: {
      ...role(
        LATIN ? Fonts.monoMedium : Fonts.medium,
        font.micro,
        1.2,
        0.14,
        c.textTertiary,
      ),
      textTransform: LATIN ? 'uppercase' : 'none',
    },
    mono: {
      ...role(Fonts.mono, font.bodySm, 1.45, TRACK_MONO, c.textPrimary),
      fontVariant: ['tabular-nums'],
    },
    amount: {
      ...role(Fonts.monoMedium, font.body, 1.2, TRACK_MONO, c.textPrimary),
      fontVariant: ['tabular-nums'],
    },
  };
}

export const lightTheme: Theme = {
  mode: 'light',
  colors: LightColors,
  text: textRoles(LightColors),
  shadows: LightShadows,
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: DarkColors,
  text: textRoles(DarkColors),
  shadows: DarkShadows,
};
