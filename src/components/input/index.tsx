/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
  DimensionValue,
} from 'react-native';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';
//feito

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  containerStyle?: ViewStyle
  labelStyle?: TextStyle
  inputStyle?: TextStyle
  errorStyle?: TextStyle
  width?: DimensionValue
  height?: DimensionValue
  fontFamily?: string
  fontWeight?: TextStyle['fontWeight']
  textColor?: string
  mask?: 'phone' | 'none'
  validateEmail?: boolean
  editable?: boolean
  multiline?: boolean
  maxHeight?: DimensionValue
}

export default function Input({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  width,
  height,
  fontFamily,
  fontWeight = 'normal',
  mask = 'none',
  validateEmail = false,
  editable = true,
  ...textInputProps
}: InputProps) {
  const [internalValue, setInternalValue] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const { theme } = useTheme(); // Obtenha o tema
  const styles = getStyles(theme); // Aplique o tema aos estilos

  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})$/);
    if (!match) {return text;}

    let result = '';
    if (match[1]) {result += `(${match[1]}`;}
    if (match[1]?.length === 2) {result += ') ';}
    if (match[2]) {result += match[2];}
    if (match[3]) {result += ` ${match[3]}`;}
    if (match[4]) {result += `-${match[4]}`;}
    return result;
  };

  const handleChange = (text: string) => {
    const newValue = mask === 'phone' ? formatPhone(text) : text;
    setInternalValue(newValue);

    if (validateEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(newValue) ? null : 'E-mail inválido');
    }

    textInputProps.onChangeText?.(newValue);
  };

  const displayValue = textInputProps.value ?? internalValue;

  return (

    <View style={[styles.container, { width: '100%' }, containerStyle]}>
      {label != null && (
        <Text style={[styles.label, labelStyle, { fontFamily, fontWeight }]}>
          {label}
        </Text>
      )}
      <TextInput
        {...textInputProps}
        value={displayValue}
        onChangeText={handleChange}
        editable={editable}
        style={[
          styles.input,
          inputStyle,
          (error || emailError) && styles.inputError,
          { width, height, fontFamily, fontWeight, color: theme.text, backgroundColor: theme.background },
        ]}
        keyboardType={
          validateEmail ? 'email-address' : textInputProps.keyboardType ?? 'default'
        }
        autoCapitalize={
          validateEmail ? 'none' : textInputProps.autoCapitalize ?? 'sentences'
        }
        autoCorrect={
          validateEmail ? false : textInputProps.autoCorrect ?? true
        }
      />
      {error != null && (
        <Text style={[styles.error, errorStyle, { fontFamily, fontWeight }]}>
          {error}
        </Text>
      )}
      {emailError && (
        <Text style={[styles.error, errorStyle, { fontFamily, fontWeight }]}>
          {emailError}
        </Text>
      )}
    </View>
  );
}
