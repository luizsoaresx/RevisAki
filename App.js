import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import appStyles from './src/styles/AppStyle';

export default function App() {
  return (
    <View style={appStyles.container}>
      <Text style={appStyles.Text}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
