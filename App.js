import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen"
import HomeScreen from "./src/screens/HomeScreen";
import DecksScreen from "./src/screens/DecksScreen";
import { SafeAreaView } from 'react-native';
import React from 'react';


const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator WelcomeRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Decks" component={DecksScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}