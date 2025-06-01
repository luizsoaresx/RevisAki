import { StyleSheet } from "react-native";

export const colors = {
    azul: "#e4e4e4",
    azulEscuro: "#234E78",
    branco: "#fff",
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.azul,
    },
    header: {
        backgroundColor: colors.azulEscuro,
        padding: 15,
        alignItems: "center",
        paddingTop: 25,
    },
    logo: {
        width: 120,
        height: 40,
        resizeMode: 'contain',
    },
    scrollContent: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: "Poppins_700Bold",
        marginBottom: 10,
        marginTop: 20,
    },
    card: {
        width: 150,
        height: 120,
        backgroundColor: colors.branco,
        borderRadius: 10,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    folderButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.azulEscuro,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    folderText: {
        color: colors.branco,
        fontFamily: "Poppins_500Medium",
        fontSize: 16,
    },
});
