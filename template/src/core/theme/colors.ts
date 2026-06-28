/**
 * Customize for your brand – this is the only place to change app colors.
 *
 * Premium "Midnight" black + blue system. Token KEYS are stable (used across the
 * app); only the hex values define the brand. Recolor here to rebrand the whole app.
 * Signature: primary blue #2F6BFF, deep black #06080F, surfaces #0D1124.
 * See `brand.ts` for the gradient + glow tokens that pair with these.
 */
export enum PrimaryColors {
  // Blue ramp (primary). PlatinateBlue_400 is THE primary.
  PlatinateBlue_0 = '#EAF1FF',
  PlatinateBlue_25 = '#D6E4FF',
  PlatinateBlue_50 = '#B6D0FF',
  PlatinateBlue_100 = '#8FB4FF',
  PlatinateBlue_200 = '#6193FF',
  PlatinateBlue_300 = '#3E7BFF',
  PlatinateBlue_400 = '#2F6BFF',
  PlatinateBlue_500 = '#2356D6',
  PlatinateBlue_600 = '#1B45B8',
  PlatinateBlue_700 = '#143186',
  // Black ramp (deep navy-black → near-black). cetaceanBlue_700 is the darkest "ink".
  cetaceanBlue_0 = '#3C4A86',
  cetaceanBlue_25 = '#344078',
  cetaceanBlue_50 = '#2C3768',
  cetaceanBlue_100 = '#232C55',
  cetaceanBlue_200 = '#1A2142',
  cetaceanBlue_300 = '#131934',
  cetaceanBlue_400 = '#0E1228',
  cetaceanBlue_500 = '#0A0E1F',
  cetaceanBlue_600 = '#080B16',
  cetaceanBlue_700 = '#06080F',
  strokeDeactive = '#C9D6FF',
}

export enum NaturalColors {
  // Cool neutral ramp. grayScale_0 = white surface, grayScale_700 = black app bg.
  background_2 = '#F4F6FE',
  grayScale_0 = '#FFFFFF',
  grayScale_25 = '#EAEDF7',
  grayScale_50 = '#D7DCEC',
  grayScale_100 = '#B8C0DA',
  grayScale_200 = '#828BB0',
  grayScale_300 = '#59618A',
  grayScale_400 = '#343C63',
  grayScale_500 = '#1A2142',
  grayScale_600 = '#0D1124',
  grayScale_700 = '#06080F',
  // Cool blue-gray tints.
  naturalColor_0 = '#AAB2DA',
  naturalColor_25 = '#959ECB',
  naturalColor_50 = '#808ABA',
  naturalColor_100 = '#6A74A1',
  naturalColor_200 = '#4F587E',
  naturalColor_300 = '#363D5F',
  naturalColor_400 = '#212744',
  naturalColor_500 = '#161B36',
  naturalColor_600 = '#0D1124',
  naturalColor_700 = '#06080F',
}

export enum AlertColors {
  // Links → blue (matches primary).
  links_0 = '#EAF1FF',
  links_25 = '#D6E4FF',
  links_50 = '#B6D0FF',
  links_100 = '#8FB4FF',
  links_200 = '#6193FF',
  links_300 = '#3E7BFF',
  links_400 = '#2F6BFF',
  links_500 = '#2356D6',
  links_600 = '#1B45B8',
  links_700 = '#143186',
  // Success → mint/teal.
  success_0 = '#D8FBF1',
  success_25 = '#A9F2DC',
  success_50 = '#7FE8C8',
  success_100 = '#54DEB3',
  success_200 = '#2ECE9C',
  success_300 = '#1DB083',
  success_400 = '#0E9C72',
  success_500 = '#0B7D5B',
  success_600 = '#085E45',
  success_700 = '#05402F',
  // Warning → amber.
  warning_0 = '#FFF5E2',
  warning_25 = '#FEE6BC',
  warning_50 = '#FCD795',
  warning_100 = '#FAC76E',
  warning_200 = '#F7B845',
  warning_300 = '#EFA52A',
  warning_400 = '#D98E1E',
  warning_500 = '#AE7116',
  warning_600 = '#835410',
  warning_700 = '#583809',
  // Error → vivid red.
  error_0 = '#FFE7EC',
  error_25 = '#FFC9D4',
  error_50 = '#FFA9BB',
  error_100 = '#FF87A0',
  error_200 = '#FB5E7F',
  error_300 = '#ED3D63',
  error_400 = '#DC2A52',
  error_500 = '#B11E42',
  error_600 = '#851632',
  error_700 = '#590E22',
  // Discover → blue-violet.
  discover_0 = '#ECEBFF',
  discover_25 = '#D6D3FF',
  discover_50 = '#B7B2FF',
  discover_100 = '#9990FF',
  discover_200 = '#7C70FF',
  discover_300 = '#6353F2',
  discover_400 = '#4E3FCC',
  discover_500 = '#3D31A3',
  discover_600 = '#2C2476',
  discover_700 = '#1C174D',
}

export enum BaseColors {
  white = '#FFFFFF',
  black = '#06080F',
  gray = '#828BB0',
  red = '#DC2A52',
  green = '#0E9C72',
  blue = '#2F6BFF',
  yellow = '#D98E1E',
  purple = '#6353F2',
}
