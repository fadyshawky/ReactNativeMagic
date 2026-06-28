/**
 * @format
 */
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {useEffect} from 'react';
import {LogBox, StyleSheet, View} from 'react-native';
import {SheetProvider} from 'react-native-actions-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AppStatusBar} from './src/common/components/AppStatusBar';
import {ErrorBoundary} from './src/common/components/ErrorBoundary';
import {NetworkBanner} from './src/common/components/NetworkBanner';
import {SnackbarProvider} from './src/common/components/SnackbarProvider';
import {LocalizationProvider} from './src/common/localization/LocalizationProvider';
import {RTLInitializer} from './src/common/localization/RTLInitializer';
import {startPushNotificationListeners} from './src/core/notifications/notificationService';
import {useAppSelector} from './src/core/store/reduxHelpers';
import {persistor, store} from './src/core/store/store';
import {NaturalColors} from './src/core/theme/colors';
import {ThemeProvider, useTheme} from './src/core/theme/ThemeProvider';
import AppNavigator from './src/navigation/MainNavigation';

LogBox.ignoreAllLogs();

const ThemedApp = () => {
  const {theme} = useTheme();
  const {language} = useAppSelector(state => state.app);

  useEffect(() => {
    const unsubscribe = startPushNotificationListeners();
    return unsubscribe;
  }, []);

  return (
    <RTLInitializer>
      <LocalizationProvider initialLanguage={language}>
        <SafeAreaProvider>
          <View
            style={[
              styles.flex,
              {
                backgroundColor:
                  theme?.colors?.background_2 ?? NaturalColors.background_2,
              },
            ]}>
            <SafeAreaView style={styles.absolute} />
            <AppStatusBar
              barStyle={theme?.mode === 'dark' ? 'light-content' : 'dark-content'}
              backgroundColor={
                theme?.colors?.background_2 ?? NaturalColors.background_2
              }
            />
            <SheetProvider>
              <BottomSheetModalProvider>
                <AppNavigator />
              </BottomSheetModalProvider>
            </SheetProvider>
            <NetworkBanner />
          </View>
        </SafeAreaProvider>
      </LocalizationProvider>
    </RTLInitializer>
  );
};

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={styles.flex}>
            <SnackbarProvider>
              <ThemeProvider>
                <ThemedApp />
              </ThemeProvider>
            </SnackbarProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  absolute: {position: 'absolute'},
});

export default App;
