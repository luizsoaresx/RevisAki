import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from "expo-font";
import { Ionicons } from '@expo/vector-icons';
import { Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { styles } from "../styles/NewCardScreenStyle";
import { createFlashcard } from '../services/database/flashcard';
import { useFocusEffect } from '@react-navigation/native';

export default function NewCard({ route, navigation }) {
    const { deckId, deckName } = route.params;
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useFocusEffect(
        useCallback(() => {
            return () => {
                setError('');
                setSuccessMessage('');
            };
        }, [])
    );

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return null;
    }

    const handleCreateFlashcard = async () => {
        setError('');
        setSuccessMessage('');

        if (question.trim() === '' || answer.trim() === '') {
            setError('Por favor, preencha a pergunta e a resposta.');
            return;
        }

        if (!deckId) {
            setError('Erro: ID do deck não encontrado. Tente novamente.');
            console.error('Erro: deckId é undefined na NewCardScreen.');
            return;
        }

        try {
            const newFlashcardId = await createFlashcard(deckId, question, answer);

            setSuccessMessage('Flashcard criado com sucesso!');

            setQuestion('');
            setAnswer('');

        } catch (dbError) {
            console.error('Erro ao criar flashcard no banco de dados:', dbError);
            setError('Ocorreu um erro ao salvar o flashcard. Tente novamente.');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/logo-revisaki.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('CardsScreen', {deckId, deckName})} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={28} style={styles.backButtonIcon} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Novo Flashcard </Text>
                    {deckName && <Text style={styles.deckTitleText}>em {deckName}</Text>}
                </View>

                {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

                {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}

                <Text style={styles.label}>Pergunta</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    value={question}
                    onChangeText={setQuestion}
                    placeholder="Ex: Qual é a capital da França?"
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Resposta</Text>
                <TextInput
                    style={styles.inputAnswer}
                    multiline={true}
                    value={answer}
                    onChangeText={setAnswer}
                    placeholder="Ex: Paris"
                    placeholderTextColor="#999"
                />

                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleCreateFlashcard}
                >
                    <Text style={styles.confirmText}>Criar Novo Flashcard</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
