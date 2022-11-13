import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './src/navigation';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/assets/theme';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <AppNavigation />
        </ThemeProvider>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
