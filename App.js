import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import TabNavigator from "./src/components/TabNavigator";
import UserProfile from "./src/screens/UserProfileScreen";
import ProfileUpdate from "./src/screens/ProfileUpdateScreen";
import NewCard from "./src/screens/NewCardScreen";
import DecksScreen from "./src/screens/DecksScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
        <Stack.Screen name="NewCard" component={NewCard} />
        <Stack.Screen name="Decks" component={DecksScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
