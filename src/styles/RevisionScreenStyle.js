import { StyleSheet, Dimensions } from "react-native"; // Adicione Dimensions aqui
import { colors } from "./GlobalStyle"; // Certifique-se de que GlobalStyle existe e exporta 'colors'

// Obtenha a largura da tela (Screen Width) AQUI!
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    loadingText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 18,
        color: '#333',
    },
    header: {
        backgroundColor: '#21314d',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40, // To account for status bar on iOS
    },
    logo: {
        width: 120,
        height: 40,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: width * 0.85, // Agora 'width' estará definido aqui
        aspectRatio: 16 / 9, // Maintain a consistent aspect ratio
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 30,
    },
    cardQuestion: {
        backgroundColor: '#ffffff',
    },
    cardAnswer: {
        backgroundColor: '#528BCA', // Blue color for the answer side
    },
    cardText: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
        color: '#333',
    },
    actionButton: {
        backgroundColor: '#21314d',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins_500Medium',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    footerIcon: {
        padding: 10,
    },
});