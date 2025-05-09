import React, { useState, useEffect } from 'react';
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
import FilterModal from '../../components/FilterModal';
import Fonts from '../../Theme/fonts';

type PriorityType = 'lowToHigh' | 'highToLow' | null;
type TagsType = string[];
type DateType = Date | null;

interface Task {
  title: string;
  description: string;
  deadline: string;
  id: string;
  categories: string[];
  isCompleted: boolean;
  priority?: number;
}

const Home: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Comprar pão',
      description: 'Na padaria da esquina',
      deadline: '2025-05-10',
      categories: ['CASA', 'GASTO'],
      isCompleted: false,
      priority: 0,
    },
    {
      id: '2',
      title: 'Relatório mensal',
      description: 'Enviar para o chefe',
      deadline: '2025-05-08',
      categories: ['TRABALHO'],
      isCompleted: false,
      priority: 2,
    },
    {
      id: '3',
      title: 'Ir à academia',
      description: 'Treino de pernas',
      deadline: '2025-05-07',
      categories: ['ACADEMIA'],
      isCompleted: true,
      priority: 1,
    },
    {
      id: '4',
      title: 'Pagar conta de luz',
      description: 'Vence amanhã',
      deadline: '2025-05-08',
      categories: ['CASA', 'FINANCEIRO'],
      isCompleted: false,
      priority: 2,
    },
  ]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>(null);
  const [selectedTags, setSelectedTags] = useState<TagsType>([]);
  const [selectedDate, setSelectedDate] = useState<DateType>(null);

  useEffect(() => {
    const uniqueTags = new Set<string>();
    tasks.forEach(task => {
      task.categories.forEach(tag => uniqueTags.add(tag));
    });
    setAllTags(Array.from(uniqueTags));
  }, [tasks]);

  const handleCreateTask = (taskData: {
    title: string;
    description: string;
    deadline: string;
  }) => {
    const newTask: Task = {
      ...taskData,
      id: String(Date.now()),
      categories: [],
      isCompleted: false,
      priority: 0,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsModalVisible(false);
  };

  const handleOpenCreateTaskModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseCreateTaskModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalVisible(false);
  };

  const handlePrioritySelect = (priority: PriorityType) => {
    setSelectedPriority(priority);
  };

  const handleTagSelect = (tags: TagsType) => {
    setSelectedTags(tags);
  };

  const handleDateSelect = (date: DateType) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    let tempTasks = [...tasks];

    if (selectedTags.length > 0) {
      tempTasks = tempTasks.filter(task =>
        selectedTags.every(tag => task.categories.includes(tag)),
      );
    }

    if (selectedDate) {
      const filterDateString = selectedDate.toISOString().split('T')[0];
      tempTasks = tempTasks.filter(task => {
        const taskDate = new Date(task.deadline);
        const taskDateString = taskDate.toISOString().split('T')[0];
        return taskDateString === filterDateString;
      });
    }

    if (selectedPriority) {
      tempTasks.sort((a, b) => {
        const priorityA = a.priority !== undefined ? a.priority : -1;
        const priorityB = b.priority !== undefined ? b.priority : -1;

        if (selectedPriority === 'lowToHigh') {
          return priorityA - priorityB;
        } else {
          return priorityB - priorityA;
        }
      });
    }

    setFilteredTasks(tempTasks);
  }, [tasks, selectedPriority, selectedTags, selectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TASKLY</Text>
        <Image
          source={require('../../Assets/Images/Avatars/avatar_1.jpg')}
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
          <TaskList tasks={filteredTasks} setTasks={setTasks} />
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
        visible={isModalVisible}
        onClose={handleCloseCreateTaskModal}
        onCreate={handleCreateTask}
      />

      <FilterModal
        visible={isFilterModalVisible}
        onClose={handleCloseFilterModal}
        onPrioritySelect={handlePrioritySelect}
        onTagSelect={handleTagSelect}
        onDateSelect={handleDateSelect}
        availableTags={allTags}
      />
    </View>
  );
};

export default Home;