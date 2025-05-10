import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
import Button from '../../components/button';
import CreateTaskModal from '../../components/ModalCreateTask/Index';
import EmptyState from '../../components/EmptyState';
import TaskItem from '../../components/TaskItem';
import Filter from '../../components/Filter';
import FilterModal from '../../components/FilterModal';
import Fonts from '../../Theme/fonts';
import DefaultHeader from '../../components/DefaultHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { getTasks, saveTasks } from '../../Utils/asyncStorageUtils';


export interface Subtask {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface Task {
  title: string;
  description: string;
  deadline: string;
  id: string;
  categories: string[];
  isCompleted: boolean;
  priority?: number;
  subtasks: Subtask[];
}

type PriorityType = 'lowToHigh' | 'highToLow' | null;
type TagsType = string[];
type DateType = Date | null;

const Home: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
      subtasks: [],
    },
    {
      id: '2',
      title: 'Relatório mensal',
      description: 'Enviar para o chefe',
      deadline: '2025-05-08',
      categories: ['TRABALHO'],
      isCompleted: false,
      priority: 2,
      subtasks: [],
    },
    {
      id: '3',
      title: 'Ir à academia',
      description: 'Treino de pernas',
      deadline: '2025-05-07',
      categories: ['ACADEMIA'],
      isCompleted: true,
      priority: 1,
      subtasks: [],
    },
    {
      id: '4',
      title: 'Pagar conta de luz',
      description: 'Vence amanhã',
      deadline: '2025-05-08',
      categories: ['CASA', 'FINANCEIRO'],
      isCompleted: false,
      priority: 2,
      subtasks: [],
    },
    {
      id: '5',
      title: 'Bater o ponto',
      description: 'bater o ponoto pelo site do kairos e depois tenho que sair para tomar café.',
      deadline: '2025-05-08',
      categories: ['TRABALHO', 'LAZER', 'COMPASS'],
      isCompleted: false,
      priority: 2,
      subtasks: [],
    },
  ]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>(null);
  const [selectedTags, setSelectedTags] = useState<TagsType>([]);
  const [selectedDate, setSelectedDate] = useState<DateType>(null);

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await getTasks();
      setTasks(storedTasks);
    };

    loadTasks();
  }, []);


  useEffect(() => {
    const uniqueTags = new Set<string>();
    tasks.forEach(task => {
      task.categories.forEach(tag => uniqueTags.add(tag));
    });
    setAllTags(Array.from(uniqueTags));
  }, [tasks]);

  useEffect(() => {
    console.log('Estado tasks atualizado:', tasks);
  }, [tasks]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleCreateTask = useCallback(async (taskData: {
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
      subtasks: [], // Inicializa subtasks como array vazio ao criar
    };

    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask];
      saveTasks(updatedTasks); // Salva as tarefas atualizadas no AsyncStorage
      return updatedTasks;
    });

    setIsModalVisible(false);
  }, [setTasks]);

  const handleOpenCreateTaskModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseCreateTaskModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleOpenFilterModal = useCallback(() => {
    setIsFilterModalVisible(true);
  }, []);

  const handleCloseFilterModal = useCallback(() => {
    setIsFilterModalVisible(false);
  }, []);

  const handlePrioritySelect = useCallback((priority: PriorityType) => {
    setSelectedPriority(priority);
  }, []);

  const handleTagSelect = useCallback((tags: TagsType) => {
    setSelectedTags(tags);
  }, []);

  const handleDateSelect = useCallback((date: DateType) => {
    setSelectedDate(date);
  }, []);

  const handleTaskDetailsNavigation = useCallback((task: Task) => {
    navigation.navigate('TaskDetails', {
      task,
      onTaskUpdated: (updatedTask: Task) => {
        setTasks(prevTasks =>
          prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
        );
      },
    });
  }, [navigation, setTasks]);

  const renderTaskItem = useCallback(({ item }: { item: Task }) => (
    <TouchableOpacity onPress={() => handleTaskDetailsNavigation(item)}>
      <TaskItem
        title={item.title}
        description={item.description}
        categories={item.categories}
        isCompleted={item.isCompleted}
        task={item}
        onToggleComplete={() => { }}
      />
    </TouchableOpacity>
  ), [handleTaskDetailsNavigation]);

  const keyExtractorTask = useCallback((item: Task) => item.id, []);

  useEffect(() => {
    let tempTasks = [...tasks];

    // Filtrar por tags
    if (selectedTags.length > 0) {
      tempTasks = tempTasks.filter(task =>
        selectedTags.every(tag => task.categories.includes(tag))
      );
    }

    // Filtrar por data
    if (selectedDate) {
      const filterDateString = selectedDate.toISOString().split('T')[0];
      tempTasks = tempTasks.filter(task => {
        const taskDate = new Date(task.deadline);
        const taskDateString = taskDate.toISOString().split('T')[0];
        return taskDateString === filterDateString;
      });
    }

    // Ordenar por prioridade
    if (selectedPriority) {
      tempTasks.sort((a, b) => {
        const priorityA = a.priority !== undefined ? a.priority : -1;
        const priorityB = b.priority !== undefined ? b.priority : -1;

        return selectedPriority === 'lowToHigh'
          ? priorityA - priorityB
          : priorityB - priorityA;
      });
    }

    setFilteredTasks(tempTasks);
  }, [tasks, selectedPriority, selectedTags, selectedDate]);

  return (
    <View style={styles.container}>
      <DefaultHeader />

      {tasks.length === 0 ? (
        <View style={styles.containerNoTask}>
          <EmptyState />
        </View>
      ) : (
        <View style={styles.taskListContainer}>
          <Filter onPress={handleOpenFilterModal} />
            <FlatList
              data={filteredTasks}
              renderItem={renderTaskItem}
              keyExtractor={keyExtractorTask}
            />
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
