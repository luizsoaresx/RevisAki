import { StyleSheet } from 'react-native';
import { colors } from "./GlobalStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brancoBackground,
    paddingHorizontal: 20,
    paddingTop: 0,
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
  screenTitle: {
    color: colors.preto,
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    marginTop: 40,
    marginBottom: 10,
  },
  deckItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.azul,
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  deckTitle: {
    color: colors.brancoComponents,
    fontSize: 18,
    marginLeft: 12,
    flex: 1,
    fontFamily: 'Poppins_700Bold',
  },
  newDeck: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: colors.azul,
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
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
});
