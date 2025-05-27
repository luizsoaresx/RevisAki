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
    paddingTop: 50, 
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  logo: {
        width: 120,
        height: 40,
        resizeMode:'contain',
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
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
    fontFamily: 'Poppins_700Bold',
  },
  screenTitle:{
    color: colors.preto,
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    marginTop: 40,
    marginBottom: 10,
  },
  menuIcon: {
    marginLeft: 'auto',
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
});
