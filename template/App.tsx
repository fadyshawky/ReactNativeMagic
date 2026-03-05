/**
 * @format
 */
import React from 'react';
import {LogBox, View} from 'react-native';
import {SheetProvider} from 'react-native-actions-sheet';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AppStatusBar} from './src/common/components/AppStatusBar';
import {SnackbarProvider} from './src/common/components/SnackbarProvider';
import {LocalizationProvider} from './src/common/localization/LocalizationProvider';
import {RTLInitializer} from './src/common/localization/RTLInitializer';
import {useAppSelector} from './src/core/store/reduxHelpers';
import {persistor, store} from './src/core/store/store';
import {ThemeProvider, useTheme} from './src/core/theme/ThemeProvider';
import {NaturalColors} from './src/core/theme/colors';
import AppNavigator from './src/navigation/MainNavigation';

LogBox.ignoreAllLogs();

const ThemedApp = () => {
  const {theme} = useTheme();
  const {language} = useAppSelector(state => state.app);

  return (
    <RTLInitializer>
      <LocalizationProvider initialLanguage={language}>
        <SafeAreaProvider>
          <View style={{flex: 1, backgroundColor: theme?.colors?.background_2 ?? NaturalColors.background_2}}>
            <SafeAreaView style={{position: 'absolute'}} />
            <AppStatusBar
              barStyle={theme?.mode === 'dark' ? 'light-content' : 'dark-content'}
              backgroundColor={theme?.colors?.background_2 ?? NaturalColors.background_2}
            />
            <SheetProvider>
              <AppNavigator />
            </SheetProvider>
          </View>
        </SafeAreaProvider>
      </LocalizationProvider>
    </RTLInitializer>
  );
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider>
          <ThemeProvider initialTheme="dark">
            <ThemedApp />
          </ThemeProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
