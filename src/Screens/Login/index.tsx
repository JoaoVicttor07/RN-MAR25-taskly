import React, {useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
} from 'react-native';
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

  const handleEmailBlur = useCallback(() => {
    const emailError = !email
      ? 'Campo obrigatório'
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? undefined
      : 'e-mail inválido';
    setErrors(prevErrors => ({...prevErrors, email: emailError}));
  }, [email, setErrors]);

  const handlePasswordBlur = useCallback(() => {
    const passwordError = !password
      ? 'Campo obrigatório'
      : password.length < 8
      ? 'A senha deve ter no mínimo 8 caracteres'
      : undefined;
    setErrors(prevErrors => ({...prevErrors, password: passwordError}));
  }, [password, setErrors]);

  const handleRememberMe = (): void => {
    const newState = !rememberMe;
    setRememberMe(newState);
    setCheckboxImage(newState ? checkedIcon : uncheckedIcon);
  };

  const handleLogin = (): void => {
    setIsSubmitting(true);
    handleEmailBlur();
    handlePasswordBlur();
  
    // Credenciais predefinidas
    const predefinedEmail = 'Usuario@exemplo.com';
    const predefinedPassword = 'Senha123';
  
    if (!errors.email && !errors.password && email && password) {
      if (email === predefinedEmail && password === predefinedPassword) {
        console.log('Login bem-sucedido!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainApp' }], // Redireciona para o BottomTabNavigator
        });
      } else {
        console.log('Credenciais inválidas!');
        setErrors(prevErrors => ({
          ...prevErrors,
          email: 'E-mail ou senha inválidos',
          password: 'E-mail ou senha inválidos',
        }));
      }
    }
  
    setIsSubmitting(false);
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
          onBlur={handleEmailBlur}
          error={errors.email}
          containerStyle={styles.inputSpacing}
        />
        <Input
          label="Senha"
          value={password}
          onChangeText={handlePasswordChange}
          onBlur={handlePasswordBlur}
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
    </ScrollView>
  );
};

export default Login;