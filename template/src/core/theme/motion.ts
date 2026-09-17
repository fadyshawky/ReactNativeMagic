import {Easing} from 'react-native';

/**
 * Motion — expressive on arrival, tight on interaction (`tokens/motion.css`).
 * Nothing user-triggered takes longer than `base` (220ms). The spring curve
 * is reserved for toggles: switch knobs, checkbox checks, radio dots.
 * Respect reduced motion: pass `Motion.duration.instant`-or-less when
 * `useReducedMotion()` (react-native-reanimated) is true.
 */
export const Motion = {
  duration: {
    instant: 90,
    fast: 140, // hover, press
    base: 220, // toggles, interactive-card lift
    slow: 360,
    reveal: 640, // on-arrival reveals
  },
  stagger: 60,
  easing: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.65, 0, 0.35, 1),
    standard: Easing.bezier(0.2, 0, 0.2, 1),
    spring: Easing.bezier(0.34, 1.56, 0.64, 1),
  },
  revealShift: 18,
  pressScale: 0.97,
} as const;
