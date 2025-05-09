import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
} from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../../env';
import * as Keychain from 'react-native-keychain';
import {
  storeToken,
  setBiometryEnabled,
  isBiometryEnabled,
  refreshAuthToken,
  isTokenExpired,
  removeToken,
} from '../../Utils/authUtils';
import styles from './style';
import Input from '../../components/input';
import Button from '../../components/button';
import Fonts from '../../Theme/fonts';
import LoginErrorModal from './Modal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const checkedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-2.png');
const uncheckedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-1.png');

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [checkboxImage, setCheckboxImage] = useState<ImageSourcePropType>(uncheckedIcon);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const tryAutoLogin = async () => {
      try {
        const biometryEnabled = await isBiometryEnabled();
        if (!biometryEnabled) {
          return;
        }

        const credentials = await Keychain.getGenericPassword();
        if (!credentials) {
          return;
        }

        const idToken = credentials.password;
        const refreshToken = credentials.username;

        if (idToken && !isTokenExpired(idToken)) {
          console.log('Login automático com token válido.');
          navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
          return;
        }

        if (refreshToken) {
          console.log('Token expirado. Tentando renovar...');
          await refreshAuthToken(refreshToken);
          console.log('Renovação bem-sucedida!');
          navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
        }
      } catch (error) {
        console.warn('Erro no login automático:', error);
        await removeToken();
      }
    };

    tryAutoLogin();
  }, [navigation]);

  useEffect(() => {
    const loadRememberedEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('rememberedEmail');
        if (savedEmail) {
          setEmail(savedEmail);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Erro ao carregar e-mail salvo:', error);
      }
    };

    loadRememberedEmail();
  }, []);

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text);
    setErrors(function (prev) {
      return { ...prev, email: undefined };
    });
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
    setErrors(function (prev) {
      return { ...prev, password: undefined };
    });
  }, []);

  const handleRememberMe = () => {
    const newState = !rememberMe;
    setRememberMe(newState);
    setCheckboxImage(newState ? checkedIcon : uncheckedIcon);
  };

  const validateInputs = (): boolean => {
    let isValid = true;

    if (!email) {
      setErrors(function (prev) {
        return { ...prev, email: 'Campo obrigatório' };
      });
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors(function (prev) {
        return { ...prev, email: 'E-mail inválido' };
      });
      isValid = false;
    }

    if (!password) {
      setErrors(function (prev) {
        return { ...prev, password: 'Campo obrigatório' };
      });
      isValid = false;
    } else if (password.length < 8) {
      setErrors(function (prev) {
        return { ...prev, password: 'A senha deve ter no mínimo 8 caracteres' };
      });
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
  if (!validateInputs()) {
    return;
  }

  setIsSubmitting(true);
  try {
    console.log('Iniciando login...');
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      console.log('Login bem-sucedido:', response.data);

      const id_token = response.data.id_token;
      const refresh_token = response.data.refresh_token;

      await storeToken(id_token, refresh_token);
      await setBiometryEnabled(true);

      if (rememberMe) {
        await AsyncStorage.setItem('rememberedEmail', email);
      } else {
        await AsyncStorage.removeItem('rememberedEmail');
      }

      console.log('Redirecionando para a tela principal...');
      navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
    } else {
      console.error('Erro no login: status', response.status);
      setErrorMessage('E-mail e/ou senha incorretos');
      setIsErrorModalVisible(true);
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    setErrorMessage('E-mail e/ou senha incorretos');
    setIsErrorModalVisible(true);
  } finally {
    setIsSubmitting(false);
  }
};

  const handleCreateAccount = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Image source={require('../../Assets/Images/Logo.png')} style={styles.logo} />
        <Input
          label="E-mail"
          value={email}
          onChangeText={handleEmailChange}
          error={errors.email}
          containerStyle={styles.inputSpacing}
        />
        <Input
          label="Senha"
          value={password}
          onChangeText={handlePasswordChange}
          error={errors.password}
          secureTextEntry={true}
          containerStyle={styles.inputSpacing}
        />
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={handleRememberMe}>
            <Image source={checkboxImage} style={styles.checkboxIcon} />
          </TouchableOpacity>
          <Text style={styles.textCheckbox}>Lembrar de mim</Text>
        </View>
      </View>
      <Button
        title="ENTRAR"
        fontFamily={Fonts.Roboto60020.fontFamily}
        fontWeight={600}
        fontSize={Fonts.Roboto60020.fontSize}
        textColor="#FFFFFF"
        backgroundColor="#5B3CC4"
        width="100%"
        style={styles.buttonEnter}
        onPress={handleLogin}
        loading={isSubmitting}
        disabled={
          isSubmitting || !!errors.email || !!errors.password || !email || !password
        }
      />
      <Button
        title="CRIAR CONTA"
        fontFamily={Fonts.Roboto60020.fontFamily}
        fontWeight={600}
        fontSize={Fonts.Roboto60020.fontSize}
        textColor="#5B3CC4"
        borderWidth={2}
        borderColor="#5B3CC4"
        backgroundColor="transparent"
        width="100%"
        style={styles.buttonCreate}
        onPress={handleCreateAccount}
      />
      <LoginErrorModal
        visible={isErrorModalVisible}
        title="Ops! Ocorreu um problema"
        description={errorMessage}
        onClose={function () {
          setIsErrorModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default Login;
