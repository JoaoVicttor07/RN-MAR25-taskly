//Estilos do Menu Principal

import { StyleSheet } from 'react-native';
import Fonts from '../../../Theme/fonts';

const styles = (theme: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 32,
  },

  profileSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },

  avatar: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 12,
  },

  containerInfo: {
    width: '100%',
    alignItems: 'center',
    gap:8,
  },

  profileText: {
    ...Fonts.Roboto40016,
    color: theme.text,
  },

  profileNome: {
    ...Fonts.Roboto50018,
    color: theme.text,
  },

  carouselContainer: {
    marginBottom: 32,
  },

  containerButtons: {
    gap: 16,
    alignItems: 'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.card, // Uma cor para os cards/botões
    padding: 24,
    width: 329,
    height: 72,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonText: {
    ...Fonts.Roboto50018,
    color: theme.primaryText, // Uma cor primária para o texto
  },

  icon: {
    width: 9.75,
    height: 17.25,
    resizeMode: 'contain',
    tintColor: theme.primaryText,
    transform: [{ rotate: '180deg' }],
    marginRight: 3.37,
  },
});

export default styles;
