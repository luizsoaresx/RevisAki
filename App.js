import { ensureDatabaseReady } from './src/services/database/db';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DecksScreen from "./src/screens/DecksScreen";
import UserProfile from "./src/screens/UserProfileScreen";
import { SafeAreaView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AuthProvider } from './src/services/auth/AuthContext'; 
const Stack = createNativeStackNavigator();

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Inicialize seu banco de dados
        await ensureDatabaseReady();
        setAppReady(true);
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err.message);
      }
    };

    initializeApp();
  }, []);

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Text style={styles.errorTitle}>Oops! Algo deu errado</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorAdvice}>Por favor, reinicie o aplicativo</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!appReady) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Preparando o aplicativo...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AuthProvider> 
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Decks" component={DecksScreen} />
        </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#ff0000',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  errorAdvice: {
    fontSize: 14,
    color: '#666',
  },
});