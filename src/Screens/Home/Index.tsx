import React, { useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './style';
import Button from '../../components/button';
import CreateTaskModal from '../../components/ModalCreateTask';
import EmptyState from '../../components/EmptyState';
import TaskList from '../../components/TaskItem/TaskList';
import Filter from '../../components/Filter';

const Home: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [tasks, setTasks] = useState<
    {
      title: string;
      description: string;
      deadline: string;
      id: string;
      categories: string[];
      isCompleted: boolean;
    }[]
  >([]);

  const handleCreateTask = (task: {
    title: string;
    description: string;
    deadline: string;
  }) => {
    console.log('handleCreateTask chamada com:', task);
    setTasks(prevTasks => [
      ...prevTasks,
      {
        ...task,
        id: String(Date.now()),
        categories: [],
        isCompleted: false,
      },
    ]);
    setModalVisible(false);
  };

  const handleOpenCreateTaskModal = () => {
    setModalVisible(true);
  };

  const handleCloseCreateTaskModal = () => {
    setModalVisible(false);
  };

  const handleOpenFilterModal = () => {
    setFilterModalVisible(true); 
  };

  const handleCloseFilterModal = () => {
    setFilterModalVisible(false); 
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

      {tasks.length === 0 ? (
        <View style={styles.containerNoTask}>
          <EmptyState />
        </View>
      ) : (
        <View style={styles.taskListContainer}>
          <Filter onPress={handleOpenFilterModal} />
          <TaskList tasks={tasks} setTasks={setTasks} />
        </View>
      )}

      <Button
        title="Criar Tarefa"
        backgroundColor="#5B3CC4"
        textColor="#FFFFFF"
        onPress={handleOpenCreateTaskModal}
        width={329}
      />

      <CreateTaskModal
        visible={modalVisible}
        onClose={handleCloseCreateTaskModal}
        onCreate={handleCreateTask}
      />


      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseFilterModal}
      >
        <View style={filterModalStyles.modalOverlay}>
          <View style={filterModalStyles.modalContent}>
            <Text style={filterModalStyles.modalTitle}>Filtros</Text>
            <TouchableOpacity style={filterModalStyles.closeButton} onPress={handleCloseFilterModal}>
              <Text style={filterModalStyles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const filterModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    minHeight: 200,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default Home;