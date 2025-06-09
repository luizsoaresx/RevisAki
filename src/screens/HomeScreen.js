import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { styles } from "../styles/HomeScreenStyle";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import CardCarousel from "../components/CardCarousel";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDecksByUserId } from '../services/database/deck'; 
import { getFlashcardsByDeckId } from '../services/database/flashcard'; 
import { colors } from "../styles/GlobalStyle";

export default function HomeScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_700Bold,
    });

    const [recentCards, setRecentCards] = useState([]);
    const [recentDecks, setRecentDecks] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const loadRecentData = useCallback(async () => {
        if (!currentUserId) return;

        setLoading(true);
        try {
            const allUserDecks = await getDecksByUserId(currentUserId);
            const sortedDecks = allUserDecks.sort((a, b) => b.id - a.id);
            setRecentDecks(sortedDecks.slice(0, 3));

            let allUserFlashcards = [];
            for (const deck of allUserDecks) {
                const flashcardsInDeck = await getFlashcardsByDeckId(deck.id);
                const flashcardsWithDeckInfo = flashcardsInDeck.map(card => ({
                    ...card,
                    deckId: deck.id,
                    deckName: deck.name,
                    title: card.question 
                }));
                allUserFlashcards = allUserFlashcards.concat(flashcardsWithDeckInfo);
            }
            const sortedFlashcards = allUserFlashcards.sort((a, b) => b.id - a.id);
            setRecentCards(sortedFlashcards.slice(0, 4));

        } catch (error) {
            console.error('Erro ao carregar dados recentes:', error);
        } finally {
            setLoading(false);
        }
    }, [currentUserId]);

    useEffect(() => {
        loadUserId();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (currentUserId) {
                loadRecentData();
            }
            return () => {
                setRecentCards([]);
                setRecentDecks([]);
            };
        }, [currentUserId, loadRecentData])
    );

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/logo-revisaki.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Flashcards Recentes</Text>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.azulEscuro} style={styles.loadingIndicator} />
                ) : recentCards.length > 0 ? (
                    <CardCarousel cards={recentCards} navigation={navigation} />
                ) : (
                    <Text style={styles.noDataText}>Nenhum flashcard recente.</Text>
                )}


                <Text style={styles.sectionTitle}>Decks Recentes</Text>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.azulEscuro} style={styles.loadingIndicator} />
                ) : recentDecks.length > 0 ? (
                    recentDecks.map((deck) => (
                        <TouchableOpacity
                            key={deck.id.toString()}
                            style={styles.folderButton}
                            onPress={() => navigation.navigate("CardsScreen", { deckId: deck.id, deckName: deck.name })}
                        >
                            <MaterialIcons name="folder" size={32} color="white" style={{ marginRight: 10 }} />
                            <Text style={styles.folderText}>{deck.name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noDataText}>Nenhum deck recente.</Text>
                )}

            </ScrollView>
        </View>
    );
}

