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
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TASKLY</Text>
        <Image
          source={require('../../Assets/Images/Avatars/avatar-1.jpg')}
          style={styles.avatar}
        />
      </View>

      <View style={styles.containerNoTask}>
        <Image
          source={require('../../Assets/Images/SmileSad.png')}
          style={styles.smileSad}
          resizeMode="contain"
        />
        <Text style={styles.textNoTask}>No momento você não possui tarefa</Text>

        <Button
          title="Criar Tarefa"
          backgroundColor="#5B3CC4"
          borderColor="#5B3CC4"
          borderWidth={0}
          textColor="#FFFFFF"
          onPress={handleOpenModal}
        />
      </View>

      <View style={styles.containerNoTask}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={styles.buttonNavigation}>
          <Text style={styles.buttonTextNavigation}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <CreateTaskModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onCreate={handleCreateTask}
      />
    </View>
  );
};

export default Home;