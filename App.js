import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font'; 
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'; 
import appStyles from './src/styles/AppStyles'; 

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold, 
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />; 
  }

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.Text}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
