import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
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
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [showBiometryModal, setShowBiometryModal] = useState(false);

  // Função para armazenar token
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
    setLoading(true); // Inicia o carregamento
    console.log('Iniciando cadastro...');
    console.log(`📧 E-mail cadastrado: ${email}`);
    console.log(`📱 Número cadastrado: ${number}`);
    console.log(`👤 Nome cadastrado: ${name}`);

    try {
      console.log('Enviando requisição para API...');
      const response = await registerUser({
        email,
        password,
        name,
        phone_number: number,
      });

      console.log('Resposta da API:', response.data);

      if (response.status === 200 && response.data.idToken) {

        await storeToken(response.data.idToken);
        console.log('Cadastro concluído com sucesso!');

        // Agora sim, abrir modal
        setShowBiometryModal(true);
      }


    } catch (error: any) {
      if (error.response) {
        console.log('Erro: O email já está cadastrado');

        if (
          error.response.status === 400 &&
          error.response.data?.error === 'O email está em uso por outra conta.'
        ) {
          console.log('E-mail já está cadastrado!');
          Alert.alert(
            'Erro',
            'Este e-mail já está cadastrado. Tente fazer login.',
          );
        } else {
          Alert.alert(
            'Erro',
            `Falha no cadastro: ${
              error.response.data?.error || 'Verifique os dados inseridos.'
            }`,
          );
        }
      } else if (error.request) {
        console.log('Sem resposta do servidor');
        Alert.alert(
          'Erro',
          'Não foi possível conectar ao servidor. Verifique sua internet.',
        );
      } else {
        console.log('Erro inesperado:', error.message);
        Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false); // Finaliza o carregamento, independentemente de erro ou sucesso
    }
  };

  // Validações de campos
  const validateEmail = (value: string) => {
    if (!value) {setEmailError('Campo obrigatório');}
    else
      {setEmailError(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'E-mail inválido',
      );}
  };

  const validateName = (value: string) => {
    if (!value) {setNameError('Campo obrigatório');}
    else {
      const parts = value.trim().split(' ').filter(Boolean);
      setNameError(
        parts.length < 2 || parts[1].length < 3 ? 'Digite o nome completo' : '',
      );
    }
  };

  const validateNumber = (value: string) => {
    if (!value) {setNumberError('Campo obrigatório');}
    else
      {setNumberError(
        value.replace(/\D/g, '').length === 11 ? '' : 'Número inválido',
      );}
  };

  const validatePassword = (value: string) => {
    if (!value) {setPasswordError('Campo obrigatório');}
    else
      {setPasswordError(
        value.length < 8 ? 'A senha deve ter no mínimo 8 caracteres' : '',
      );}
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) {setConfirmPasswordError('Campo obrigatório');}
    else
      {setConfirmPasswordError(value !== password ? 'Senhas não coincidem' : '');}
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
            if (nameError) {validateName(text);}
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
            if (emailError) {validateEmail(text);}
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
            if (numberError) {validateNumber(text);}
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
            if (passwordError) {validatePassword(text);}
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
            if (confirmPasswordError) {validateConfirmPassword(text);}
          }}
          onBlur={() => validateConfirmPassword(confirmPassword)}
          error={confirmPasswordError}
          secureTextEntry
          containerStyle={styles.inputSpacing}
        />
      </View>

      <Button
        title={loading ? 'Carregando...' : 'CRIAR CONTA'}
        backgroundColor="#5B3CC4"
        width="100%"
        fontWeight="bold"
        style={styles.buttonSpacing}
        onPress={handleRegister}
        disabled={loading} // Desabilita o botão enquanto carrega
      />

      {/* Exibe o modal de biometria após cadastro bem-sucedido */}
      <BiometryModal
        visible={showBiometryModal}
        title="Ative o Desbloqueio por Biometria"
        description="Use sua impressão digital para acessar seu app de tarefas com rapidez e segurança."
        buttonLeftText="Agora não"
        buttonRightText="ATIVAR"
        onPressLeft={() => {
          setShowBiometryModal(false);
          navigation.navigate('AvatarSelector');
        }}
        onPressRight={() => {
          setShowBiometryModal(false);
          console.log('Biometria habilitada!');
          navigation.navigate('AvatarSelector');
        }}
      />
    </ScrollView>
  );
}
