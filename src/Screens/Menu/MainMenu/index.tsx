import React, { useEffect, useState } from 'react';
import {SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';
import {CarouselActionList} from '../../../components/carouselActionList/index';
import Modal from '../../AvatarSelector/Modal'
import styles from './style';

type Props = {
  navigation: any;
  route: any;
};

const MenuPrincipal = ({ navigation, route }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.showConfirmationModal) {
      setIsModalVisible(true);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.profileSection}>
        <Image
          source={require('../../../Assets/Images/Ellipse1.png')}
          style={styles.avatar}
        />
        <View style={styles.containerInfo}>
          <Text style={[styles.profileText, styles.profileNome]}>
            Rafaela Santos
          </Text>
          <Text style={styles.profileText}>rafaela.santos@compasso.com.br</Text>
          <Text style={styles.profileText}>(11) 91234-5678</Text>
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