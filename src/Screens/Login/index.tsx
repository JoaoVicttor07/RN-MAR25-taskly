import React, {useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import styles from './style.ts';
import Input from '../../components/input';
import Button from '../../components/button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [checkboxImage, setCheckboxImage] = useState(require('../../assets/icons/CheckSquare-1.png'));

  const checkedIcon = require('../../assets/icons/CheckSquare-1.png');
  const uncheckedIcon = require('../../assets/icons/CheckSquare-2.png');


  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Campo obrigatório');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(value) ? '' : 'e-mail inválido');
    }
  };

  const validatePassword = (value: string) => {
    if (!value) setPasswordError('Campo obrigatório');
    else if (value.length < 8)
      setPasswordError('A senha deve ter no mínimo 8 caracteres');
    else setPasswordError('');
  };
 
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
    setCheckboxImage(rememberMe ? uncheckedIcon : checkedIcon);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logo}
        />
        <Input
          label="E-mail"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (emailError) validateEmail(text);
          }}
          onBlur={() => validateEmail(email)}
          error={emailError}
          containerStyle={styles.inputSpacing}
        />
        <Input
          label="Senha"
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (passwordError) validatePassword(text);
          }}
          onBlur={() => validatePassword(password)}
          error={passwordError}
          secureTextEntry
          containerStyle={styles.inputSpacing}
        />

        <TouchableOpacity
          onPress={handleRememberMe}
          style={styles.checkboxContainer}>
          <Image source={checkboxImage} style={styles.checkboxIcon} />
          <Text style={styles.textCheckbox}>Lembrar de mim</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="ENTRAR"
        backgroundColor="#5B3CC4"
        width="100%"
        fontWeight="bold"
        style={styles.buttonEnter}
      />
      <Button
        title="CRIAR CONTA"
        textColor="#5B3CC4"
        borderColor="#5B3CC4"
        width="100%"
        fontWeight="bold"
        style={styles.buttonCreate}
      />
    </ScrollView>
  );
}
