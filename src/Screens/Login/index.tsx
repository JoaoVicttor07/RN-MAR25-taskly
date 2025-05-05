import React, { useState } from 'react';
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

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [checkboxImage, setCheckboxImage] = useState<ImageSourcePropType>(
        require('../../Assets/icons/CheckSquare-1.png'),
    );
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const checkedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-2.png');
    const uncheckedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-1.png');

    const validateEmail = (value: string): string => {
        if (!value) {
            return 'Campo obrigatório';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'e-mail inválido';
    };

    const validatePassword = (value: string): string => {
        if (!value) {
            return 'Campo obrigatório';
        } else if (value.length < 8) {
            return 'A senha deve ter no mínimo 8 caracteres';
        }
        return '';
    };

    const handleRememberMe = (): void => {
        const newState = !rememberMe;
        setRememberMe(newState);
        setCheckboxImage(newState ? checkedIcon : uncheckedIcon);
    };

    const handleLogin = (): void => {
        setIsSubmitting(true);
        const newEmailError = validateEmail(email);
        const newPasswordError = validatePassword(password);

        setEmailError(newEmailError);
        setPasswordError(newPasswordError);

        if (!newEmailError && !newPasswordError && email && password) {
            console.log('Realizando login com:', { email, password, rememberMe });
        }
        setIsSubmitting(false);
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
                    onChangeText={(text: string) => {
                        setEmail(text);
                        if (emailError) {
                            setEmailError(validateEmail(text));
                        }
                    }}
                    onBlur={() => setEmailError(validateEmail(email))}
                    error={emailError}
                    containerStyle={styles.inputSpacing}
                />
                <Input
                    label="Senha"
                    value={password}
                    onChangeText={(text: string) => {
                        setPassword(text);
                        if (passwordError) {
                            setPasswordError(validatePassword(text));
                        }
                    }}
                    onBlur={() => setPasswordError(validatePassword(password))}
                    error={passwordError}
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
            />
            <Button
                title="CRIAR CONTA"
                fontFamily={Fonts.Roboto60020.fontFamily}
                fontWeight={600}
                fontSize={Fonts.Roboto60020.fontSize}
                textColor="#5B3CC4"
                borderWidth={2}
                borderColor="#5B3CC4"
                backgroundColor='transparent'
                width="100%"
                style={styles.buttonCreate}
            />
        </ScrollView>
    );
};

export default Login;