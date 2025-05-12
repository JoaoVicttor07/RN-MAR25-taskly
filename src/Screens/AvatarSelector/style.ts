import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';

const AVATAR_SIZE = 100;
const AVATAR_MARGIN = 12;

const getStyles = (theme: ThemeType) => StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 25,
  },
  content: {
    alignItems: 'center',
    marginBottom: 24,
  },
  textAvatar: {
    color: theme.text,
    marginBottom: 4,
    textAlign: 'center',
    ...Fonts.Roboto70024,
  },
  textPick: {
    color: theme.secondaryText,
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
    backgroundColor: theme.AvatarButton, // Cor de fundo do botão (dependente do tema)
  },
});

export const avatarStyles = StyleSheet.create({ // Estilos específicos para a seção de avatares
  avatarTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: AVATAR_SIZE + AVATAR_MARGIN,
    height: AVATAR_SIZE + AVATAR_MARGIN,
    backgroundColor: '#fff',
  },
  confirmButton: {
    alignSelf: 'center',
    marginTop: 16,
    height: 48,
  },
});

export default getStyles;
