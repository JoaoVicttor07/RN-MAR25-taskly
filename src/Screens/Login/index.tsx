import React, {useState, useCallback} from 'react';
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
import {API_BASE_URL} from '../../../env';
import {storeToken} from '../../Utils/authUtils';
import styles from './style';
import Input from '../../components/input';
import Button from '../../components/button';
import Fonts from '../../Theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [checkboxImage, setCheckboxImage] = useState<ImageSourcePropType>(
    require('../../Assets/icons/CheckSquare-1.png'),
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const checkedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-2.png');
  const uncheckedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-1.png');

  const handleEmailChange = useCallback(
    (text: string) => {
      console.log('Email changed:', text);
      setEmail(text);
      setErrors(prevErrors => ({...prevErrors, email: undefined}));
    },
    [setEmail, setErrors],
  );

  const handlePasswordChange = useCallback(
    (text: string) => {
      console.log('Password changed:', text);
      setPassword(text);
      setErrors(prevErrors => ({...prevErrors, password: undefined}));
    },
    [setPassword, setErrors],
  );

  const handleRememberMe = (): void => {
    const newState = !rememberMe;
    console.log('Remember Me changed:', newState);
    setRememberMe(newState);
    setCheckboxImage(newState ? checkedIcon : uncheckedIcon);
  };

  const validateInputs = (): boolean => {
    console.log('Validating inputs...');
    let isValid = true;

    // Valida o campo de email
    if (!email) {
      console.log('Email is required');
      setErrors(prevErrors => ({...prevErrors, email: 'Campo obrigatório'}));
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('Invalid email format');
      setErrors(prevErrors => ({...prevErrors, email: 'E-mail inválido'}));
      isValid = false;
    }

    // Valida o campo de senha
    if (!password) {
      console.log('Password is required');
      setErrors(prevErrors => ({...prevErrors, password: 'Campo obrigatório'}));
      isValid = false;
    } else if (password.length < 8) {
      console.log('Password is too short');
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'A senha deve ter no mínimo 8 caracteres',
      }));
      isValid = false;
    }

    console.log('Validation result:', isValid);
    return isValid;
  };

  const handleLogin = async () => {
    console.log('Attempting login...');
    if (!validateInputs()) {
      console.log('Inputs are invalid, login aborted');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        await storeToken(response.data.id_token);
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Home'); // Direciona para a tela principal
      } else {
        console.log('Unexpected response:', response);
        Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
      }
    } catch (error) {
      console.log('Error during login:', error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400) {
          console.log('Bad request (400)');
          Alert.alert('Erro', 'Preencha todos os campos corretamente.');
        } else if (status === 401) {
          console.log('Unauthorized (401)');
          Alert.alert('Erro', 'E-mail ou senha incorretos. Tente novamente.');
        } else if (status === 500) {
          console.log('Internal server error (500)');
          Alert.alert('Erro', 'Erro interno do servidor. Tente mais tarde.');
        } else {
          console.log('Other error:', error);
          Alert.alert('Erro', 'Algo deu errado. Verifique sua conexão.');
        }
      } else {
        console.log('Connection error:', error);
        Alert.alert('Erro', 'Erro de conexão. Verifique sua internet.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAccount = () => {
    console.log('Navigating to Register screen...');
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
        />
        <Input
          label="Senha"
          value={password}
          onChangeText={handlePasswordChange}
          error={errors.password}
          secureTextEntry
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
