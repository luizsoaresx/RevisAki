import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Modal, TextInput, RefreshControl } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Poppins_700Bold, Poppins_500Medium, } from "@expo-google-fonts/poppins";
import { styles } from "../styles/DecksScreenStyle";
import { colors } from "../styles/GlobalStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDeck as createDeckDB, getDecksByUserId } from '../services/database/deck';

export default function DecksScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const [decks, setDecks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [inputError, setInputError] = useState('');

  const loadUserId = async () => {
    try {

      const userId = await AsyncStorage.getItem('currentUserId');
      if (userId) {
        setCurrentUserId(parseInt(userId, 10));
      }

      else {
        navigation.navigate('Login');
      }

    } catch (error) {
      console.error('Erro ao carregar o ID do usuário:', error);
      navigation.navigate('Login');
    }
  };

  const loadDecks = useCallback(async () => {

    if (currentUserId) {
      setRefreshing(true);

      try {
        const userDecks = await getDecksByUserId(currentUserId);
        setDecks(userDecks);
      }

      catch (error) {
        console.error('Erro ao carregar decks:', error);
      }

      finally {
        setRefreshing(false);
      }
    }
  }, [currentUserId]);

  useEffect(() => {
    loadUserId();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (currentUserId) {
        loadDecks();
      }
    }, [currentUserId, loadDecks])
  );

  const createDeck = async () => {
    setInputError('');

    if (newDeckName.trim() === "") {
      setInputError("Digite um nome válido para o deck.");
      return;
    }
    if (!currentUserId) {
      console.error("Tentativa de criar deck sem usuário logado.");
      navigation.navigate('Login');
      return;
    }

    try {
      const newDeckId = await createDeckDB(newDeckName, currentUserId);

      await loadDecks();

      setNewDeckName("");
      setModalVisible(false);

      navigation.navigate("CardsScreen", { deckId: newDeckId, deckName: newDeckName });

    } catch (error) {
      console.error('Erro ao criar deck no banco de dados:', error);
      setInputError('Não foi possível criar o deck. Tente novamente.');
    }
  };

  const renderItem = ({ item }) => (

    <TouchableOpacity
      style={styles.deckItem}
      onPress={() => navigation.navigate("CardsScreen", { deckId: item.id, deckName: item.name })}
    >
      <MaterialIcons name="folder" size={44} color={colors.brancoComponents} />
      <Text style={styles.deckTitle}>{item.name}</Text>
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
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.deckList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadDecks}
              tintColor={colors.azulEscuro}
              colors={[colors.azulEscuro]}
            />
          }
        />

        <TouchableOpacity
          style={styles.newDeck}
          onPress={() => {
            setNewDeckName('');
            setInputError('');
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

            {inputError && <Text style={styles.modalErrorMessage}>{inputError}</Text>}
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