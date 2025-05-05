import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';
import Button from '../../components/button';
import CreateTaskModal from '../../components/ModalCreateTask';
import EmptyState from '../../components/EmptyState';

const Home: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true);

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
        <EmptyState />
      </View>

      <Button
        title="Criar Tarefa"
        backgroundColor="#5B3CC4"
        textColor="#FFFFFF"
        onPress={handleOpenModal}
        width={329}
      />

      <CreateTaskModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onCreate={handleCreateTask}
      />
    </View>
  );
};

export default Home;
