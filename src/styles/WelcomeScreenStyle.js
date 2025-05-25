import { StyleSheet } from "react-native";
import { colors } from "./GlobalStyle";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.azul,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 60,
    },

    content: {
        position: 'absolute',
        top: '40%',
        alignItems: 'center',
    },

    logo: {
        width: 400,
        height: 150,
        marginBottom: -32,
    },

    subtitle: {
        color: 'rgba(244, 244, 244, 0.73)',
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
        textAlign: 'center',
    },

    buttonContainer: {
        width: '70%',
    },

    loginButton: {
        backgroundColor: colors.brancoComponents,
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 12,
    },

    loginText: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        color: colors.azulEscuro,
    },

    registerButton: {
        backgroundColor: colors.azulEscuro,
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
    },

    registerText: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        color: colors.brancoComponents
    },
});