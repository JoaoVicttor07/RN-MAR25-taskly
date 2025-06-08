import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
  Alert,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {
  storeToken,
  setBiometryEnabled,
  isBiometryEnabled,
} from '../../Utils/authUtils';
import {loginUser, getProfile, updateAvatar} from '../../services/authService';
import {useUser} from '../../contexts/userContext';
import styles from './style';
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
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const {setUser} = useUser();
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
      setErrors(prevErrors => ({...prevErrors, email: undefined}));
    },
    [setEmail, setErrors],
  );

  const handlePasswordChange = useCallback(
    (text: string) => {
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
      setErrors(prevErrors => ({...prevErrors, email: 'Campo obrigatório'}));
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors(prevErrors => ({...prevErrors, email: 'E-mail inválido'}));
      isValid = false;
    }

    if (!password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Campo obrigatório',
      }));
      isValid = false;
    } else if (password.length < 8) {
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
    if (!validateInputs()) {
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

      console.log('Tentando login com:', email, password);
      const response = await loginUser({email, password});

      if (response.status === 200) {
        const {id_token, refresh_token} = response.data;

        await storeToken(id_token, refresh_token);

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
          let parsedCredentials;
          try {
            parsedCredentials = JSON.parse(storedCredentials.password);
          } catch (error) {
            parsedCredentials = {
              idToken: storedCredentials.password,
              refreshToken: storedCredentials.username,
            };
          }

          const {avatar} = parsedCredentials;

          if (avatar) {
            const avatarResponse = await updateAvatar(avatar, id_token);

            if (avatarResponse.status === 200) {
              console.log('Avatar atualizado com sucesso!');
            } else {
              console.error('Erro ao atualizar avatar:', response.data);
              throw new Error('Não foi possível atualizar o avatar.');
            }
          }
        }

        const profileResponse = await getProfile(id_token);
        if (profileResponse.status === 200) {
          const data = profileResponse.data;
          setUser({
            name: data.name || 'Usuário',
            email: data.email || 'Email não disponível',
            phone: data.phone_number || 'Telefone não disponível',
            avatarUrl: data.picture || '',
          });
        }

        navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
      } else {
        setErrorMessage('E-mail e/ou senha incorretos');
        setIsErrorModalVisible(true);
      }
    } catch (error: any) {
      if (error.response) {
        setErrorMessage('E-mail e/ou senha incorretos');
        setIsErrorModalVisible(true);
        setIsSubmitting(false);
      } else if (error.request) {
        setIsSubmitting(false);
        Alert.alert(
          'Erro de conexão',
          'Servidor indisponível. Por favor, tente novamente mais tarde ou entre em contato com o suporte.',
        );
      } else {
        setErrorMessage('Ocorreu um erro inesperado. Tente novamente.');
        setIsErrorModalVisible(true);
        setIsSubmitting(false);
      }
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
