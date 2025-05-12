import { TouchableOpacity, Text, Image } from 'react-native';
import getStyles from './style'; // Importe a função de estilos
import { useTheme } from '../../Theme/ThemeContext'; // Importe o useTheme
import React from 'react';

export default function ({ onPress }: { onPress?: () => void }) {

    const { theme } = useTheme(); // Obtenha o tema
    const themedStyles = getStyles(theme); // Aplique o tema aos estilos

    return(
        <TouchableOpacity style={themedStyles.card} onPress={onPress}>
            <Text style={themedStyles.text}>Alterar tema </Text>
            <Image source={require('../../Assets/icons/VectorBack.png')} style={themedStyles.icon}/>
        </TouchableOpacity>
    );//feito
}
