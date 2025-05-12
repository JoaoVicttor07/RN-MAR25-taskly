import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
} from 'react-native';
import axios from 'axios';
import {API_BASE_URL} from '../../env';
import * as Keychain from 'react-native-keychain';
import {
  storeToken,
  setBiometryEnabled,
  isBiometryEnabled,
} from '../../Utils/authUtils';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';
import Input from '../../components/input';
import Button from '../../components/button';
import Fonts from '../../Theme/fonts';
import LoginErrorModal from './Modal';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const checkedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-2.png');
const uncheckedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-1.png');

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const Login: React.FC = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [checkboxImage, setCheckboxImage] =
    useState<ImageSourcePropType>(uncheckedIcon);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadRememberedEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('rememberedEmail');
        console.log('E-mail salvo carregado:', savedEmail);
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
      console.log('Alterando e-mail:', text);
      setEmail(text);
      setErrors(prevErrors => ({...prevErrors, email: undefined}));
    },
    [setEmail, setErrors],
  );

  const handlePasswordChange = useCallback(
    (text: string) => {
      console.log('Alterando senha:', text);
      setPassword(text);
      setErrors(prevErrors => ({...prevErrors, password: undefined}));
    },
    [setPassword, setErrors],
  );

  const handleRememberMe = (): void => {
    const newState = !rememberMe;
    console.log('Alterando estado de "Lembrar de mim":', newState);
    setRememberMe(newState);
    setCheckboxImage(newState ? checkedIcon : uncheckedIcon);
  };

  const validateInputs = (): boolean => {
    console.log('Validando inputs...');
    let isValid = true;

    if (!email) {
      console.log('Erro: E-mail é obrigatório.');
      setErrors(prevErrors => ({...prevErrors, email: 'Campo obrigatório'}));
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('Erro: E-mail inválido.');
      setErrors(prevErrors => ({...prevErrors, email: 'E-mail inválido'}));
      isValid = false;
    }

    if (!password) {
      console.log('Erro: Senha é obrigatória.');
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Campo obrigatório',
      }));
      isValid = false;
    } else if (password.length < 8) {
      console.log('Erro: Senha deve ter no mínimo 8 caracteres.');
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'A senha deve ter no mínimo 8 caracteres',
      }));
      isValid = false;
    }

    console.log('Inputs válidos:', isValid);
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
      console.log('Biometria ativada:', biometryEnabled);

      if (biometryEnabled) {
        console.log('Verificando credenciais biométricas...');
        const credentials = await Keychain.getGenericPassword();
        if (!credentials) {
          console.log('Nenhuma credencial encontrada para biometria.');
        } else {
          console.log('Credenciais biométricas encontradas:', credentials);
        }
      } else {
        console.log('Biometria desativada. Usuário deve fazer login manual.');
      }

      console.log('Enviando requisição para:', `${API_BASE_URL}/auth/login`);
      console.log('Corpo da requisição:', {email, password});

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      console.log('Resposta da API de login:', response.data);

      if (response.status === 200) {
        const {id_token, refresh_token} = response.data;

        console.log('Tokens recebidos:', {id_token, refresh_token});

        await storeToken(id_token, refresh_token);
        console.log('Tokens armazenados com sucesso!');

        if (biometryEnabled) {
          await setBiometryEnabled(true);
          console.log('Biometria ativada com sucesso!');
        }

        if (rememberMe) {
          await AsyncStorage.setItem('rememberedEmail', email);
          console.log('E-mail salvo para lembrar-me:', email);
        } else {
          await AsyncStorage.removeItem('rememberedEmail');
          console.log('E-mail removido do lembrar-me.');
        }

        const storedCredentials = await Keychain.getGenericPassword();

        if (storedCredentials) {
          console.log(
            'Credenciais armazenadas no Keychain:',
            storedCredentials,
          );
          let parsedCredentials;
          try {
            parsedCredentials = JSON.parse(storedCredentials.password);
          } catch (error) {
            console.error(
              'Erro ao fazer parse das credenciais do Keychain:',
              error,
            );
            parsedCredentials = {
              idToken: storedCredentials.password,
              refreshToken: storedCredentials.username,
            };
          }

          const {avatar} = parsedCredentials;
          console.log('Avatar armazenado:', avatar);

          if (avatar) {
            console.log('Atualizando avatar após login...');
            const response = await fetch(`${API_BASE_URL}/profile`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${id_token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({picture: avatar}),
            });

            console.log(
              'Status da resposta ao atualizar avatar:',
              response.status,
            );

            const contentType = response.headers.get('Content-Type');
            let responseData;

            if (contentType && contentType.includes('application/json')) {
              responseData = await response.json();
            } else {
              responseData = await response.text();
            }

            console.log('Resposta da API ao atualizar avatar:', responseData);

            if (response.ok) {
              console.log('Avatar atualizado com sucesso!');
            } else {
              console.error('Erro ao atualizar avatar:', responseData);
              throw new Error('Não foi possível atualizar o avatar.');
            }
          }
        }

        console.log('Redirecionando para a tela principal...');
        navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
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
    console.log('Navegando para a tela de registro...');
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
          error={errors.email}
          containerStyle={styles.inputSpacing}
        />
        <Input
          label="Senha"
          value={password}
          onChangeText={handlePasswordChange}
          error={errors.password}
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
        textColor={theme.background}
        backgroundColor={theme.AvatarButton}
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
        textColor={theme.AvatarButton}
        borderWidth={2}
        borderColor={theme.AvatarButton}
        backgroundColor="transparent"
        width="100%"
        style={styles.buttonCreate}
        onPress={handleCreateAccount}
      />
      <LoginErrorModal
        visible={isErrorModalVisible}
        title="Ops! Ocorreu um problema"
        description={errorMessage}
        onClose={() => setIsErrorModalVisible(false)}
      />
    </ScrollView>
  );
};

export default Login;
