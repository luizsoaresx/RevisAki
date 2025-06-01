import React, { useState, useContext } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import { styles } from "../styles/RegisterScreenStyle";
import { useFonts } from "expo-font";
import { 
  Poppins_600SemiBold, 
  Poppins_500Medium, 
  Poppins_400Regular, 
  Poppins_700Bold 
} from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from '../services/auth/AuthContext';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const { register } = useContext(AuthContext);

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_700Bold,
    });

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
            return;
        }

        setIsLoading(true);
        
        try {
            const result = await register(email, password);
            
            if (result.success) {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
                    { text: 'OK', onPress: () => navigation.navigate('Login') }
                ]);
            } else {
                Alert.alert('Erro no cadastro', result.error || 'Não foi possível completar o cadastro');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro durante o cadastro');
            console.error('Registration error:', error);
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

            <Text style={styles.title}>Cadastre-se no RevisAki</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#999"
            />

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
                    placeholder="Digite sua senha (mínimo 6 caracteres)"
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

            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholder="Confirme sua senha"
                placeholderTextColor="#999"
            />

            <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleRegister}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={styles.loginText}>Cadastrar</Text>
                )}
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