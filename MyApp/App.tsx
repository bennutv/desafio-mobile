import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './src/navigation';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/assets/theme';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <AppNavigation />
          </ThemeProvider>
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
