import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { store } from './store';
// import { Navigation } from './navigation';

// Custom theme - Travel/Adventure inspired
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4F46E5', // Indigo
    primaryContainer: '#E0E7FF',
    secondary: '#0D9488', // Teal
    secondaryContainer: '#CCFBF1',
    tertiary: '#F59E0B', // Amber (for accents)
    surface: '#FFFFFF',
    background: '#F8FAFC',
    error: '#EF4444',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
  },
  roundness: 12,
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* <ReduxProvider store={store}> */}
          <PaperProvider theme={theme}>
            <StatusBar style="auto" />
            {/* <Navigation /> */}
            {/* Placeholder - Navigation will be implemented */}
          </PaperProvider>
        {/* </ReduxProvider> */}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
