/**
 * Brand tokens that pair with the color ramps in `colors.ts`.
 *
 * Premium "Midnight" black + blue. Gradients are color tuples for
 * react-native-linear-gradient:
 *   <LinearGradient colors={BrandGradients.primary} start={GradientDirection.start} end={GradientDirection.end} />
 * Glow values are ready-to-spread ViewStyle shadows for the elevated, premium look.
 */
import {ViewStyle} from 'react-native';

export const BrandColors = {
  primary: '#2F6BFF',
  primaryDeep: '#1B45B8',
  cyan: '#6193FF', // light-blue accent (legacy key name)
  cyanSoft: '#A6C4FF',
  violet: '#6353F2',
  ink: '#06080F',
  inkSurface: '#0D1124',
  nearWhite: '#F4F6FE',
} as const;

export const BrandGradients = {
  primary: ['#1B45B8', '#3E7BFF'] as string[], // deep blue → bright blue
  midnight: ['#0A1230', '#1B45B8'] as string[], // blue-black → royal (logo chip)
  mark: ['#3E7BFF', '#A6C4FF'] as string[], // bright blue → light (logo mark)
  ink: ['#06080F', '#0D1124'] as string[],
} as const;

export const GradientDirection = {
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
} as const;

export const Glow: Record<'primary' | 'cyan' | 'none', ViewStyle> = {
  primary: {
    shadowColor: '#2F6BFF',
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 8},
    elevation: 12,
  },
  cyan: {
    shadowColor: '#3E7BFF',
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: {width: 0, height: 4},
    elevation: 8,
  },
  none: {},
};
