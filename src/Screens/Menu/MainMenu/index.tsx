import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { CarouselActionList } from '../../../components/carouselActionList/index';
import Modal from '../../AvatarSelector/Modal';
import styles from './style';
import { API_BASE_URL } from '../../../env';
import * as Keychain from 'react-native-keychain';

type Props = {
  navigation: any;
  route: any;
};

const MenuPrincipal = ({ navigation, route }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    avatarUrl: '', // Adicionado para armazenar o avatar
  });

  const fetchUserProfile = useCallback(async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (!credentials || !credentials.password) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${credentials.password}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Dados do perfil:', data);
        setUserData({
          name: data.name || 'Usuário',
          email: data.email || 'Email não disponível',
          phone: data.phone || 'Telefone não disponível',
          avatarUrl: data.avatarUrl || '', // Atualiza o avatar
        });
      } else if (response.status === 401) {
        console.log('Erro ao buscar perfil: token inválido ou expirado');
        Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } else {
        console.error('Erro ao buscar perfil:', response.status);
        Alert.alert(
          'Erro',
          'Não foi possível carregar as informações do perfil.',
        );
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, [navigation]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (route.params?.showConfirmationModal && !hasShownModal) {
      setIsModalVisible(true);
      setHasShownModal(true);
    }
  }, [route.params, hasShownModal]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.profileSection}>
        <Image
          source={
            userData.avatarUrl
              ? { uri: userData.avatarUrl }
              : require('../../../Assets/Images/Ellipse1.png')
          }
          style={styles.avatar}
        />
        <View style={styles.containerInfo}>
          <Text style={[styles.profileText, styles.profileNome]}>
            {userData.name}
          </Text>
          <Text style={styles.profileText}>{userData.email}</Text>
          <Text style={styles.profileText}>{userData.phone}</Text>
        </View>
      </View>

      <View style={styles.carouselContainer}>
        <CarouselActionList />
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PreferencesMenu')}
        >
          <Text style={styles.buttonText}>Preferências</Text>
          <Image
            source={require('../../../Assets/icons/VectorBack.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Regulamentos')}
        >
          <Text style={styles.buttonText}>Termos e regulamentos</Text>
          <Image
            source={require('../../../Assets/icons/VectorBack.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        title="Perfil atualizado"
        description="Suas informações foram salvas com sucesso."
        confirmText="FECHAR"
        confirmColor="#4CAF50"
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default MenuPrincipal;