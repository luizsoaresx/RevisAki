import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Modal, TextInput, Alert } from "react-native";
import { styles } from "../styles/RevisionScreenStyle";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Dimensions } from "react-native";
// Assuming you have a database utility file, e.g., 'database.js'
// import * as database from '../utils/database'; // You'll need to create this

const { width } = Dimensions.get('window');

export default function RevisionScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_700Bold,
    });

    const [currentCard, setCurrentCard] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Function to fetch flashcards from the database
        const fetchFlashcards = async () => {
            try {
                // This is a placeholder for your database fetching logic.
                // You'll need to replace this with actual database calls.
                // Example using a hypothetical database utility:
                // const cards = await database.getFlashcardsForRevision();
                const dummyCards = [
                    { id: 1, pergunta: 'O que é um vetor?', resposta: 'Um vetor é uma estrutura de dados que armazena uma coleção de elementos do mesmo tipo em posições de memória contíguas.' },
                    { id: 2, pergunta: 'O que é recursão?', resposta: 'Recursão é uma técnica de programação onde uma função chama a si mesma para resolver um problema menor da mesma natureza.' },
                    { id: 3, pergunta: 'Qual a diferença entre lista e tupla em Python?', resposta: 'Listas são mutáveis e tuplas são imutáveis.' },
                ];
                setFlashcards(dummyCards);
                if (dummyCards.length > 0) {
                    setCurrentCard(dummyCards[0]);
                }
            } catch (error) {
                console.error("Error fetching flashcards:", error);
            }
        };

        fetchFlashcards();
    }, []);

    const handleFlipCard = () => {
        setShowAnswer(!showAnswer);
    };

    const handleNextCard = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < flashcards.length) {
            setCurrentIndex(nextIndex);
            setCurrentCard(flashcards[nextIndex]);
            setShowAnswer(false); // Reset to question view for the new card
        } else {
            // Handle end of revision (e.g., navigate back, show a completion message)
            alert('Revisão completa!');
            navigation.goBack();
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    if (!currentCard) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Carregando flashcards...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/logo-revisaki.png')} // Adjust path as needed
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.content}>
                <TouchableOpacity
                    style={[styles.card, showAnswer ? styles.cardAnswer : styles.cardQuestion]}
                    onPress={handleFlipCard} // Allow tapping the card to flip
                >
                    <Text style={styles.cardText}>
                        {showAnswer ? currentCard.resposta : currentCard.pergunta}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={showAnswer ? handleNextCard : handleFlipCard}
                >
                    <Text style={styles.buttonText}>
                        {showAnswer ? (
                            <Ionicons name="arrow-forward" size={24} color="#fff" />
                        ) : (
                            'Ver Resposta'
                        )}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                {/* You can add navigation icons here as per your app's main navigation */}
                <TouchableOpacity style={styles.footerIcon}>
                    <Ionicons name="folder-open-outline" size={28} color="#888" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerIcon}>
                    <Ionicons name="home-outline" size={28} color="#888" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerIcon}>
                    <Ionicons name="person-outline" size={28} color="#888" />
                </TouchableOpacity>
            </View>
        </View>
    );
}