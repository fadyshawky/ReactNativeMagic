import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Appearance, useColorScheme} from 'react-native';
import {Theme, ThemeMode} from './types';
import {darkTheme, lightTheme} from './themes';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
  setThemeMode: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
}) => {
  const systemColorScheme = useColorScheme();
  const resolvedSystem: ThemeMode =
    systemColorScheme === 'dark' ? 'dark' : 'light';
  const [themeMode, setMode] = useState<ThemeMode>(
    initialTheme || resolvedSystem,
  );

  useEffect(() => {
    if (!initialTheme) {
      setMode(systemColorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [systemColorScheme, initialTheme]);

  // A manual choice overrides the native appearance too, so the iOS status bar
  // (view-controller based), keyboard and system alerts match the app theme.
  const setThemeMode = useCallback((mode: ThemeMode) => {
    Appearance.setColorScheme(mode);
    setMode(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  }, [setThemeMode, themeMode]);

  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, setThemeMode}}>
      {children}
    </ThemeContext.Provider>
  );
};
