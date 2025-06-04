import { StyleSheet } from 'react-native';
import { colors } from "./GlobalStyle";

export const menuPopupStyles = {
 optionsContainer: {
    backgroundColor: "transparent",
    shadowColor: "transparent",
    elevation: 0,
    padding: 0,
    margin: 0,
  },
  optionWrapper: {
    paddingHorizontal: 18,
    paddingVertical: 2,
  },
  optionText: {
    fontSize: 16,
    color: "black",
    backgroundColor: colors.azulPastel,
    fontFamily: 'Poppins_500Medium',
    borderRadius: 5,
    paddingVertical: 2,
    textAlign: 'center',
  },
  optionDeleteText: {
    fontSize: 16,
    color: "white",
    backgroundColor: "red",
    fontFamily: 'Poppins_500Medium',
    borderRadius: 5,
    paddingVertical: 2,
    textAlign: 'center',
  },
};