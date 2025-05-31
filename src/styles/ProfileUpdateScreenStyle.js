import { StyleSheet } from "react-native";
import { colors } from "./GlobalStyle";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 32,
        paddingTop: 80,
    },

    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        color: colors.azulEscuro
    },

    backButtonIcon: {
        color: colors.azulEscuro
    },

    title: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
        color: colors.azulEscuro,
        marginBottom: 32,
    },

    label: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
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

    passwordContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },

    eyeIcon: {
        marginLeft: -35,
        marginRight: 10,
        color: 'rgb(70, 70, 70)'
    },

    forgotOption: {
        alignItems: 'flex-end',
        marginLeft: 10,
    },

    forgotText: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
        color: colors.azulEscuro,
        marginTop: 5,
    },

    UpdateButton: {
        backgroundColor: colors.azulEscuro,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },

    UpdateText: {
        color: colors.brancoComponents,
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },
});