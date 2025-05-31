import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from "expo-font";
import { Ionicons } from '@expo/vector-icons';
import { Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { styles } from "../styles/NewCardScreenStyle";

export default function NewCard({ navigation }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return null;
    }

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

                    <TouchableOpacity onPress={() => navigation.goBack('CardScreen')} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={28} style={styles.backButtonIcon} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Novo Flashcard </Text>
                </View>

                <Text style={styles.label}>Pergunta</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    value={question}
                    onChangeText={setQuestion}
                />

                <Text style={styles.label}>Resposta</Text>
                <TextInput
                    style={styles.inputAnswer}
                    multiline={true}
                    value={answer}
                    onChangeText={setAnswer}
                />

                <TouchableOpacity
                    style={styles.confirmButton}
                >
                    <Text style={styles.confirmText}>Criar Novo Flashcard </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}