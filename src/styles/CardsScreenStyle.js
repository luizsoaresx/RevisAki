import { StyleSheet } from "react-native";
import { colors } from "./GlobalStyle";

export const styles = StyleSheet.create({

    header: {
        height: 120,
        backgroundColor: colors.azulEscuro,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },

    logo: {
        width: 120,
        height: 40,
        marginBottom: 40,
    },

    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 32,
        paddingTop: 20,
    },

    title: {
        fontSize: 22,
        fontFamily: 'Poppins_700Bold',
        color: colors.preto,
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
        elevation: 5, // para Android
    },


});