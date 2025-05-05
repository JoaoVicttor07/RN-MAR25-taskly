import React, { useState } from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Text,
    ImageSourcePropType,
    TextStyle,
    ViewStyle,
} from 'react-native';
import styles from './style'; // Assuming './style.ts' compiles to './style.js' or similar
import Input from '../../components/input';
import Button from '../../components/button';

interface Styles {
    container: ViewStyle;
    form: ViewStyle;
    logo: ImageStyle;
    inputSpacing: ViewStyle;
    checkboxContainer: ViewStyle;
    checkboxIcon: ImageStyle;
    textCheckbox: TextStyle;
    buttonEnter: ViewStyle;
    buttonCreate: ViewStyle;
}

interface ImageStyle extends ViewStyle, TextStyle {
    // Add specific image style properties if needed
}

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
        <ScrollView contentContainerStyle={(styles as Styles).container}>
            <View style={(styles as Styles).form}>
                {/* <Image
                    source={require('../../Assets/images/Logo.png')}
                    style={(styles as Styles).logo}
                /> */}
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
                    containerStyle={(styles as Styles).inputSpacing}
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
                    containerStyle={(styles as Styles).inputSpacing}
                />

                <TouchableOpacity
                    onPress={handleRememberMe}
                    style={(styles as Styles).checkboxContainer}
                >
                    <Image source={checkboxImage} style={(styles as Styles).checkboxIcon} />
                    <Text style={(styles as Styles).textCheckbox}>Lembrar de mim</Text>
                </TouchableOpacity>
            </View>

            <Button
                title="ENTRAR"
                backgroundColor="#5B3CC4"
                width="100%"
                fontWeight="bold"
                style={(styles as Styles).buttonEnter}
            />
            <Button
                title="CRIAR CONTA"
                textColor="#5B3CC4"
                borderColor="#5B3CC4"
                width="100%"
                fontWeight="bold"
                style={(styles as Styles).buttonCreate}
            />
        </ScrollView>
    );
};

export default Login;