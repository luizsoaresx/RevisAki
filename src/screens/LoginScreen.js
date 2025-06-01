import React, { useState, useContext, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import { styles } from "../styles/LoginScreenStyle";
import { useFonts } from "expo-font";
import { 
  Poppins_600SemiBold, 
  Poppins_500Medium, 
  Poppins_400Regular, 
  Poppins_700Bold 
} from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from '../services/auth/AuthContext';

import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useContext(AuthContext);

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_700Bold,
    });

    // --- CONFIGURAÇÃO DO GOOGLE OAUTH ---
    const scheme = 'meuscheme'; // coloque aqui o scheme do seu app.json (ex: 'myapp')

    const discovery = {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    };

    const [request, response, promptAsync] = AuthSession.useAuthRequest({
      clientId: 'SEU_CLIENT_ID_GOOGLE_AQUI', // substitua aqui pelo seu Client ID Google
      scopes: ['openid', 'profile', 'email'],
      redirectUri: makeRedirectUri({ scheme }),
      responseType: 'code',
    }, discovery);

    useEffect(() => {
      if (response?.type === 'success') {
        const { code } = response.params;
        Alert.alert('Login OAuth bem-sucedido', `Código: ${code}`);
        navigation.navigate('Home');
      }
    }, [response]);
    // -----------------------------------

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        setIsLoading(true);
        
        try {
            const result = await login(email, password);
            
            if (result.success) {
                navigation.navigate('Home');
            } else {
                Alert.alert('Erro no login', result.error || 'Credenciais inválidas');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro durante o login');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!fontsLoaded) {
        return null;
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
                placeholderTextColor="#999"
            />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, {flex: 1}]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#999"
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
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={styles.loginText}>Login</Text>
                )}
            </TouchableOpacity>

            {/* BOTÃO LOGIN GOOGLE */}
            <TouchableOpacity
                style={[styles.loginButton, { backgroundColor: '#4285F4', marginTop: 10 }]}
                disabled={!request}
                onPress={() => promptAsync()}
            >
                <Text style={[styles.loginText, { color: '#fff' }]}>Entrar com Google</Text>
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
