// MainMenu

import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';
import { CarouselActionList } from '../../../components/carouselActionList';
import styles from './style';

type Props = {
  navigation: any;
};

const MenuPrincipal = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Perfil do usuário */}
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

      {/* Carrossel de ações */}
      <View style={styles.carouselContainer}>
        <CarouselActionList />
      </View>

      {/* Botões de navegação */}
      <View style={styles.containerButtons}>
        {/* Preferências */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Preferencias')}
        >
          <Text style={styles.buttonText}>Preferências</Text>
          <Image
            source={require('../../../Assets/icons/VectorBack.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Termos e Regulamentos */}
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
    </SafeAreaView>
  );
};

export default MenuPrincipal;
