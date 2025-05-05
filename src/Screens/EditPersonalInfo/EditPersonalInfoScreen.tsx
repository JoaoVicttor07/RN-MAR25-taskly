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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    navigation.navigate('AvatarSelector', { isEditing: true });
  };

  return (
    <View style={styles.container}>
      <ProfileHeader title="EDIÇÃO DE PERFIL" onBackPress={() => navigation.goBack()} />
      <ProgressBar progress={0.5} />
      <Input
        label="Nome Completo"
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
        containerStyle={styles.inputSpacing}
      />
      <Input
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        containerStyle={styles.inputSpacing}
      />
      <Input
        label="Número"
        value={phone}
        onChangeText={setPhone}
        placeholder="(DDD) 9 NNNN-NNNN"
        keyboardType="phone-pad"
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