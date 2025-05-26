import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useFonts } from "expo-font";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { styles } from "../styles/DecksScreenStyle";
import { colors } from "../styles/GlobalStyle";

const decks = [
  { id: '1', title: 'Python' },
  { id: '2', title: 'Java' },
  { id: '3', title: 'C#' },
];

export default function DecksScreen({ navigation }) {

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }
    const renderItem = ({ item }) => (
    <TouchableOpacity 
    style={styles.deckItem}
    onPress={() => navigation.navigate('FlashCards', {deck: item})}
    >
      <MaterialIcons name="folder" size={44} color={colors.brancoComponents}/>
      <Text style={styles.deckTitle}>{item.title}</Text>
       <Ionicons name="ellipsis-vertical" size={24} color={colors.brancoComponents} />
    </TouchableOpacity>
  );
  return(
     <View style={{ flex: 1, backgroundColor: colors.brancoBackground }}>

        <View style={styles.header}>
        <Image source={require('../assets/images/logo-revisaki.png')}
        style={styles.logo}
        resizeMode="contain"
        /></View>
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Meus Decks</Text>
      <FlatList
        data={decks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.deckList}
      />
      <TouchableOpacity style={styles.newDeck}>
        <Ionicons name="add" size={28} color={colors.brancoComponents} />
      </TouchableOpacity>
      </View>
    </View>

    );
}
