import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl, Modal, TextInput, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from "../styles/CardsScreenStyle";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { getFlashcardsByDeckId, deleteFlashcard, updateFlashcard, getFlashcardById } from '../services/database/flashcard';

const CardItem = ({ card, onPressEllipsis }) => {
    const ellipsisRef = useRef(null);
    return (
        <View style={styles.card}>
            <View style={styles.cardTop}>
                <TouchableOpacity
                    ref={ellipsisRef}
                    onPress={(event) => onPressEllipsis(card, ellipsisRef)}
                    style={styles.cardEllipsisButton}
                >
                    <Ionicons name="ellipsis-horizontal" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardText}>{card.title}</Text>
            </View>
        </View>
    );
};

export default function CardsScreen({ route, navigation }) {
    const { deckId, deckName } = route.params;
    const [flashcards, setFlashcards] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [actionMenuVisible, setActionMenuVisible] = useState(false);
    const [selectedFlashcard, setSelectedFlashcard] = useState(null);
    const [actionMenuCoords, setActionMenuCoords] = useState({ top: 0, left: 0 });

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingFlashcardQuestion, setEditingFlashcardQuestion] = useState('');
    const [editingFlashcardAnswer, setEditingFlashcardAnswer] = useState('');

    const [fontsLoaded] = useFonts({
        Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular, Poppins_700Bold,
    });

    const loadFlashcards = useCallback(async () => {
        if (deckId) {
            setRefreshing(true);
            try {
                const loadedFlashcards = await getFlashcardsByDeckId(deckId);
                setFlashcards(loadedFlashcards.map(card => ({
                    id: card.id.toString(),
                    title: card.question,
                    question: card.question,
                    answer: card.answer,
                })));

            } catch (error) {
                console.error(`Erro ao carregar flashcards para o Deck ID ${deckId}:`, error);

            } finally {
                setRefreshing(false);
            }
        }
    }, [deckId]);

    useFocusEffect(useCallback(() => {
        loadFlashcards();
    }, [loadFlashcards]));

    const openActionMenu = (card, ref) => {
        if (!ref.current) return;

        ref.current.measure((fx, fy, width, height, px, py) => {
            const menuWidth = 120;
            const menuHeight = 35 * 2 + 6;

            const topPosition = py + height / 2 - menuHeight / 2;
            const leftPosition = px - menuWidth - 5;

            setActionMenuCoords({ top: topPosition, left: leftPosition });
            setSelectedFlashcard(card);

            if (selectedFlashcard?.id === card.id && actionMenuVisible) {
                setActionMenuVisible(false);
                setSelectedFlashcard(null);
            } else {
                setActionMenuVisible(true);
            }
        });
    };

    const handleDeleteFlashcard = async () => {
        if (!selectedFlashcard) return;

        Alert.alert(
            "Confirmar Exclusão",
            `Tem certeza que deseja excluir este flashcard?`,
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
                            await deleteFlashcard(selectedFlashcard.id);
                            setActionMenuVisible(false);
                            await loadFlashcards();
                            setSelectedFlashcard(null);
                        } catch (error) {
                            console.error('Erro ao excluir flashcard:', error);
                            Alert.alert("Erro", "Não foi possível excluir o flashcard. Tente novamente.");
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true, onDismiss: () => setActionMenuVisible(false) }
        );
    };

    const handleEditFlashcardPress = () => {
        if (!selectedFlashcard) return;
        setEditingFlashcardQuestion(selectedFlashcard.question);
        setEditingFlashcardAnswer(selectedFlashcard.answer);
        setActionMenuVisible(false);
        setEditModalVisible(true);
    };

    const saveEditedFlashcard = async () => {
        if (!selectedFlashcard || editingFlashcardQuestion.trim() === '' || editingFlashcardAnswer.trim() === '') {
            Alert.alert("Erro", "Pergunta e resposta não podem ser vazias.");
            return;
        }
        try {
            await updateFlashcard(selectedFlashcard.id, editingFlashcardQuestion, editingFlashcardAnswer);
            setEditModalVisible(false);
            await loadFlashcards();
            setSelectedFlashcard(null);
            setEditingFlashcardQuestion('');
            setEditingFlashcardAnswer('');
        } catch (error) {
            console.error('Erro ao editar flashcard:', error);
            Alert.alert("Erro", "Não foi possível atualizar o flashcard. Tente novamente.");
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Image source={require('../assets/images/logo-revisaki.png')} style={styles.logo} resizeMode="contain" />
            </View>

            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={28} style={styles.backButtonIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{deckName || 'Meus Cartões'}</Text>
                </View>

                {flashcards.length > 0 ? (
                    <>
                        <TouchableOpacity style={styles.startReviewButton}>
                            <Text style={styles.startReviewText}>Começar revisão</Text>
                        </TouchableOpacity>

                        <FlatList
                            data={flashcards}
                            renderItem={({ item }) => <CardItem card={item} onPressEllipsis={openActionMenu} />}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between', marginTop: 16 }}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={loadFlashcards}
                                    tintColor="#6200EE"
                                    colors={["#6200EE"]}
                                />
                            }
                        />
                    </>
                ) : (
                    <View style={styles.noCardsContainer}>
                        <Text style={styles.noCardsText}>Nenhum flashcard neste deck ainda.</Text>
                        <Text style={styles.noCardsSubText}>Clique no '+' para adicionar um novo.</Text>
                    </View>
                )}

                <TouchableOpacity
                    onPress={() => navigation.navigate("NewCard", { deckId: deckId, deckName: deckName })}
                    style={styles.addButton}
                >
                    <Ionicons name="add" size={32} color="#fff" />
                </TouchableOpacity>
            </View>

            {actionMenuVisible && selectedFlashcard && (
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
                            { top: actionMenuCoords.top, left: actionMenuCoords.left }
                        ]}>
                            <TouchableOpacity
                                onPress={handleDeleteFlashcard}
                                style={styles.deleteButton}
                            >
                                <Text style={styles.actionButtonTextDelete}>Excluir Cartão</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleEditFlashcardPress}
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
                        <Text style={styles.modalTitle}>Editar Flashcard</Text>
                        <TextInput
                            placeholder="Pergunta"
                            placeholderTextColor="#EEE"
                            style={styles.modalInput}
                            value={editingFlashcardQuestion}
                            onChangeText={setEditingFlashcardQuestion}
                        />
                        <TextInput
                            placeholder="Resposta"
                            placeholderTextColor="#EEE"
                            style={styles.modalInput}
                            value={editingFlashcardAnswer}
                            onChangeText={setEditingFlashcardAnswer}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={saveEditedFlashcard}>
                            <Text style={styles.modalButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}