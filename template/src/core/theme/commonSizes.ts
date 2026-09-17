/**
 * Sizes — spacing, radii, borders, control heights and the type scale from
 * the design system (`tokens/spacing.css`, `radii.css`, `typography.css`).
 * Line height and tracking live on the text roles in `themes.ts`.
 */
// 4px base. Comments give the matching `--space-*` token.
const spacing = {
  none: 0, // space-0
  xSmall: 2, // space-05
  small: 4, // space-1
  medium: 8, // space-2
  large: 12, // space-3
  xLarge: 16, // space-4 — mobile screen gutter
  xLargePlus: 20, // space-5
  xxLarge: 24, // space-6
  xxxLarge: 32, // space-8
  xxxxLarge: 48, // space-12
  xxxxxLarge: 64, // space-16
  xxxxxxLarge: 80, // space-20
};

export const CommonSizes = {
  // Type scale (px).
  font: {
    displayXl: 72,
    displayLg: 56,
    displayMd: 44,
    displaySm: 34,
    h1: 28,
    h2: 22,
    h3: 18,
    h4: 16,
    bodyLg: 17,
    body: 15,
    bodySm: 13,
    caption: 12,
    micro: 11,
  },
  spacing,
  /**
   * Rhythm between components, as the design system's mobile kit lays out
   * screens. Screens compose with these (gaps on the parent, never margins on
   * the child); raw `spacing` is for a component's own insides.
   */
  layout: {
    gutter: spacing.xLarge, // screen side padding
    gutterAuth: spacing.xxLarge, // sign-in, OTP, onboarding
    screenBottom: spacing.xxxLarge, // under the last block
    section: spacing.xLargePlus, // between top-level blocks on a screen
    sectionLoose: spacing.xxLarge, // feed-style screens (home, catalogues)
    stack: spacing.xLarge, // fields and buttons in a form; sheet body
    list: spacing.large, // cards or option rows stacked in a list
    related: 10, // lines inside one block: hero copy, empty state, button pair
    titleToBody: spacing.medium, // heading → its description or content
    field: 6, // label, hint or error ↔ its field
    cardPadding: {
      sm: spacing.large,
      md: spacing.xLargePlus,
      lg: spacing.xxLarge,
    },
    rowMinHeight: 52, // settings / list rows (padding `large` × `xLarge`)
  },
  borderRadius: {
    none: 0,
    xs: 4, // badges, swatches, checkboxes
    sm: 6, // controls: button, input, select, tag
    md: 8, // menu items, small tiles
    lg: 12, // cards, panels
    xl: 16, // dialogs, sheets
    xxl: 24, // marketing blocks
    full: 999, // avatars, status dots, switch knobs, radio marks — never buttons
  },
  borderWidth: {
    hairline: 1, // every surface
    emphasis: 1.5,
  },
  control: {
    sm: 32,
    md: 40,
    lg: 48, // mobile default
  },
  touchMin: 44,
  icon: {
    sm: 16,
    md: 20,
    lg: 24,
    stroke: 1.75,
  },
  tabBarHeight: 56,
};
