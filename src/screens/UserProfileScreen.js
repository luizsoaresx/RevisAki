import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../styles/UserProfileScreenStyle";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import { getUserById } from '../services/database/user';
import { countDecksByUserId } from '../services/database/deck';
import { countFlashcardsByUserId } from '../services/database/flashcard';

export default function UserProfile({ navigation }) {
    const [user, setUser] = useState(null);
    const [deckCount, setDeckCount] = useState(0);
    const [cardCount, setCardCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_700Bold,
    });

    const loadUserData = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
    
            const storedUserId = await AsyncStorage.getItem('currentUserId');
            if (storedUserId) {
                const userId = parseInt(storedUserId);
                const fetchedUser = await getUserById(userId);

                if (fetchedUser) {
                    setUser(fetchedUser);
                    const decks = await countDecksByUserId(userId);
                    const cards = await countFlashcardsByUserId(userId);
                    setDeckCount(decks);
                    setCardCount(cards);
                } else {
                    setError('Usuário não encontrado. Por favor, faça login novamente.');
                    await AsyncStorage.clear();
                    navigation.navigate('Login');
                }

            } else {
                setError('Nenhum usuário logado. Redirecionando para Login.');
                navigation.navigate('Login');
            }
        } catch (e) {
            console.error('Erro ao carregar dados do perfil:', e);
            setError('Erro ao carregar perfil. Tente novamente mais tarde.');

        } finally {
            setLoading(false);
        }
    }, [navigation]);

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [loadUserData])
    );

    const handleLogout = async () => {
        Alert.alert(
            "Sair",
            "Tem certeza que deseja sair?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sair",
                    onPress: async () => {
                        -
                        await AsyncStorage.clear();
                        navigation.navigate('Welcome');
                    }
                }
            ]
        );
    };

    if (!fontsLoaded || loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10, fontFamily: 'Poppins_500Medium' }}>Carregando perfil...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Ionicons name="alert-circle-outline" size={50} color="red" />
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 10, fontFamily: 'Poppins_400Regular' }}>{error}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 20, padding: 10, backgroundColor: '#007bff', borderRadius: 5 }}>
                    <Text style={{ color: 'white', fontFamily: 'Poppins_500Medium' }}>Ir para Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/logo-revisaki.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.container}>
                <View style={styles.profileImageContainer}>
                    <View style={styles.profileImage} />
                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.title}>{user?.name || 'Nome do Usuário'}</Text>
                    <Text style={styles.label}>{user?.email || 'email@example.com'}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statColumn}>
                        <Text style={styles.number}>{deckCount}</Text>
                        <Text style={styles.label}>Decks</Text>
                    </View>
                    <View style={styles.statColumn}>
                        <Text style={styles.number}>{cardCount}</Text>
                        <Text style={styles.label}>Cartões</Text>
                    </View>
                </View>

                <View>
                    <Text style={[styles.title, {marginTop: 10}]}>Informações Adicionais</Text>
                </View>

                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("ProfileUpdate")} style={styles.optionRow}>
                        <Ionicons name="pencil" size={24} style={styles.optionIcon} />
                        <Text style={styles.optionText}>Alterar Informações de Cadastro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionRow}>
                        <Ionicons name="information-circle" size={24} style={styles.optionIcon} />
                        <Text style={styles.optionText}>Sobre</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionRow} onPress={handleLogout}>
                        <Ionicons name="log-out" size={24} style={[styles.optionIcon, { color: '#FF0000' }]} />
                        <Text style={[styles.optionText, { color: '#FF0000' }]}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}