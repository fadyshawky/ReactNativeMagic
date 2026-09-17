/**
 * Fonts — Geist for everything, Geist Mono for eyebrows, data, code and
 * amounts. No third face. Weights in use: 400 body, 500 labels/UI,
 * 600 headings/display.
 *
 * Values are the static TTF PostScript names. Geist v1.7.2 (SIL OFL) ships in
 * `resources/fonts/`, linked into iOS (`UIAppFonts` + Copy Bundle Resources)
 * and Android (`android/app/src/main/assets/fonts/`) — see
 * docs/CUSTOMIZATION.md → Fonts. Geist has no Arabic glyphs; Arabic text falls
 * back to the platform font.
 */
export const Fonts = {
  regular: 'Geist-Regular',
  medium: 'Geist-Medium',
  semiBold: 'Geist-SemiBold',
  mono: 'GeistMono-Regular',
  monoMedium: 'GeistMono-Medium',
} as const;
