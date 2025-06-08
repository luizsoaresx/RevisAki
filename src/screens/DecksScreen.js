import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Modal, TextInput, RefreshControl, Alert } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Poppins_700Bold, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { styles } from "../styles/DecksScreenStyle";
import { colors } from "../styles/GlobalStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDeck as createDeckDB, getDecksByUserId, deleteDeck, updateDeck } from '../services/database/deck';

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

  const [selectedDeck, setSelectedDeck] = useState(null);
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const loadUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('currentUserId');
      if (userId) {
        setCurrentUserId(parseInt(userId, 10));
      } else {
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
      } catch (error) {
        console.error('Erro ao carregar decks:', error);
      } finally {
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

    try {
      const newDeckId = await createDeckDB(newDeckName, currentUserId);
      await loadDecks();
      setNewDeckName("");
      setModalVisible(false);

      navigation.navigate("CardsScreen", { deckId: newDeckId, deckName: newDeckName, key: `cards-screen-${newDeckId}-${Date.now()}` });
    } catch (error) {
      console.error('Erro ao criar deck no banco de dados:', error);
      setInputError('Não foi possível criar o deck. Tente novamente.');
    }
  };

  const openActionMenu = (deck, event) => {
    const { pageX, pageY } = event.nativeEvent;

    setSelectedDeck(deck);
    setMenuPosition({ x: pageX, y: pageY });

    if (selectedDeck?.id === deck.id && actionMenuVisible) {
      setActionMenuVisible(false);
      setSelectedDeck(null);
    } else {
      setActionMenuVisible(true);
    }
  };

  const handleDeleteDeck = async () => {
    if (!selectedDeck) return;

    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir o deck "${selectedDeck.name}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => setActionMenuVisible(false)
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await deleteDeck(selectedDeck.id);
              setActionMenuVisible(false);
              await loadDecks();
              setSelectedDeck(null);
            } catch (error) {
              console.error('Erro ao excluir deck:', error);
              Alert.alert("Erro", "Não foi possível excluir o deck. Tente novamente.");
            }
          },
          style: "destructive"
        }
      ],
      { cancelable: true, onDismiss: () => setActionMenuVisible(false) }
    );
  };

  const handleEditDeck = async () => {
    if (!selectedDeck || editName.trim() === '') {
      Alert.alert("Erro", "O nome do deck não pode ser vazio.");
      return;
    }
    try {
      await updateDeck(selectedDeck.id, editName);
      setEditModalVisible(false);
      setActionMenuVisible(false);
      await loadDecks();
      setSelectedDeck(null);
      setEditName('');
    } catch (error) {
      console.error('Erro ao editar deck:', error);
      Alert.alert("Erro", "Não foi possível atualizar o nome do deck. Tente novamente.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.deckItem}>
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
        onPress={() => navigation.navigate("CardsScreen", { deckId: item.id, deckName: item.name })}
      >
        <MaterialIcons name="folder" size={44} color={colors.brancoComponents} />
        <Text style={styles.deckTitle}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={(event) => openActionMenu(item, event)} style={styles.ellipsisButton}>
        <Ionicons name="ellipsis-vertical" size={24} color={colors.brancoComponents} />
      </TouchableOpacity>
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
        <Text style={styles.screenTitle}>Meus Decks</Text>

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
          <Ionicons name="add" size={32} color={colors.brancoComponents} />
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
            <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
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
            <TouchableOpacity style={styles.modalButton} onPress={createDeck}>
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {actionMenuVisible && selectedDeck && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={actionMenuVisible}
          onRequestClose={() => setActionMenuVisible(false)}
        >
          <TouchableOpacity
            style={styles.transparentOverlay}
            activeOpacity={1}
            onPress={() => setActionMenuVisible(false)}
          >
            <View style={[
              styles.actionMenuBox,
              {
                top: menuPosition.y - 60,
                left: menuPosition.x - 130,
              }
            ]}>
              <TouchableOpacity
                onPress={handleDeleteDeck}
                style={styles.deleteButton}
              >
                <Text style={styles.actionButtonTextDelete}>Excluir Deck</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEditName(selectedDeck?.name || '');
                  setActionMenuVisible(false);
                  setEditModalVisible(true);
                }}
                style={styles.editButton}
              >
                <Text style={styles.actionButtonTextEdit}>Alterar Nome</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => setEditModalVisible(false)}>
              <FontAwesome name="close" size={18} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Editar Nome do Deck</Text>
            <TextInput
              value={editName}
              onChangeText={setEditName}
              placeholder="Novo nome"
              placeholderTextColor="#EEE"
              style={styles.modalInput}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleEditDeck}>
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
