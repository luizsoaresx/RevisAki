import React from "react";
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { useFonts } from "expo-font";
import {Poppins_600SemiBold, Poppins_400Regular} from '@expo-google-fonts/poppins';
import { styles } from "../styles/WelcomeScreenStyle";

export default function WelcomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image 
                    source={require('../assets/images/logo-revisaki.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text>
                    Você está a um flashcard do seu{'\n'}próximo avanço.
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text styles={styles.registerText}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}