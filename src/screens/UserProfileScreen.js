import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from "../styles/UserProfileScreenStyle";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";

export default function UserProfile({ navigation }) {

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
                    <Text style={styles.title}>Gustavo Guanabara</Text>
                    <Text style={styles.label}>gustavo.guanabara@gmail.com</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statColumn}>
                        <Text style={styles.number}>X</Text>
                        <Text style={styles.label}>Decks</Text>
                    </View>
                    <View style={styles.statColumn}>
                        <Text style={styles.number}>Y</Text>
                        <Text style={styles.label}>Cartões</Text>
                    </View>
                </View>

                <View>
                    <Text style={[styles.title, {marginTop: 10}]}>Informações Adicionais</Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.optionRow}>
                        <Ionicons name="pencil" size={24} style={styles.optionIcon} />
                        <Text style={styles.optionText}>Alterar Informações de Cadastro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionRow}>
                        <Ionicons name="information-circle" size={24} style={styles.optionIcon} />
                        <Text style={styles.optionText}>Sobre</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionRow}>
                        <Ionicons name="log-out" size={24} style={[styles.optionIcon, { color: '#FF0000' }]} />
                        <Text style={[styles.optionText, { color: '#FF0000' }]}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}