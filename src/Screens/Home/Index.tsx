// PÁGINA INICIAL - HOME

import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import Button from '../../components/button';
import CreateTaskModal from './Modal/Index';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateTask = (task: {
    title: string;
    description: string;
    deadline: string;
  }) => {
    console.log('handleCreateTask chamada com:', task);
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    console.log('Abrindo modal de criação de tarefa');
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    console.log('Fechando modal de criação de tarefa');
    setModalVisible(false);
  };

  const handleGoBack = () => {
    console.log('Navegando para a tela anterior');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>TASKLY</Text>
        <Image
          source={require('../../Assets/Images/Ellipse1.png')}
          style={styles.avatar}
        />
      </View>

      {/* Smiles Sad */}
      <View style={styles.containerNoTask}>
        <Image
          source={require('../../Assets/Images/SmileySad.png')}
          style={styles.smileSad}
          resizeMode='contain'
        />
        <Text style={styles.textNoTask}>No momento você não possui tarefa</Text>

        {/* Botão para Criar Tarefa */}
        <Button
          title='Criar Tarefa'
          backgroundColor='#5B3CC4'
          borderColor='#5B3CC4'
          borderWidth={0}
          textColor='#FFFFFF'
          onPress={handleOpenModal}
        />
      </View>

      {/* Link para Voltar */}
      <View style={styles.containerNoTask}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={styles.buttonNavigation}>
          <Text style={styles.buttonTextNavigation}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Criar Tarefa */}
      <CreateTaskModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onCreate={handleCreateTask}
      />
    </View>
  );
};

export default Home;
