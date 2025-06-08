import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./GlobalStyle";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.brancoBackground,
    },
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
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: colors.preto,
        marginBottom: 15,
        marginTop: 20,
    },
    cardCarouselContainer: {
        paddingVertical: 10,
    },
    cardCarouselItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        width: Dimensions.get('window').width * 0.4,
        marginRight: 15,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    cardCarouselTop: {
        backgroundColor: colors.azulClaro,
        height: 25,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 8,
    },
    cardCarouselContent: {
        padding: 10,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardCarouselText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        textAlign: 'center',
        color: colors.preto,
    },
    folderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.azul,
        padding: 16,
        borderRadius: 14,
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    folderText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },
    loadingIndicator: {
        marginTop: 20,
    },
    noDataText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
        color: colors.preto,
        textAlign: 'center',
        marginTop: 20,
    }
});
