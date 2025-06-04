import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from "../styles/CardsScreenStyle";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";
import { menuPopupStyles } from "../styles/SubMenuStyle";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const mockCards = [
    { id: '1', titulo: 'Cartão 1' },
    { id: '2', titulo: 'Cartão 2' },
    { id: '3', titulo: 'Cartão 3' },
    { id: '4', titulo: 'Cartão 4' },
    { id: '5', titulo: 'Cartão 5' },
    { id: '6', titulo: 'Cartão 6' },
    { id: '7', titulo: 'Cartão 7' },
    { id: '8', titulo: 'Cartão 8' },
    { id: '9', titulo: 'Cartão 9' },
    { id: '10', titulo: 'Cartão 10' },
    { id: '11', titulo: 'Cartão 11' },
    { id: '12', titulo: 'Cartão 12' },
];

const CardItem = ({ titulo }) => (
    <View style={styles.card}>
        <View style={styles.cardTop}>
            <Menu>
                <MenuTrigger>
            <Ionicons name="ellipsis-horizontal" size={18} color="#fff" />
                </MenuTrigger>
                <MenuOptions customStyles={{
                    optionsContainer: menuPopupStyles.optionsContainer,
                    optionWrapper: menuPopupStyles.optionWrapper,
                  }}>
                    <MenuOption
                          onSelect={() => {
                            
                          }}
                        >
                          <Text style={menuPopupStyles.optionText}>Editar Card</Text>
                        </MenuOption>
                    
                        <MenuOption
                          onSelect={() => {
                          }}
                        >
                          <Text style={menuPopupStyles.optionDeleteText}>Excluir</Text>
                        </MenuOption>   
                </MenuOptions>
            </Menu>
        </View>
        <View style={styles.cardContent}>
            <Text>{titulo}</Text>
        </View>
    </View>
);


export default function CardsScreen({ navigation }) {

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
                    <TouchableOpacity onPress={() => navigation.goBack('Welcome')} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={28} style={styles.backButtonIcon} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Meus Cartões</Text>
                </View>

                <TouchableOpacity
                    style={styles.startReviewButton}
                >
                    <Text style={styles.startReviewText}>Começar revisão</Text>
                </TouchableOpacity>

                <FlatList
                    data={mockCards}
                    renderItem={({ item }) => <CardItem titulo={item.titulo} />}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between', marginTop: 16 }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

                <TouchableOpacity
                    onPress={() => navigation.navigate("NewCard")} style={styles.addButton}
                >
                    <Ionicons name="add" size={32} color="#fff" />
                </TouchableOpacity>

            </View>
        </View>
    )
}