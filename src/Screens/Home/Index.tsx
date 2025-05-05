import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';
import Button from '../../components/button';
import CreateTaskModal from '../../components/ModalCreateTask';
import EmptyState from '../../components/EmptyState';
import TaskList from '../../components/TaskItem/TaskList';

const Home: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<
    { title: string; description: string; deadline: string; id: string; categories: string[]; isCompleted: boolean }[]
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

      {tasks.length === 0 ? (
        <View style={styles.containerNoTask}>
          <EmptyState />
        </View>
      ) : (
        <View style={styles.taskListContainer}>
          <TaskList tasks={tasks} setTasks={setTasks} /> 
        </View>
      )}

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