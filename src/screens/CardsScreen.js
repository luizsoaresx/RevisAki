import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from "../styles/CardsScreenStyle";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";
import { getFlashcardsByDeckId } from '../services/database/flashcard';

const CardItem = ({ title }) => (
    <View style={styles.card}>
        <View style={styles.cardTop}>
            <Ionicons name="ellipsis-horizontal" size={18} color="#fff" />
        </View>
        <View style={styles.cardContent}>
            <Text style={styles.cardText}>{title}</Text>
        </View>
    </View>
);

export default function CardsScreen({ route, navigation }) {
    const { deckId, deckName } = route.params;
    const [flashcards, setFlashcards] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [fontsLoaded] = useFonts({
        Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular, Poppins_700Bold,
    });

    const loadFlashcards = useCallback(async () => {
        if (deckId) {
            setRefreshing(true);
            try {
                const loadedFlashcards = await getFlashcardsByDeckId(deckId);
                setFlashcards(loadedFlashcards.map(card => ({
                    id: card.id.toString(), title: card.question
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
                        <TouchableOpacity
                    style={styles.startReviewButton}
                    onPress={() => navigation.navigate("RevisionScreen", { deckId: deckId, deckName: deckName })}>
                    <Text style={styles.startReviewText}>Começar revisão</Text>
                </TouchableOpacity>

                        <FlatList
                            data={flashcards}
                            renderItem={({ item }) => <CardItem title={item.title} />}
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
        </View>
    );
}