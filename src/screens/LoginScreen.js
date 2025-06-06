import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from "../styles/LoginScreenStyle";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authenticateUser } from '../services/database/user';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    
    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const handleLogin = async () => {
        setError('');

        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try{
            const user = await authenticateUser(email, password);

            if (user){
                await AsyncStorage.setItem('currentUserId', String(user.id));
                navigation.navigate('Home');
            }
            else{
                setError('E-mail ou senha inválidos.')
            }
        } catch(dbError) {
            console.error('Erro ao tentar fazer login:', dbError);
            setError('Ocorreu um erro. Tente novamente.');
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.goBack('Welcome')} 
                style={styles.backButton}
            >
                <Ionicons name="arrow-back" size={24} style={styles.backButtonIcon}/>
            </TouchableOpacity>

            <Text style={styles.title}>Faça login na sua conta</Text>

            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Digite seu e-mail"
            />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, {flex: 1}]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholder="Digite sua senha"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        style={styles.eyeIcon}
                        size={24}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.forgotOption}>
                <TouchableOpacity>
                    <Text style={styles.forgotText}>Esqueci minha senha</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleLogin}
            >

                    <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.register}>
                Não tem uma conta?
                <Text 
                    style={styles.registerLink} 
                    onPress={() => navigation.navigate('Register')}
                >
                    {' '}Cadastrar-se
                </Text>
            </Text>
        </View>
    )
}
