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
        backgroundColor: '#21314d',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40, 
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
        backgroundColor: '#ffffff',
    },
    cardAnswer: {
        backgroundColor: '#528BCA', 
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
        display: 'none', 
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
        position: 'absolute', 
        bottom: 0,
        left: 0,
        right: 0,
        height: 120, 
    },
    footerIcon: {
        padding: 10,
    },

    actionButtonFooter: { 
         backgroundColor: '#4285F4',
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)', 
    },
    modalView: {
        margin: 20,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    buttonClose: {
        backgroundColor: "#4285F4", 
    },
    textStyle: {
        color: "white",
        fontFamily: 'Poppins_600SemiBold',
        textAlign: "center",
        fontSize: 16,
    },
});