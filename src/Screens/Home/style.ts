import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';

const stylesHome = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.background, // Cor de fundo da tela (dependente do tema)
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: 329,
  },
  title: {
    ...Fonts.Roboto70024,
    color: theme.text, // Cor do texto principal (dependente do tema)
    fontFamily: 'Arial',
  },
  avatar: {
    width: 50,
    height: 50,
  },

  containerNoTask: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    alignSelf: 'center',
  },

  smileSad: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },

  textNoTask: {
    color: theme.secondaryText, // Cor do texto secundário (dependente do tema)
    ...Fonts.Roboto40016,
    marginBottom: 32,
  },

  button: {
    backgroundColor: theme.primaryButton, // Cor de fundo do botão (dependente do tema)
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: 329,
  },
  buttonText: {
    color: theme.buttonText, // Cor do texto do botão (dependente do tema)
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonNavigation: {
    backgroundColor: theme.secondary, // Cor de fundo do botão de navegação (dependente do tema)
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 100,
  },
  buttonTextNavigation: {
    color: theme.text, // Cor do texto do botão de navegação (dependente do tema)
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default stylesHome;
