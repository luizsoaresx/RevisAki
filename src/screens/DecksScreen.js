import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Modal, TextInput, Alert } from "react-native";
import { useFonts } from "expo-font";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Poppins_700Bold, Poppins_500Medium, } from "@expo-google-fonts/poppins";
import { styles } from "../styles/DecksScreenStyle";
import { colors } from "../styles/GlobalStyle";

export default function DecksScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const [decks, setDecks] = useState([]);


  const [modalVisible, setModalVisible] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");

  const createDeck = () => {
    if (newDeckName.trim() === "") {
      Alert.alert("Erro", "Digite um nome válido para o deck.");
      return;
    }

    const newDeck = {
      id: Date.now().toString(),
      title: newDeckName,
    };

    setDecks([...decks, newDeck]);
    setNewDeckName("");
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.deckItem}
      onPress={() =>
        navigation.navigate("FlashCards", { deck: item })
      }
    >
      <MaterialIcons name="folder" size={44} color={colors.brancoComponents} />
      <Text style={styles.deckTitle}>{item.title}</Text>
      <Ionicons
        name="ellipsis-vertical"
        size={24}
        color={colors.brancoComponents}
      />
    </TouchableOpacity>
  );

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.brancoBackground }}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo-revisaki.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.screenTitle}>Minhas Pastas</Text>

        <FlatList
          data={decks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.deckList}
        />

        <TouchableOpacity
          style={styles.newDeck}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={28} color={colors.brancoComponents} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome name="close" size={18} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Novo Deck</Text>
            <TextInput
              placeholder="Digite o nome"
              placeholderTextColor="#EEE"
              style={styles.modalInput}
              value={newDeckName}
              onChangeText={setNewDeckName}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={createDeck}
            >
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}
