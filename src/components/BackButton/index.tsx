import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import Fonts from '../../Theme/fonts';
import { useTheme } from '../../Theme/ThemeContext';

interface BackButtonProps {
  onPress: () => void;
  rightText?: string; // Texto opcional ao lado do botão
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, rightText }) => {

  const { theme } = useTheme(); // Obtenha o tema
  const themedStyles = getStyles(theme); // Utilize a função getStyles

  return (
    <View style={themedStyles.container}>
      {/* Botão VOLTAR */}
      <TouchableOpacity style={themedStyles.button} onPress={onPress}>
        <View style={themedStyles.iconContainer}>
          <Image
            source={require('../../Assets/icons/VectorBack.png')}
            style={themedStyles.icon}
          />
          <Text style={themedStyles.textButton}>VOLTAR</Text>
        </View>
      </TouchableOpacity>

      {/* Texto abaixo do botão, como 'Termos e regulamentos' */}
      {rightText && <Text style={themedStyles.textRight}>{rightText}</Text>}
    </View>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    width: 329,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:  theme.backButton,
    width: 113,
    height: 48,
    borderRadius: 12,
    padding: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 8,
  },
  textButton: {
    color: theme.buttonText,
    ...Fonts.Roboto50018,
  },
  textRight: {
    color: theme.text,
    ...Fonts.Roboto40016,
  },
});

export default BackButton;
