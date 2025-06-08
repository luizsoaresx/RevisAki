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
        backgroundColor: colors.brancoBackground,
        paddingHorizontal: 32,
        paddingTop: 20,
    },
    titleContainer: {
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
    cardEllipsisButton: {
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    cardContent: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
        textAlign: 'center',
        color: colors.preto,
        paddingHorizontal: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: colors.azul,
        borderRadius: 30,
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
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

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalBox: {
        width: '80%',
        backgroundColor: colors.azul,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',
        color: colors.brancoComponents,
        marginBottom: 20,
    },
    modalInput: {
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: colors.brancoComponents,
        color: colors.brancoComponents,
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        marginBottom: 24,
        paddingVertical: 6,
    },
    modalButton: {
        backgroundColor: '#003366',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },

    transparentOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    actionMenuBox: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 10,
        flexDirection: 'column',
    },
    deleteButton: {
        backgroundColor: '#E53935',
        borderRadius: 6,
        width: 120,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    editButton: {
        backgroundColor: '#ADD8E6',
        borderRadius: 6,
        width: 120,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonTextDelete: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 12,
        color: 'white',
    },
    actionButtonTextEdit: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 12,
        color: 'black',
    },
});
