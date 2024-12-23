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
import {persistor, store} from './src/core/store/store';
import AppNavigator from './src/navigation/MainNavigation';

LogBox.ignoreAllLogs();
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <SafeAreaView style={{position: 'absolute'}} />
          <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
          <SheetProvider>
            <AppNavigator />
          </SheetProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
