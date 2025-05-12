import { TouchableOpacity, Text, ImageSourcePropType, Image } from 'react-native';
import styles from './style'; // Renomeei a importação
import { useTheme } from '../../Theme/ThemeContext'; // Importe o useTheme
import React from 'react';
//feito por mim
type Props = {
    title: string;
    icon: ImageSourcePropType;
    onPress?: () => void
  };

  export function CarouselActionItem({ title, icon, onPress }: Props) {

    const { theme } = useTheme(); // Obtenha o tema
    const themedStyles = styles(theme);    // Aplique o tema aos estilos

    return (
      <TouchableOpacity style={themedStyles.container} onPress={onPress} >
        <Text style={themedStyles.title}>{title}</Text>
        <Image source={icon} style={themedStyles.icon} />
      </TouchableOpacity>
    );
 }
