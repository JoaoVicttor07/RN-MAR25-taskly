import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import Button from '../../components/button';
import Input from '../../components/input';
import BiometryModal from './Modal';

import styles from './style';

export default function Register() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [number, setNumber] = useState('');
  const [numberError, setNumberError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showBiometryModal, setShowBiometryModal] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Campo obrigatório');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(value) ? '' : 'e-mail inválido');
    }
  };

  const validateName = (value: string) => {
    if (!value) {
      setNameError('Campo obrigatório');
    } else {
      const parts = value.trim().split(' ').filter(Boolean);
      if (parts.length < 2) {
        setNameError('Digite o nome completo');
      } else if (parts[1].length < 3) {
        setNameError('Digite o nome completo');
      } else {
        setNameError('');
      }
    }
  };

  const validateNumber = (value: string) => {
    if (!value) {
      setNumberError('Campo obrigatório');
    } else {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length === 11) {
        setNumberError('');
      } else {
        setNumberError('Número inválido');
      }
    }
  };

  const validatePassword = (value: string) => {
    if (!value) setPasswordError('Campo obrigatório');
    else if (value.length < 8)
      setPasswordError('A senha deve ter no mínimo 8 caracteres');
    else setPasswordError('');
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) setConfirmPasswordError('Campo obrigatório');
    else if (value !== password)
      setConfirmPasswordError('Senhas não coincidem');
    else setConfirmPasswordError('');
  };

  const handleRegister = () => {
    validateName(name);
    validateEmail(email);
    validateNumber(number);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (
      !nameError &&
      !emailError &&
      !numberError &&
      !passwordError &&
      !confirmPasswordError &&
      name &&
      email &&
      number &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      // 📌 Comentário: Aqui será implementada a chamada para a API de cadastro no futuro.
      console.log('Cadastro validado!');

      // Exibe o modal de biometria
      setShowBiometryModal(true);
    }
  };

  const handleBiometryClose = () => {
    setShowBiometryModal(false);

    // Redireciona para a tela de seleção de avatar
    navigation.navigate('AvatarSelector', { isEditing: false });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Assets/icons/VectorBack.png')} />
          <Text style={styles.backText}>VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.title}>CADASTRO</Text>
        <Input
          label="Nome Completo"
          value={name}
          onChangeText={text => {
            setName(text);
            if (nameError) validateName(text);
          }}
          onBlur={() => validateName(name)}
          error={nameError}
          containerStyle={styles.inputSpacing}
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
          label="Número"
          value={number}
          onChangeText={text => {
            setNumber(text);
            if (numberError) validateNumber(text);
          }}
          onBlur={() => validateNumber(number)}
          error={numberError}
          mask="phone"
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
        <Input
          label="Confirmar senha"
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
            if (confirmPasswordError) validateConfirmPassword(text);
          }}
          onBlur={() => validateConfirmPassword(confirmPassword)}
          error={confirmPasswordError}
          secureTextEntry
          containerStyle={styles.inputSpacing}
        />
      </View>

      <Button
        title="CRIAR CONTA"
        backgroundColor="#5B3CC4"
        width="100%"
        fontWeight="bold"
        style={styles.buttonSpacing}
        onPress={handleRegister}
      />
      <BiometryModal
        visible={showBiometryModal}
        onClose={handleBiometryClose} // Fecha o modal e redireciona
        onActivate={handleBiometryClose} // Fecha o modal e redireciona
      />
    </ScrollView>
  );
}