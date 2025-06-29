export interface ShadowConfig {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation?: number; // For Android
}

export interface ElevationShadow {
  primary: ShadowConfig;
  secondary: ShadowConfig;
}

export const Shadows: Record<number, ElevationShadow> = {
  1: {
    primary: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.02, // 2%
      shadowRadius: 1,
      elevation: 1,
    },
    secondary: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.04, // 4%
      shadowRadius: 4,
      elevation: 1,
    },
  },
  2: {
    primary: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.04, // 4%
      shadowRadius: 4,
      elevation: 2,
    },
    secondary: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.08, // 8%
      shadowRadius: 10,
      elevation: 2,
    },
  },
  3: {
    primary: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.04, // 4%
      shadowRadius: 20,
      elevation: 3,
    },
    secondary: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.08, // 8%
      shadowRadius: 32,
      elevation: 3,
    },
  },
  4: {
    primary: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.06, // 6%
      shadowRadius: 20,
      elevation: 4,
    },
    secondary: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 24,
      },
      shadowOpacity: 0.12, // 12%
      shadowRadius: 60,
      elevation: 4,
    },
  },
};

// Helper function to get shadow styles for a specific elevation
export const getShadowStyle = (
  elevation: number,
  useSecondary = false,
): ShadowConfig => {
  const shadow = Shadows[elevation];
  if (!shadow) {
    throw new Error(
      `Elevation ${elevation} is not defined. Available elevations: ${Object.keys(
        Shadows,
      ).join(', ')}`,
    );
  }
  return useSecondary ? shadow.secondary : shadow.primary;
};

// Helper function to get both primary and secondary shadows for an elevation
export const getElevationShadows = (elevation: number): ElevationShadow => {
  const shadow = Shadows[elevation];
  if (!shadow) {
    throw new Error(
      `Elevation ${elevation} is not defined. Available elevations: ${Object.keys(
        Shadows,
      ).join(', ')}`,
    );
  }
  return shadow;
};
