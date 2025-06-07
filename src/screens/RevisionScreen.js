import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from "react-native";
import { styles } from "../styles/RevisionScreenStyle";
import { useFonts } from "expo-font";
import {
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Ionicons} from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Dimensions } from "react-native";
import { getFlashcardsByDeckId } from "../services/database/flashcard";

export default function RevisionScreen({ route, navigation }) {
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
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showEndReviewModal, setShowEndReviewModal] = useState(false);

  const fetchFlashcards = useCallback(async () => {
    if (!deckId) {
      console.warn(
        "Nenhum Deck ID fornecido para a revisão. Voltando para a tela anterior."
      );
      Alert.alert("Erro de Revisão", "Nenhum deck selecionado para revisão.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
      return;
    }

    try {
      const loadedFlashcards = await getFlashcardsByDeckId(deckId);
      const formattedCards = loadedFlashcards.map((card) => ({
        id: card.id.toString(),
        pergunta: card.question,
        resposta: card.answer,
      }));

      setFlashcards(formattedCards);
      if (formattedCards.length > 0) {
        setCurrentCard(formattedCards[0]);
      } else {
        Alert.alert(
          "Nenhum Flashcard",
          "Este deck não possui flashcards para revisão.",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      }
    } catch (error) {
      console.error(
        `Erro ao buscar flashcards para o Deck ID ${deckId}:`,
        error
      );
      Alert.alert(
        "Erro",
        "Não foi possível carregar os flashcards para revisão. Tente novamente.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  }, [deckId, navigation]);

  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards]);

  const handleFlipCard = () => {
    setShowAnswer(true);
  };

  const handleNextCard = (isCorrect) => {
    setTotalQuestions((prev) => prev + 1);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < flashcards.length) {
      setCurrentIndex(nextIndex);
      setCurrentCard(flashcards[nextIndex]);
      setShowAnswer(false);
    } else {
      setShowEndReviewModal(true);
    }
  };

  const closeEndReviewModal = () => {
    setShowEndReviewModal(false);
    navigation.goBack();
  };
const handleExitReview = () => {
    Alert.alert(
      "Sair da Revisão",
      "Você tem certeza que deseja sair da revisão atual? Seu progresso não será salvo.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: () => navigation.goBack(), 
          style: "destructive", 
        },
      ]
    );
  };
  if (!fontsLoaded) {
    return null;
  }

  if (!currentCard && flashcards.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          {deckId ? "Carregando flashcards..." : "Iniciando revisão..."}
        </Text>
      </View>
    );
  }

  if (!currentCard && flashcards.length > 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Preparando primeiro flashcard...</Text>
      </View>
    );
  }

  const percentageCorrect =
    totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(0) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo-revisaki.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.exitButton} onPress={handleExitReview}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.card,
            showAnswer ? styles.cardAnswer : styles.cardQuestion,
          ]}
          onPress={handleFlipCard}
        >
          <Text style={styles.cardText}>
            {showAnswer ? currentCard.resposta : currentCard.pergunta}
          </Text>
        </TouchableOpacity>

        {showAnswer && (
          <View style={styles.classificationContainer}>
            <Text style={styles.classificationText}>
              Como classifica a sua resposta em relação à pergunta feita
              anteriormente?
            </Text>
            <View style={styles.scoreButtonsContainer}>
              <TouchableOpacity
                style={[styles.scoreButton, styles.wrongButton]}
                onPress={() => handleNextCard(false)}
              >
                <Text style={styles.scoreButtonText}>Errada</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scoreButton, styles.correctButton]}
                onPress={() => handleNextCard(true)}
              >
                <Text style={styles.scoreButtonText}>Certa</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.scoreDisplay}>
              Acertos: {score} / {totalQuestions}
            </Text>
          </View>
        )}

        {!showAnswer && (
          <TouchableOpacity
            style={styles.actionButtonFooter}
            onPress={handleFlipCard}
          >
            <Text style={styles.buttonText}>Ver Resposta</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showEndReviewModal}
        onRequestClose={closeEndReviewModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Revisão Concluída!</Text>
            <Text style={styles.modalText}>
              Você acertou {score} de {totalQuestions} perguntas.
            </Text>
            <Text style={styles.modalText}>
              Percentual de acertos: {percentageCorrect}%
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={closeEndReviewModal}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
