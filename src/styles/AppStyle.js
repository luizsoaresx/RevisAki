import { StyleSheet } from 'react-native';
import { colors } from './GlobalStyle';

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.azul,  
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    color: colors.brancoBackground
  },
});

export default appStyles; 
