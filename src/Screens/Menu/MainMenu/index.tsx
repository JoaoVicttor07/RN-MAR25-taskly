import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CarouselActionList} from '../../../components/carouselActionList/index';
import Modal from '../../AvatarSelector/Modal';
import styles from './style';
import {useUser} from '../../../contexts/userContext';
import { getProfile } from '../../../services/authService';
import {
  getToken,
  removeToken,
  refreshAuthToken,
} from '../../../Utils/authUtils';

const avatarMap: Record<string, any> = {
  avatar_1: require('../../../Assets/Images/Avatars/avatar_1.png'),
  avatar_2: require('../../../Assets/Images/Avatars/avatar_2.png'),
  avatar_3: require('../../../Assets/Images/Avatars/avatar_3.png'),
  avatar_4: require('../../../Assets/Images/Avatars/avatar_4.png'),
  avatar_5: require('../../../Assets/Images/Avatars/avatar_5.png'),
};


type Props = {
  navigation: any;
  route: any;
};

const MenuPrincipal = ({navigation, route}: Props) => {
  const {user, setUser} = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  // const [userData, setUserData] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   avatarUrl: '', // Adicionado para armazenar o avatar
  // });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error('Token não encontrado. Faça login novamente.');

        const response = await getProfile(token);

        if (response.status === 200) {
          const data = response.data;
          setUser({
            name: data.name || 'Usuário',
            email: data.email || 'Email não disponível',
            phone: data.phone_number || 'Telefone não disponível',
            avatarUrl: data.picture || '',
          });
        } else if (response.status === 401) {
          try {
            const newToken = await refreshAuthToken();
            const retryResponse = await getProfile(newToken);
            if (retryResponse.status === 200) {
              const data = retryResponse.data;
              setUser({
                name: data.name || 'Usuário',
                email: data.email || 'Email não disponível',
                phone: data.phone_number || 'Telefone não disponível',
                avatarUrl: data.picture || '',
              });
            } else {
              throw new Error('Erro ao buscar perfil com novo token.');
            }
          } catch (refreshError) {
            Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
            await removeToken();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        } else {
          Alert.alert('Erro', 'Não foi possível carregar as informações do perfil.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };

    // Só busca se não houver dados no contexto
    if (!user) {
      fetchUserProfile();
    }
  }, [navigation, setUser, user]);


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
            user?.avatarUrl && avatarMap[user?.avatarUrl]
              ? avatarMap[user?.avatarUrl]
              : require('../../../Assets/Images/Avatars/avatar_5.png')
          }
          style={styles.avatar}
        />
        <View style={styles.containerInfo}>
          <Text style={[styles.profileText, styles.profileNome]}>
            {user?.name}
          </Text>
          <Text style={styles.profileText}>{user?.email}</Text>
          <Text style={styles.profileText}>{user?.phone}</Text>
        </View>
      </View>

      <View style={styles.carouselContainer}>
        <CarouselActionList />
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PreferencesMenu')}>
          <Text style={styles.buttonText}>Preferências</Text>
          <Image
            source={require('../../../Assets/icons/VectorBack.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Regulamentos')}>
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
