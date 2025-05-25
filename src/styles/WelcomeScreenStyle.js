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
        top: '20%',
        alignItems: 'center',
    },

    logo: {
        width: 200,
        height: 60,
        marginBottom: 10,
    },

    subtitle: {
        color: colors.brancoComponents,
        fontsize: 14,
        textAlign: 'center', 
        marginTop: 8,
    },

    buttonContainer: {
        width: '80%',
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
        fontWeight: 'Poppins_600SemiBold',
        color: colors.azulEscuro
    },

    registerButton: {
        backgroundColor: colors.brancoComponents,
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
    },

    registerText: {
        fontSize: 16,
        fontWeight: 'Poppins_600SemiBold', 
        color: colors.brancoComponents
    },
});