import React, { useState } from 'react';
import { View } from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import ProfileHeader from '../../components/ProfileHeader';
import ProgressBar from '../../components/ProgressBar';
import styles from './style';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditPersonalInfo'>;

function EditPersonalInfoScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const email = 'example@example.com';

  const validateName = (value: string) => {
    if (!value) {
      setNameError('Campo obrigatório');
    } else {
      const parts = value.trim().split(' ').filter(Boolean);
      if (parts.length < 2) {
        setNameError('Digite o nome completo');
      } else if (parts[1].length < 3) {
        setNameError('Digite o nome completo');
      } else {
        setNameError('');
      }
    }
  };

  const validatePhone = (value: string) => {
    if (!value) {
      setPhoneError('Campo obrigatório');
    } else {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length === 11) {
        setPhone('');
      } else {
        setPhoneError('Número inválido');
      }
    }
  };

  const handleContinue = () => {
    validateName(name);
    validatePhone(phone);

    if (!nameError && !phoneError && name && phone) {
      navigation.navigate('AvatarSelector', { isEditing: true });
    }
  };

  return (
    <View style={styles.container}>
      <ProfileHeader title="EDIÇÃO DE PERFIL" onBackPress={() => navigation.goBack()} />
      <ProgressBar progress={0.5} />
      <Input
        label="Nome Completo"
        value={name}
        onChangeText={text => {
          setName(text);
          if (nameError) validateName(text);
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
        editable={false} // Campo desabilitado
      />
      <Input
          label="Número"
          value={phone}
          onChangeText={text => {
            setPhone(text);
            if (phoneError) validatePhone(text);
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
  );
}

export default EditPersonalInfoScreen;