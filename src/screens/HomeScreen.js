import React from "react";
<<<<<<< HEAD
import { TouchableOpacity, Text } from 'react-native';


export default function HomeScreen (){
    <TouchableOpacity
  onPress={() => {
    const db = SQLite.openDatabase('revisaki.db');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users;',
        [],
        (_, { rows }) => {
          console.log('Usuários cadastrados:', rows._array);
        }
      );
    });
  }}
  style={{ padding: 10, backgroundColor: 'blue', marginTop: 20 }}
>
  <Text style={{ color: 'white' }}>Ver usuários no console</Text>
</TouchableOpacity>
}
=======
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { styles } from "../styles/HomeScreenStyle";
import { FontAwesome } from "@expo/vector-icons";
import CardCarousel from "../components/CardCarousel";

export default function HomeScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_700Bold,
    });

    if (!fontsLoaded) return null;

    const folders = ["Python", "Java", "C#"];

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../assets/images/logo-revisaki.png')}
                    style={styles.logo}
                    resizeMode="contain"
                /></View>


            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Cards Recentes</Text>
                <CardCarousel navigation={navigation} style={styles.card}/>

                <Text style={styles.sectionTitle}>Pastas</Text>
                {folders.map((folder) => (
                    <TouchableOpacity
                        key={folder}
                        style={styles.folderButton}
                        onPress={() => navigation.navigate("Decks")}
                    >
                        <FontAwesome name="folder" size={24} color="white" style={{ marginRight: 10 }} />
                        <Text style={styles.folderText}>{folder}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
>>>>>>> 2f8359db5a4e3585d153549b8e3bc7d3d5b7b0e8
