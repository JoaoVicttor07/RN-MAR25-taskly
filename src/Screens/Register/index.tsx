import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Button from '../../components/button';
import Input from '../../components/input';
import BiometryModal from './BiometryResgister';
import { registerUser } from '../../hooks/useApi';
import styles from './style';
import * as Keychain from 'react-native-keychain';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigation/types';
import 'react-native-gesture-handler';

export default function Register() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
  const [loading, setLoading] = useState(false);
  const [showBiometryModal, setShowBiometryModal] = useState(false);
  const [biometryApiLoading, setBiometryApiLoading] = useState(false);

  const storeToken = async (token: string) => {
    try {
      console.log('Tentando salvar token...');
      await Keychain.setGenericPassword('authToken', token);
      console.log('Token salvo com segurança!');
    } catch (error) {
      console.error('Erro ao salvar token:', error);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    console.log('Iniciando cadastro...');
    try {
      const response = await registerUser({
        email,
        password,
        name,
        phone_number: number,
      });
      console.log('Resposta da API:', response);

      if ((response.status === 200 || response.status === 201) && response.data.idToken) {
        await storeToken(response.data.idToken);
        console.log('Cadastro concluído!');
        setShowBiometryModal(true); // <- MOSTRA O MODAL
      }
      
    } catch (error: any) {
      if (error.response?.data?.error === 'O email está em uso por outra conta.') {
        Alert.alert('Erro', 'Este e-mail já está cadastrado.');
      } else if (error.response) {
        Alert.alert('Erro', error.response.data?.error || 'Erro no cadastro.');
      } else {
        Alert.alert('Erro', 'Erro inesperado. Verifique sua internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (value: string) => {
    if (!value) setEmailError('Campo obrigatório');
    else
      setEmailError(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'E-mail inválido',
      );
  };

  const validateName = (value: string) => {
    if (!value) setNameError('Campo obrigatório');
    else {
      const parts = value.trim().split(' ').filter(Boolean);
      setNameError(
        parts.length < 2 || parts[1].length < 3 ? 'Digite o nome completo' : '',
      );
    }
  };

  const validateNumber = (value: string) => {
    if (!value) setNumberError('Campo obrigatório');
    else
      setNumberError(
        value.replace(/\D/g, '').length === 11 ? '' : 'Número inválido',
      );
  };

  const validatePassword = (value: string) => {
    if (!value) setPasswordError('Campo obrigatório');
    else
      setPasswordError(
        value.length < 8 ? 'A senha deve ter no mínimo 8 caracteres' : '',
      );
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) setConfirmPasswordError('Campo obrigatório');
    else
      setConfirmPasswordError(value !== password ? 'Senhas não coincidem' : '');
  };

  const handleBiometryActivate = async () => {
    setBiometryApiLoading(true);
    console.log('Simulando chamada para ativar biometria...');
    setTimeout(() => {
      setBiometryApiLoading(false);
      setShowBiometryModal(false);
      navigation.navigate('AvatarSelector');
    }, 2000);
  };

  return (
    <>
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

        {/* Exibe o ActivityIndicator no centro da tela enquanto loading for true */}
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateX: -25 }, { translateY: -25 }],
              zIndex: 9999,
            }}
          >
            <ActivityIndicator size="large" color="#5B3CC4" />
          </View>
        )}

        <Button
          title="CRIAR CONTA"
          style={styles.createButton}
          onPress={handleRegister}
          disabled={loading}
        />
      </ScrollView>

      {/* MODAL BIOMETRIA */}
      <BiometryModal
        visible={showBiometryModal}
        title="Ative o Desbloqueio por Biometria"
        description="Use sua impressão digital para acessar seu app de tarefas com rapidez e segurança. Se preferir, voc~e ainda poderá usar sua senha sempre que quiser."
        buttonLeftText="Agora não"
        buttonRightText="ATIVAR"
        loading={biometryApiLoading}
        onPressLeft={() => {
          if (!biometryApiLoading) {
            setShowBiometryModal(false);
            navigation.navigate('AvatarSelector');
          }
        }}
        onPressRight={handleBiometryActivate}
      />
    </>
  );
}
