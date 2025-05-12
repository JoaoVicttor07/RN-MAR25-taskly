import { StyleSheet, Dimensions } from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme'; // Importe o tipo do tema

const { width: screenWidth } = Dimensions.get('window'); // Obtenha a largura da tela

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 25,
    },
    modalContent: {
      backgroundColor: theme.modalBackground || theme.card || '#fff',
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      maxWidth: screenWidth * 0.9, // Defina uma largura máxima (90% da largura da tela)
      width: 'auto', // Permite que a largura se ajuste ao conteúdo dentro do maxWidth
    },
    title: {
      ...Fonts.Roboto50018,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'left',
      alignSelf: 'flex-start',
      color: theme.text || '#000',
    },
    description: {
      ...Fonts.Roboto40016,
      marginBottom: 18,
      color: theme.secondaryText || '#333',
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 12,
      width: '100%', // Garante que os botões ocupem a largura disponível dentro do modalContent
      justifyContent: 'space-between', // Distribui os botões horizontalmente
    },
    cancelButton: {
      backgroundColor: theme.buttonBackground || '#fff',
      borderColor: theme.AvatarButton || '#5B3CC4',
      borderWidth: 2,
      paddingVertical: 10, // Adicione padding vertical para melhor toque
      paddingHorizontal: 15, // Adicione padding horizontal para melhor toque
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    cancelButtonText: {
      color: theme.AvatarButton || '#7b4ae4',
      textAlign: 'center',
      width: '100%', // Garante que o texto ocupe a largura total do botão
    },
    confirmButton: {
      backgroundColor: theme.ModalButtonMenu || '#7b4ae4',
      paddingVertical: 10, // Adicione padding vertical para melhor toque
      paddingHorizontal: 15, // Adicione padding horizontal para melhor toque
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    confirmButtonText: {
      color: theme.buttonText || '#fff',
      textAlign: 'center',
    },
  });

export default getStyles;
