import { StyleSheet } from "react-native";
import { colors } from "./GlobalStyle";

export const styles = StyleSheet.create({

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
        resizeMode: 'contain',
    },

    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 32,
        paddingTop: 20,
    },

    titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginLeft: -12,
    },

    title: {
        marginTop: 5,
        fontSize: 22,
        fontFamily: 'Poppins_700Bold',
        color: colors.preto,
    },

    backButton: {
        marginRight: 10,
    },

    backButtonIcon: {
        color: colors.azulEscuro

    },

    startReviewButton: {
        backgroundColor: colors.azulEscuro,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
    },

    startReviewText: {
        color: colors.brancoComponents,
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        flex: 1,
        minWidth: '45%',
        maxWidth: '48%',
        overflow: 'hidden'
    },

    cardTop: {
        backgroundColor: colors.azulClaro,
        height: 30,
        justifyContent: 'center',
        paddingHorizontal: 8,
        alignItems: 'flex-end',
    },

    cardContent: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },

    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: colors.azulEscuro,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,

    },
        noCardsContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    noCardsText: {
        fontFamily: 'Poppins_600SemiBold', 
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        marginBottom: 10,
    },

    noCardsSubText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
    },

});