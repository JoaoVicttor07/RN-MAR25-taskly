
//.......BackButton............

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../Assets/icons/VectorBack.png')} 
          style={styles.icon}
        />
      </View>
      <Text style={styles.text}>VOLTAR</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#AAAAAA',
    width: 113,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
  icon: {
    width: 16,  // Ajuste conforme o tamanho da sua imagem
    height: 16,
    resizeMode: 'contain',
  },
  text: {
    color: '#F4F4F4',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BackButton;