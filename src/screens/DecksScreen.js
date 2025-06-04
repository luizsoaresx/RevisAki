import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Modal, TextInput, Alert } from "react-native";
import { useFonts } from "expo-font";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Poppins_700Bold, Poppins_500Medium, } from "@expo-google-fonts/poppins";
import { styles } from "../styles/DecksScreenStyle";
import { colors } from "../styles/GlobalStyle";
import { menuPopupStyles } from "../styles/SubMenuStyle";

export default function DecksScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const [decks, setDecks] = useState([]);


  const [modalVisible, setModalVisible] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingDeckId, setEditingDeckId] = useState(null);

 const saveDeck = () => {
  if (newDeckName.trim() === "") {
    Alert.alert("Erro", "Digite um nome válido para o deck.");
    return;
  }

  if (isEditing) {
    setDecks(prevDecks =>
      prevDecks.map(deck =>
        deck.id === editingDeckId ? { ...deck, title: newDeckName } : deck
      )
    );
  } else {
    const newDeck = {
      id: Date.now().toString(),
      title: newDeckName,
    };
    setDecks([...decks, newDeck]);
  }

  setNewDeckName("");
  setIsEditing(false);
  setEditingDeckId(null);
  setModalVisible(false);
};

const confirmDeleteDeck = (deck) => {
  Alert.alert(
    "Excluir deck",
    `Deseja realmente excluir o deck "${deck.title}"?`,
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setDecks(prev => prev.filter(d => d.id !== deck.id));
        },
      },
    ]
  );
};

    const renderItem = ({ item }) => (
    <View style={styles.deckItem}>
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
      onPress={() =>
        navigation.navigate("CardsScreen", { deck: item })}
    >
      <MaterialIcons name="folder" size={44} color={colors.brancoComponents} />
      <Text style={styles.deckTitle}>{item.title}</Text>
    </TouchableOpacity>

    <Menu>
  <MenuTrigger>
    <Ionicons name="ellipsis-vertical" size={24} color={colors.brancoComponents} />
  </MenuTrigger>

  <MenuOptions customStyles={{
    optionsContainer: menuPopupStyles.optionsContainer,
    optionWrapper: menuPopupStyles.optionWrapper,
  }}>
    <MenuOption
      onSelect={() => {
        setIsEditing(true);
        setEditingDeckId(item.id);
        setNewDeckName(item.title);
        setModalVisible(true);
      }}
    >
      <Text style={menuPopupStyles.optionText}>Alterar nome</Text>
    </MenuOption>

    <MenuOption
      onSelect={() => {
        confirmDeleteDeck(item)
      }}
    >
      <Text style={menuPopupStyles.optionDeleteText}>Excluir</Text>
    </MenuOption>
  </MenuOptions>
</Menu>


  </View>
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
        onPress={() => {
          setIsEditing(false);
          setNewDeckName("");
          setModalVisible(true);
  }}
>
  <Ionicons name="add" size={28} color={colors.brancoComponents} />
</TouchableOpacity>

      </View>

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
    setIsEditing(false);
    setEditingDeckId(null);
    setNewDeckName("");
  }}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalBox}>
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => setModalVisible(false)}
      >
        <FontAwesome name="close" size={18} color={colors.brancoComponents} />
      </TouchableOpacity>

      <Text style={styles.modalTitle}>
        {isEditing ? "Editar Nome do Deck" : "Novo Deck"}
      </Text>

      <TextInput
        placeholder="Digite o nome"
        placeholderTextColor="#EEE"
        style={styles.modalInput}
        value={newDeckName}
        onChangeText={setNewDeckName}
      />

      <TouchableOpacity style={styles.modalButton} onPress={saveDeck}>
        <Text style={styles.modalButtonText}>
          {isEditing ? "Salvar Alterações" : "Salvar"}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


    </View>
  );
}
