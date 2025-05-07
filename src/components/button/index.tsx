import {
  TouchableOpacity,
  Text,
  View,
  TextStyle,
  DimensionValue,
  ViewStyle,
} from 'react-native';
import styles from './style';
import Fonts from '../../Theme/fonts';
import React from 'react';

interface ButtonProps {
  title?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  textColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  fontFamily?: string;
  fontWeight?: TextStyle['fontWeight'];
  fontSize?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

export default function Button({
  title,
  backgroundColor = '#5B3CC4',
  borderColor = '#5B3CC4',
  borderWidth = 0,
  textColor = '#FFFFFF',
  width = 300,
  height = 50,
  fontFamily,
  fontWeight = 'bold',
  fontSize,
  style,
  onPress,
  textStyle,
}: ButtonProps) {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor, borderColor, borderWidth, width, height},
          style,
        ]}
        onPress={onPress}>
        <Text
          style={[
            styles.text,
            {color: textColor, fontWeight, fontSize},
            fontFamily ? {fontFamily} : {},
            fontFamily && fontFamily in Fonts
              ? Fonts[fontFamily as keyof typeof Fonts]
              : {},
              textStyle, // Aplique os estilos passados via prop 'textStyle'
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
