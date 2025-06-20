/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {LogBox, SafeAreaView, StatusBar} from 'react-native';
import {SheetProvider} from 'react-native-actions-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {LocalizationProvider} from './src/common/localization/LocalizationProvider';
import {DEFAULT_LANGUAGE} from './src/common/localization/localization';
import {persistor, store} from './src/core/store/store';
import {ThemeProvider, useTheme} from './src/core/theme/ThemeProvider';
import AppNavigator from './src/navigation/MainNavigation';

LogBox.ignoreAllLogs();

const ThemedApp = () => {
  const {theme} = useTheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{position: 'absolute'}} />
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <SheetProvider>
        <AppNavigator />
      </SheetProvider>
    </SafeAreaProvider>
  );
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider initialLanguage={DEFAULT_LANGUAGE}>
          <ThemeProvider initialTheme="dark">
            <ThemedApp />
          </ThemeProvider>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
