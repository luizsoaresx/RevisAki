import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from "../styles/RegisterScreenStyle";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => navigation.goBack('Welcome')} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} style={styles.backButtonIcon} />
            </TouchableOpacity>

            <Text style={styles.title}>Cadastre-se no RevisAki</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
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
            <View>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity 
                style={styles.loginButton}
                onPress={() => navigation.navigate('Home')}
            
            >
                <Text style={styles.loginText}>Cadastar</Text>
            </TouchableOpacity>

            <Text style={styles.register}>
                Já tem uma conta?
                <Text style={styles.registerLink} onPress={() => navigation.navigate('Login')}>{' '}Fazer Login</Text>
            </Text>
        </View>
    )

}