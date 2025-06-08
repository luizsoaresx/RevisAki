import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./GlobalStyle";


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
        backgroundColor: colors.azul,
        paddingTop: 25,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
    },
    logo: {
        width: 120,
        height: 40,
    },

    exitButton: {
        position: 'absolute',
        right: 15,
        top: 25,
        padding: 5,
    },
    exitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: width * 0.85,
        aspectRatio: 16 / 9,
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
        backgroundColor: colors.brancoComponents,
    },
    cardAnswer: {
        backgroundColor: colors.azulClaro,
    },
    cardText: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
        color: '#1F1F1F',
    },
    actionButton: {
        backgroundColor: '#21314d',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        display: 'none',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins_500Medium',
    },

    actionButtonFooter: {
        backgroundColor: colors.azulEscuro,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'center',
        width: width * 0.7,
        alignItems: 'center',
        position: 'absolute',
        bottom: 90,
    },
    classificationContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    classificationText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    scoreButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 20,
    },
    scoreButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrongButton: {
        backgroundColor: '#E02A2A',
    },
    correctButton: {
        backgroundColor: '#28A745',
    },
    scoreButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
    scoreDisplay: {
        fontSize: 18,
        fontFamily: 'Poppins_500Medium',
        color: '#555',
        marginTop: 10,
    },

    centeredView: {
        position: 'absolute',
        top: 32,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        marginBottom: 80,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        fontSize: 22,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 15,
        textAlign: "center",
        color: '#333',
    },
    modalText: {
        marginBottom: 10,
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        textAlign: "center",
        color: '#555',
    },
    buttonClose: {
        borderRadius: 20,
        width: 100,
        padding: 10,
        elevation: 2,
        marginTop: 15,
        backgroundColor: colors.azulClaro,
    },
    textStyle: {
        color: "white",
        fontFamily: 'Poppins_600SemiBold',
        textAlign: "center",
        fontSize: 16,
    },
});