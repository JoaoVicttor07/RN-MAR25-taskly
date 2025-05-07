import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';

const AVATAR_SIZE = 100;
const AVATAR_MARGIN = 12;

const styles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background, // Cor de fundo da tela (dependente do tema)
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  content: {
    alignItems: 'center',
    marginBottom: 24,
  },
  textAvatar: {
    color: theme.text, // Cor do texto principal (dependente do tema)
    marginBottom: 4,
    textAlign: 'center',
    ...Fonts.Roboto70024,
  },
  textPick: {
    color: theme.secondary, // Cor do texto secundário (dependente do tema)
    marginBottom: 12,
    textAlign: 'center',
    ...Fonts.Roboto40016,
  },
  avatarsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
    width: '100%',
  },
  confirmButton: {
    alignSelf: 'center',
    marginTop: 16,
    height: 48,
    backgroundColor: theme.primaryButton, // Cor de fundo do botão (dependente do tema)
  },
});

export const avatarStyles = StyleSheet.create({ // Estilos específicos para a seção de avatares
  avatarTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: AVATAR_SIZE + AVATAR_MARGIN,
    height: AVATAR_SIZE + AVATAR_MARGIN,
    backgroundColor: '#fff', // Cor de fundo fixa para os avatares
  },
});

export default styles;
