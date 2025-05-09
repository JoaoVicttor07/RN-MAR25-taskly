import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  BackHandler,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../Navigation';
import Button from '../../components/button';
import ProfileHeader from '../../components/ProfileHeader';
import ProgressBar from '../../components/ProgressBar';
import Modal from './Modal';
import styles from './style';
import * as Keychain from 'react-native-keychain';

import avatar1 from '../../Assets/Images/Avatars/avatar-1.png';
import avatar2 from '../../Assets/Images/Avatars/avatar-2.jpg';
import avatar3 from '../../Assets/Images/Avatars/avatar-3.jpg';
import avatar4 from '../../Assets/Images/Avatars/avatar-4.png';
import avatar5 from '../../Assets/Images/Avatars/avatar-5.png';

const AVATARS = [
  { id: 'avatar_1', source: avatar1, borderColor: '#6C4AE4' },
  { id: 'avatar_2', source: avatar2, borderColor: '#E4B14A' },
  { id: 'avatar_3', source: avatar3, borderColor: '#4AE47B' },
  { id: 'avatar_4', source: avatar4, borderColor: '#E44A4A' },
  { id: 'avatar_5', source: avatar5, borderColor: '#B89B5B' },
];

const AVATAR_SIZE = 100;
const AVATAR_MARGIN = 12;
const GRAY_BORDER = '#D1D5DB';

export default function AvatarSelector() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, 'AvatarSelector'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'AvatarSelector'>>();
  const { isEditing = false } = route.params || {};

  useEffect(() => {
    const backAction = () => {
      if (!isEditing) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [isEditing]);

  const handleAvatarPress = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  const handleConfirm = async () => {
    if (!selectedId) {
      Alert.alert('Selecione um avatar para continuar.');
      return;
    }

    setLoading(true);

    try {
      const credentials = await Keychain.getGenericPassword();
      if (!credentials) {
        throw new Error('Token de autenticação não encontrado.');
      }

      const response = await fetch('https://seu-backend.com/profile/avatar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials.password}`,
        },
        body: JSON.stringify({ picture: selectedId }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar avatar.');
      }

      setIsModalVisible(true);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Ocorreu um erro ao salvar o avatar.');
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  return (
    <View style={styles.container}>
      {isEditing && (
        <View style={styles.headerContainer}>
          <ProfileHeader title="EDIÇÃO DE PERFIL" onBackPress={() => navigation.goBack()} />
          <ProgressBar progress={1} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.textAvatar}>SELECIONE SEU AVATAR</Text>
        <Text style={styles.textPick}>(Escolha somente um.)</Text>
      </View>

      <View style={styles.avatarsRow}>
        {AVATARS.map(avatar => {
          const isSelected = selectedId === avatar.id;
          const isDimmed = selectedId && !isSelected;
          return (
            <TouchableOpacity
              key={avatar.id}
              style={[
                styles.avatarTouchable,
                {
                  borderColor: selectedId
                    ? isSelected
                      ? avatar.borderColor
                      : GRAY_BORDER
                    : avatar.borderColor,
                  borderWidth: 3,
                  borderRadius: AVATAR_SIZE / 2,
                  margin: AVATAR_MARGIN / 2,
                  overflow: 'hidden',
                  padding: 0,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => handleAvatarPress(avatar.id)}
            >
              <Image
                source={avatar.source}
                style={{
                  position: 'absolute',
                  left: -(AVATAR_SIZE * 0.1),
                  top: 0,
                  width: AVATAR_SIZE * 1.2,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE / 2,
                }}
                resizeMode="cover"
              />
              {isDimmed && (
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: AVATAR_SIZE * 1.2,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE / 2,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <Button
        title={loading ? 'SALVANDO...' : isEditing ? 'CONFIRMAR EDIÇÃO' : 'CONFIRMAR SELEÇÃO'}
        fontFamily="Roboto60020"
        backgroundColor="#6C4AE4"
        width={Dimensions.get('window').width * 0.9}
        style={styles.confirmButton}
        onPress={handleConfirm}
        disabled={loading}
      />

      <Modal
        visible={isModalVisible}
        title={isEditing ? 'Perfil atualizado' : 'Cadastro realizado com sucesso!'}
        description={isEditing ? 'Suas informações foram salvas com sucesso.' : 'Você será direcionado para a tela principal.'}
        confirmText="OK"
        confirmColor="#32C25B"
        onClose={handleModalClose}
      />
    </View>
  );
}
