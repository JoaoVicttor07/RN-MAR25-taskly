import React, {useState} from 'react';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigation';
import ProfileHeader from '../../components/ProfileHeader';
import ProgressBar from '../../components/ProgressBar';
import styles from './style';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditPersonalInfo'
>;

function EditPersonalInfoScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const email = 'example@example.com';

  const validateName = (value: string): string | null => {
    if (!value) {
      return 'Campo obrigatório';
    }
    const parts = value.trim().split(' ').filter(Boolean);
    if (parts.length < 2 || parts[1].length < 3) {
      return 'Digite o nome completo';
    }
    return null;
  };

  const validatePhone = (value: string): string | null => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      return 'Campo obrigatório';
    } else if (cleaned.length !== 11) {
      return 'Número inválido';
    }
    return null;
  };

  const handleContinue = () => {
    const localNameError = !name ? 'Campo obrigatório' : validateName(name);
    const localPhoneError = !phone ? 'Campo obrigatório' : validatePhone(phone);

    setNameError(localNameError || '');
    setPhoneError(localPhoneError || '');

    if (!localNameError && !localPhoneError && name && phone) {
      navigation.navigate('AvatarSelector', {isEditing: true});
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <ProfileHeader
            title="EDIÇÃO DE PERFIL"
            onBackPress={() => navigation.goBack()}
          />
          <ProgressBar progress={0.5} />
          <Input
            label="Nome Completo"
            value={name}
            onChangeText={text => {
              setName(text);
              if (nameError) {validateName(text);}
            }}
            onBlur={() => validateName(name)}
            error={nameError}
            placeholder="Digite seu nome"
            containerStyle={styles.inputSpacing}
          />
          <Input
            label="E-mail"
            value={email}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            containerStyle={styles.inputSpacing}
            editable={false}
          />
          <Input
            label="Número"
            value={phone}
            onChangeText={text => {
              setPhone(text);
              if (phoneError) {validatePhone(text);}
            }}
            onBlur={() => validatePhone(phone)}
            error={phoneError}
            mask="phone"
            containerStyle={styles.inputSpacing}
          />
          <Button
            title="CONTINUAR"
            onPress={handleContinue}
            width="100%"
            fontFamily="Roboto60020"
            style={styles.buttonSpacing}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default EditPersonalInfoScreen;
