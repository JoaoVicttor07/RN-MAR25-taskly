import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import styles from './style';
import Button from '../../components/button';
import CreateTaskModal from '../../components/ModalCreateTask/Index';
import EmptyState from '../../components/EmptyState';
import TaskList from '../../components/TaskItem/TaskList';
import Filter from '../../components/Filter';
import FilterModal from '../../components/ModalFilter';
import Fonts from '../../Theme/fonts';

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
        title="CRIAR TAREFA"
        fontFamily={Fonts.Roboto60020.fontFamily}
        fontWeight={600}
        fontSize={Fonts.Roboto60020.fontSize}
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

      <FilterModal
        visible={filterModalVisible}
        onClose={handleCloseFilterModal}
      />
    </View>
  );
};

export default Home;