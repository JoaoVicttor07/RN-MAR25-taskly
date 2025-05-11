import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { CarouselActionList } from '../../../components/carouselActionList/index';
import Modal from '../../AvatarSelector/Modal';
import getStyles from './style';
import { API_BASE_URL } from '../../../env';
import * as Keychain from 'react-native-keychain';
import { useTheme } from '../../../Theme/ThemeContext';

type Props = {
  navigation: any;
  route: any;
};

const MenuPrincipal = ({ navigation, route }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false); // Controle para evitar exibição duplicada
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  }); // Estado para armazenar os dados do usuário

  const { theme } = useTheme(); // Obtenha o tema
  const themedStyles = getStyles(theme);

  // Função para buscar o perfil do usuário
  const fetchUserProfile = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (!credentials) {
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
        });
      } else {
        console.error('Erro ao buscar perfil:', response.status);
        Alert.alert('Erro', 'Não foi possível carregar as informações do perfil.');
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      Alert.alert('Erro', 'Não foi possível carregar as informações do perfil.');
    }
  };

  useEffect(() => {
    fetchUserProfile(); // Busca o perfil do usuário ao carregar a tela
  }, []);

  useEffect(() => {
    if (route.params?.showConfirmationModal && !hasShownModal) {
      setIsModalVisible(true);
      setHasShownModal(true); // Marca o modal como exibido
    }
  }, [route.params, hasShownModal]);

  return (
    <SafeAreaView style={themedStyles.safeArea}>
      <View style={themedStyles.profileSection}>
        <Image
          source={require('../../../Assets/Images/Ellipse1.png')}
          style={themedStyles.avatar}
        />
        <View style={themedStyles.containerInfo}>
          <Text style={[themedStyles.profileText, themedStyles.profileNome]}>
            {userData.name}
          </Text>
          <Text style={themedStyles.profileText}>{userData.email}</Text>
          <Text style={themedStyles.profileText}>{userData.phone}</Text>
        </View>
      </View>

      <View style={themedStyles.carouselContainer}>
        <CarouselActionList />
      </View>

      <View style={themedStyles.containerButtons}>
        <TouchableOpacity
          style={themedStyles.button}
          onPress={() => navigation.navigate('PreferencesMenu')}>
          <Text style={themedStyles.buttonText}>Preferências</Text>
          <Image
            source={require('../../../Assets/icons/VectorBack.png')}
            style={themedStyles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={themedStyles.button}
          onPress={() => navigation.navigate('Regulamentos')}>
          <Text style={themedStyles.buttonText}>Termos e regulamentos</Text>
          <Image
            source={require('../../../Assets/icons/VectorBack.png')}
            style={themedStyles.icon}
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
