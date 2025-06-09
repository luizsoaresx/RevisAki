import { StyleSheet } from "react-native";
import { colors } from "./GlobalStyle";

export const styles = StyleSheet.create({

    header: {
        height: 120,
        backgroundColor: colors.azul,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },

    logo: {
        width: 120,
        height: 40,
        marginBottom: 50,
    },

    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20,
    },

    profileImageContainer: {
        alignItems: 'center',
        marginTop: -60,
    },

    iconWrapper: {
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },

    userInfo: {
        alignItems: 'center',
        marginTop: 10,
    },

    title: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: colors.preto,
    },

    label: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#777',
    },

    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 25,
    },

    statColumn: {
        alignItems: 'center',
    },

    number: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: colors.preto,
    },

    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    optionIcon: {
        marginRight: 10,
        color: colors.azulEscuro,
    },

    optionText: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        color: colors.azulEscuro,
    },
});
