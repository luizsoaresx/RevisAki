import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { styles } from "../styles/RegisterScreenStyle";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";
import { createUser, getUserByEmail} from '../services/database/user';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_700Bold,
    });

    if (!fontsLoaded){
        return null;
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleRegister = async () => {
        setError('');

        if (!name || !email || ! password || !confirmPassword){
            setError('Por favor, preencha todos os campos.');
            return;
        }

        if (!isValidEmail(email)){
            setError('Por favor, insira um e-mail válido.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (password.length < 6){
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        try {
            const existingUser = await getUserByEmail(email);
            if (existingUser){
                setError('Este e-mail já está cadastrado.');
                return;
            }

            await createUser(name, email, password);

            navigation.navigate('Login');

        } catch (dbError) {
            console.error('Erro ao cadastrar usuário no banco de dados:', dbError);

            if (dbError.message = 'E-mail já está cadastrado.') {
                setError('Este e-mail já está cadastrado.');
            }
            else{
                setError('Ocorreu um erro ao tentar cadastrar. Tente novamente');
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.goBack('Welcome')} 
                style={styles.backButton}
            >
                <Ionicons name="arrow-back" size={24} style={styles.backButtonIcon}/>
            </TouchableOpacity>

            <Text style={styles.title}>Cadastre-se no RevisAki</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Digite seu nome completo"
            />

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
                    placeholder="Digite sua senha (mínimo 6 caracteres)"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        style={styles.eyeIcon}
                        size={24}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholder="Confirme sua senha"
            />

            <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleRegister}
            >
                    <Text style={styles.loginText}>Cadastrar</Text>
            </TouchableOpacity>

            <Text style={styles.register}>
                Já tem uma conta?
                <Text 
                    style={styles.registerLink} 
                    onPress={() => navigation.navigate('Login')}
                >
                    {' '}Fazer Login
                </Text>
            </Text>
        </View>
    )
}