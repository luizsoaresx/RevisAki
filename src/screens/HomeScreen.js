import React from "react";
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
