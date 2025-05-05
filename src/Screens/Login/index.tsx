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


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [checkboxImage, setCheckboxImage] = useState<ImageSourcePropType>(
        require('../../Assets/icons/CheckSquare-1.png'),
    );

    const checkedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-1.png');
    const uncheckedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-2.png');

    const validateEmail = (value: string): void => {
        if (!value) {
            setEmailError('Campo obrigatório');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(emailRegex.test(value) ? '' : 'e-mail inválido');
        }
    };

    const validatePassword = (value: string): void => {
        if (!value) {
            setPasswordError('Campo obrigatório');
        } else if (value.length < 8) {
            setPasswordError('A senha deve ter no mínimo 8 caracteres');
        } else {
            setPasswordError('');
        }
    };

    const handleRememberMe = (): void => {
        setRememberMe(!rememberMe);
        setCheckboxImage(!rememberMe ? checkedIcon : uncheckedIcon);
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
                            validateEmail(text);
                        }
                    }}
                    onBlur={() => validateEmail(email)}
                    error={emailError}
                    containerStyle={styles.inputSpacing}
                />
                <Input
                    label="Senha"
                    value={password}
                    onChangeText={(text: string) => {
                        setPassword(text);
                        if (passwordError) {
                            validatePassword(text);
                        }
                    }}
                    onBlur={() => validatePassword(password)}
                    error={passwordError}
                    secureTextEntry
                    containerStyle={styles.inputSpacing}
                />

                <TouchableOpacity
                    onPress={handleRememberMe}
                    style={styles.checkboxContainer}
                >
                    <Image source={checkboxImage} style={styles.checkboxIcon} />
                    <Text style={styles.textCheckbox}>Lembrar de mim</Text>
                </TouchableOpacity>
            </View>

            <Button
                title="ENTRAR"
                backgroundColor="#5B3CC4"
                width="100%"
                fontWeight="bold"
                style={styles.buttonEnter}
            />
            <Button
                title="CRIAR CONTA"
                textColor="#5B3CC4"
                borderColor="#5B3CC4"
                width="100%"
                fontWeight="bold"
                style={styles.buttonCreate}
            />
        </ScrollView>
    );
};

export default Login;