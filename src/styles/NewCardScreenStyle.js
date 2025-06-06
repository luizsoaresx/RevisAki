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

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: -12,
        marginBottom: 12,
    },

    title: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 22,
        fontFamily: 'Poppins_600SemiBold',
        color: colors.azulEscuro,
    },

    deckTitleText: {
        marginTop: 5,
        fontSize: 22,
        fontFamily: 'Poppins_600SemiBold',
        color: colors.azulEscuro,
    },

    backButton: {
        marginRight: 10,
    },

    backButtonIcon: {
        color: colors.azulEscuro

    },

    label: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 2,
        marginTop: 16,
        color: colors.preto,
    },

    input: {
        fontFamily: 'Poppins_500Medium',
        borderWidth: 1,
        borderColor: colors.preto,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        height: 58
    },

    inputAnswer: {
        fontFamily: 'Poppins_500Medium',
        borderWidth: 1,
        borderColor: colors.preto,
        borderRadius: 10,
        paddingHorizontal: 12,
        textAlignVertical: "top",
        height: 100,
    },

    confirmButton: {
        backgroundColor: colors.azulEscuro,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },

    confirmText: {
        color: colors.brancoComponents,
        fontSize: 15,
        fontFamily: 'Poppins_700Bold',
    },

    successMessage: {
        color: '#0CAC4F',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    errorMessage: {
        color: '#D40402',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }

})