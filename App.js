import React, { useEffect } from "react";
import { initDB } from "./src/services/database/db";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ProfileUpdate from "./src/screens/ProfileUpdateScreen";
import TabNavigator from "./src/components/TabNavigator";
import CardsScreen from "./src/screens/CardsScreen";
import RevisionScreen from "./src/screens/RevisionScreen";
import NewCardScreen from "./src/screens/NewCardScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => { initDB(); }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="CardsScreen" component={CardsScreen} />
          <Stack.Screen name="NewCard" component={NewCardScreen} />
          <Stack.Screen name="RevisionScreen" component={RevisionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}