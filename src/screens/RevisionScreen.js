import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native"; // FlatList, Modal, TextInput removidos se não usados
import { styles } from "../styles/RevisionScreenStyle";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Dimensions } from "react-native";
import { getFlashcardsByDeckId } from '../services/database/flashcard'; // <-- CORRIGIDO PARA 'flashcard' (singular)

// *******************************************************************
// IMPORTANTE: VERIFIQUE DUAS VEZES ESTE CAMINHO E O NOME DO ARQUIVO!
// O erro 'Unable to resolve module' geralmente acontece aqui.
// Se seu arquivo se chama 'flashcard.js', mude para '../services/database/flashcard'
// *******************************************************************

const { width } = Dimensions.get('window');

export default function RevisionScreen({ route, navigation }) {
    // Adicione 'route' aos parâmetros do componente para acessar os params de navegação
    // Obtenha deckId e deckName dos parâmetros de rota. O '|| {}' evita erros se route.params for undefined.
    const { deckId, deckName } = route.params || {};

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

    // Função para buscar flashcards do banco de dados
    // Envolvida em useCallback para otimização e uso como dependência em useEffect
    const fetchFlashcards = useCallback(async () => {
        // Verifica se o deckId foi fornecido. Se não, alerta e volta.
        if (!deckId) {
            console.warn("Nenhum Deck ID fornecido para a revisão. Voltando para a tela anterior.");
            Alert.alert("Erro de Revisão", "Nenhum deck selecionado para revisão.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
            return;
        }

        try {
            // Chama a função do seu serviço de banco de dados para obter os flashcards
            const loadedFlashcards = await getFlashcardsByDeckId(deckId);

            // Mapeia os campos do banco de dados (question, answer)
            // para os nomes esperados pela tela (pergunta, resposta)
            const formattedCards = loadedFlashcards.map(card => ({
                id: card.id.toString(), // Converte o ID para string, útil para FlatList (se usar)
                pergunta: card.question, // Mapeia 'question' do DB para 'pergunta' da tela
                resposta: card.answer,   // Mapeia 'answer' do DB para 'resposta' da tela
            }));

            setFlashcards(formattedCards); // Atualiza o estado com os flashcards formatados

            if (formattedCards.length > 0) {
                setCurrentCard(formattedCards[0]); // Define o primeiro flashcard como o atual
            } else {
                // Se não houver flashcards no deck, alerta o usuário
                Alert.alert("Nenhum Flashcard", "Este deck não possui flashcards para revisão.", [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]);
            }
        } catch (error) {
            // Tratamento de erro caso a busca no banco falhe
            console.error(`Erro ao buscar flashcards para o Deck ID ${deckId}:`, error);
            Alert.alert("Erro", "Não foi possível carregar os flashcards para revisão. Tente novamente.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        }
    }, [deckId, navigation]); // Dependências do useCallback: deckId e navigation

    // useEffect para chamar fetchFlashcards quando o componente monta ou fetchFlashcards muda
    useEffect(() => {
        fetchFlashcards();
    }, [fetchFlashcards]);

    const handleFlipCard = () => {
        setShowAnswer(!showAnswer);
    };

    const handleNextCard = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < flashcards.length) {
            setCurrentIndex(nextIndex); // Atualiza o índice do cartão atual
            setCurrentCard(flashcards[nextIndex]); // Define o próximo cartão como o atual
            setShowAnswer(false); // Reseta para mostrar a pergunta no próximo cartão
        } else {
            // Fim da revisão: alerta e volta para a tela anterior
            Alert.alert('Revisão Completa!', 'Você revisou todos os flashcards deste deck.', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        }
    };

    if (!fontsLoaded) {
        return null; // Não renderiza nada enquanto as fontes não carregam
    }

    // Condições de renderização para feedback ao usuário durante o carregamento ou deck vazio
    if (!currentCard && flashcards.length === 0) {
        // Se ainda não há currentCard E a lista de flashcards está vazia (carregando ou deck realmente vazio)
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                    {/* Mensagem mais descritiva com base na presença do deckId */}
                    {deckId ? "Carregando flashcards..." : "Iniciando revisão..."}
                </Text>
            </View>
        );
    }

    // Se currentCard é null, mas flashcards.length > 0 (situação transitória onde os dados foram carregados, mas o primeiro cartão ainda não foi definido no estado)
    if (!currentCard && flashcards.length > 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Preparando primeiro flashcard...</Text>
            </View>
        );
    }

    // Renderização principal dos flashcards
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/logo-revisaki.png')} // Ajuste o caminho conforme necessário
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.content}>
                <TouchableOpacity
                    style={[styles.card, showAnswer ? styles.cardAnswer : styles.cardQuestion]}
                    onPress={handleFlipCard} // Permite tocar no cartão para virar
                >
                    <Text style={styles.cardText}>
                        {showAnswer ? currentCard.resposta : currentCard.pergunta}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    // Ação do botão: ver resposta se ainda não virou, ou próximo cartão se já virou
                    onPress={showAnswer ? handleNextCard : handleFlipCard}
                >
                    <Text style={styles.buttonText}>
                        {showAnswer ? (
                            // Se a resposta está visível, mostra ícone de próxima
                            <Ionicons name="arrow-forward" size={24} color="#fff" />
                        ) : (
                            // Se a pergunta está visível, mostra texto "Ver Resposta"
                            'Ver Resposta'
                        )}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                {/* Ícones de navegação do rodapé, se houver */}
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