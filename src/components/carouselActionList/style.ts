import { StyleSheet } from 'react-native';
import { ThemeType } from '../../Theme/theme'; // Importe o tipo do tema

const getStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    wrapper: { // Adicione um nome para o seu container de estilos
      backgroundColor: theme.background,
      // Adicione outras propriedades de estilo que você precisa para o wrapper
    },
    // Você pode adicionar mais objetos de estilo aqui, se necessário
  });
};

export default getStyles;
