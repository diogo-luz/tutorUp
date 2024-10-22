import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_700Bold,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import Routes from './src/routes';
import AppProvider from './src/hooks';

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <AppProvider>
          <Routes />
          <StatusBar style="light" />
        </AppProvider>
      </NavigationContainer>
    );
  }
}
