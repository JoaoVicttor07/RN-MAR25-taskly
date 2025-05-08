import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
      width: '100%',
    },
    title: {
      ...Fonts.Roboto70024,
      color: '#000000',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    leftContainer: {
      // Adicione estilos para posicionar o componente à esquerda, se necessário
      marginRight: 16, // Exemplo de espaçamento entre o botão e o título
    },
    
});

export default styles;