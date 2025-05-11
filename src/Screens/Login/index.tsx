import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
  Alert,
} from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../../env';
import * as Keychain from 'react-native-keychain';
import { storeToken, setBiometryEnabled, isBiometryEnabled } from '../../Utils/authUtils';
import styles from './style';
import Input from '../../components/input';
import Button from '../../components/button';
import Fonts from '../../Theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo os ícones fora do componente
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
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [checkboxImage, setCheckboxImage] = useState<ImageSourcePropType>(
    uncheckedIcon
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Recuperar o e-mail salvo ao abrir o app
  useEffect(() => {
    const loadRememberedEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('rememberedEmail');
        if (savedEmail) {
          setEmail(savedEmail);
          setRememberMe(true);
        } else {
          setRememberMe(false);
        }
      } catch (error) {
        console.error('Erro ao carregar e-mail salvo:', error);
      }
    };

    loadRememberedEmail();
  }, []);

  const handleEmailChange = useCallback(
    (text: string) => {
      setEmail(text);
      setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
    },
    [setEmail, setErrors]
  );

  const handlePasswordChange = useCallback(
    (text: string) => {
      setPassword(text);
      setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
    },
    [setPassword, setErrors]
  );

  const handleRememberMe = (): void => {
    const newState = !rememberMe;
    setRememberMe(newState);
    setCheckboxImage(newState ? checkedIcon : uncheckedIcon);
  };

  const validateInputs = (): boolean => {
    let isValid = true;

    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Campo obrigatório' }));
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'E-mail inválido' }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Campo obrigatório',
      }));
      isValid = false;
    } else if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'A senha deve ter no mínimo 8 caracteres',
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    console.log('Tentando login...');
    if (!validateInputs()) {
      console.log('Inputs inválidos:', errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const biometryEnabled = await isBiometryEnabled();

      if (biometryEnabled) {
        console.log('Biometria está ativada. Verificando credenciais...');
        const credentials = await Keychain.getGenericPassword();
        if (!credentials) {
          console.log('Nenhuma credencial encontrada para autenticação biométrica.');
        } else {
          console.log('Credenciais encontradas:', credentials);
        }
      } else {
        console.log('Biometria desativada. Usuário deve fazer login manual.');
      }

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login bem-sucedido:', response.data);

        // Armazena o idToken e o refreshToken
        await storeToken(response.data.id_token, response.data.refresh_token);

        // Salva o estado de ativação da biometria
        if (biometryEnabled) {
          await setBiometryEnabled(true);
        }

        // Salva ou remove o email no AsyncStorage com base no estado de "Lembrar de Mim"
        if (rememberMe) {
          await AsyncStorage.setItem('rememberedEmail', email);
        } else {
          await AsyncStorage.removeItem('rememberedEmail');
        }

        // Redireciona para o BottomTabNavigator
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainApp' }],
        });
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Não foi possível fazer login. Verifique suas credenciais.');
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
        <Image
          source={require('../../Assets/Images/Logo.png')}
          style={styles.logo}
        />
        <Input
          label="E-mail"
          value={email}
          onChangeText={handleEmailChange}
          error={errors.email} // Exibe o erro no campo de e-mail
          containerStyle={styles.inputSpacing}
        />
        <Input
          label="Senha"
          value={password}
          onChangeText={handlePasswordChange}
          error={errors.password} // Exibe o erro no campo de senha
          secureTextEntry
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
          isSubmitting ||
          !!errors.email ||
          !!errors.password ||
          !email ||
          !password
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
    </ScrollView>
  );
};

export default Login;
