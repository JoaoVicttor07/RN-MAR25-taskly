import React from 'react';
import {View, Text, Image} from 'react-native';
import getStyles from './style'; // Importe a função getStyles
import { useTheme } from '../../Theme/ThemeContext'; // Importe o hook useTheme


const EmptyState: React.FC = () => {

  const { theme } = useTheme(); // Obtenha o tema atual
  const styles = getStyles(theme); // Obtenha os estilos temáticos

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/SadFace.png')}
        resizeMode="contain"
      />
      <Text style={styles.textNoTask}>No momento você não possui tarefa</Text>
    </View>
  );
};

export default EmptyState;
