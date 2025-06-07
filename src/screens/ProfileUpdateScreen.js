import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { styles } from "../styles/ProfileUpdateScreenStyle";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getUserById, updateUser } from '../services/database/user'; 

export default function ProfileUpdate({ navigation }) {
    const [userId, setUserId] = useState(null); 
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [isUpdating, setIsUpdating] = useState(false); 
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
                const id = parseInt(storedUserId);
                setUserId(id);
                const fetchedUser = await getUserById(id);

                if (fetchedUser) {
                    setName(fetchedUser.name);
                    setEmail(fetchedUser.email);
                    setUser(fetchedUser);
            
                } else {
                    setError('Usuário não encontrado. Redirecionando para login.');
                    await AsyncStorage.clear();
                    navigation.navigate('Login');
                }
            } else {
                setError('Nenhum usuário logado. Redirecionando para login.');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Erro ao carregar dados do usuário para edição:', error);
            setError('Erro ao carregar dados. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    }, [navigation]);

    useFocusEffect(
        useCallback(() => {
            loadUserData();
            setPassword('');
            setConfirmPassword('');
        }, [loadUserData])
    );

    const handleUpdate = async () => {
        setError('');
        setIsUpdating(true); 

        if (!userId) {
            setError('ID do usuário não encontrado. Por favor, relogue.');
            setIsUpdating(false);
            return;
        }

        if (!name.trim() || !email.trim()) {
            setError('Nome e E-mail não podem ser vazios.');
            setIsUpdating(false);
            return;
        }

        if (password.length > 0 && password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres.');
            setIsUpdating(false);
            return;
        }

        if (password.length > 0 && password !== confirmPassword) {
            setError('A senha e a confirmação de senha não coincidem.');
            setIsUpdating(false);
            return;
        }

        const updates = {};
        if (name.trim() !== user?.name) { 
            updates.name = name.trim();
        }
        
        if (email.trim() !== user?.email) {
            updates.email = email.trim();
        }
        if (password.length > 0) { 
            updates.password = password;
        }

        if (Object.keys(updates).length === 0) {
            Alert.alert('Nenhuma Alteração', 'Nenhuma informação foi alterada para ser salva.');
            setIsUpdating(false);
            return;
        }

        try {
            const success = await updateUser(userId, updates);

            if (success) {
                Alert.alert('Sucesso', 'Suas informações foram atualizadas!');
                
                if (updates.email) {
                    await AsyncStorage.clear(); 
                    navigation.navigate('Login'); 
                    return; 
                }
                navigation.navigate('Perfil'); 
            } else {
                setError('Falha ao atualizar as informações. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            if (e.message.includes('E-mail já cadastrado.')) {
                setError('Este e-mail já está em uso por outro usuário.');
            } else {
                setError('Ocorreu um erro ao salvar as alterações. Tente novamente.');
            }
        } finally {
            setIsUpdating(false);
        }
    };

    if (!fontsLoaded || loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10, fontFamily: 'Poppins_500Medium' }}>Carregando dados...</Text>
            </View>
        );
    }

    if (error && !isUpdating) { 
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Ionicons name="alert-circle-outline" size={50} color="red" />
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 10, fontFamily: 'Poppins_400Regular' }}>{error}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20, padding: 10, backgroundColor: '#007bff', borderRadius: 5 }}>
                    <Text style={{ color: 'white', fontFamily: 'Poppins_500Medium' }}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} style={styles.backButtonIcon} />
            </TouchableOpacity>

            <Text style={styles.title}>Alterar Informações de Cadastro</Text>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Seu nome"
            />
            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Seu e-mail"
            />

            <Text style={styles.label}>Nova Senha</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholder="Deixe em branco para não alterar"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        style={styles.eyeIcon}
                        size={24}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirmar Nova Senha</Text>
            <View>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    placeholder="Confirme sua nova senha"
                />
            </View>

            <TouchableOpacity
                style={styles.UpdateButton}
                onPress={handleUpdate}
                disabled={isUpdating} 
            >
                {isUpdating ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.UpdateText}>Salvar Alterações</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}