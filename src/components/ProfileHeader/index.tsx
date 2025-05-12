import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import getStyles from './style'; // Importe a função de estilos com tema
import { useTheme } from '../../Theme/ThemeContext'; // Importe o hook useTheme

type ProfileHeaderProps = {
  title: string;
  onBackPress: () => void;
};
//feito?
export default function ProfileHeader({ title, onBackPress }: ProfileHeaderProps) {
  const { theme } = useTheme(); // Use o hook para acessar o tema atual
  const styles = getStyles(theme); // Obtenha os estilos com base no tema

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}>
        <Image source={require('../../Assets/icons/VectorBack.png')} />
        <Text style={styles.backText}>VOLTAR</Text>
      </TouchableOpacity>
      <Text style={styles.editText}>{title}</Text>
    </View>
  );
}
