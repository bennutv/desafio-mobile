import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './src/navigation';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/assets/theme';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <AppNavigation />
      </ThemeProvider>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
