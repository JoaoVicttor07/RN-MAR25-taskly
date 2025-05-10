// Home.tsx
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigation/types';
import { getTasks, saveTasks } from '../../Utils/asyncStorageUtils';
import { Task } from '../../interfaces/task';  // Importa Task e Subtask do arquivo dedicado

type PriorityType = 'lowToHigh' | 'highToLow' | null;
type TagsType = string[];
type DateType = Date | null;


const Home: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>(null);
  const [selectedTags, setSelectedTags] = useState<TagsType>([]);
  const [selectedDate, setSelectedDate] = useState<DateType>(null);

  // Carrega as tarefas do AsyncStorage no carregamento inicial
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await getTasks();
        if (storedTasks && storedTasks.length > 0) {
          setTasks(storedTasks);
        }
        // Se não houver tarefas armazenadas, o estado `tasks` permanecerá vazio, e a tela será renderizada corretamente.
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        // Aqui você pode querer mostrar uma mensagem de erro ao usuário
      }
    };
    loadTasks();
  }, []);

  // Atualiza a lista de tags únicas quando as tarefas mudam
  useEffect(() => {
    const uniqueTags = new Set<string>();
    tasks.forEach(task => {
      task.categories.forEach(tag => uniqueTags.add(tag));
    });
    setAllTags(Array.from(uniqueTags));
  }, [tasks]);

  // Salva as tarefas no AsyncStorage sempre que o estado `tasks` mudar.
  useEffect(() => {
    const saveTasksToStorage = async () => {
      try {
        await saveTasks(tasks);
      } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
        // Aqui você pode querer mostrar uma mensagem de erro ao usuário
      }
    };
    if (tasks.length > 0) {
      saveTasksToStorage();
    }
  }, [tasks]);

  // Função para criar uma nova tarefa
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
      subtasks: [],
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsModalVisible(false);
  }, [setTasks]);

  // Funções para abrir/fechar modais
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

  // Funções para lidar com seleção de filtro
  const handlePrioritySelect = useCallback((priority: PriorityType) => {
    setSelectedPriority(priority);
  }, []);

  const handleTagSelect = useCallback((tags: TagsType) => {
    setSelectedTags(tags);
  }, []);

  const handleDateSelect = useCallback((date: DateType) => {
    setSelectedDate(date);
  }, []);

  // Função para navegar para a tela de detalhes da tarefa
  const handleTaskDetailsNavigation = useCallback((taskItem: Task) => {
    navigation.navigate('TaskDetails', {
      task: taskItem,
    });
  }, [navigation]);

  const handleToggleTaskComplete = useCallback((taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }, [setTasks]);

  // Renderiza um item de tarefa na lista
  const renderTaskItem = useCallback(({ item }: { item: Task }) => (
    <TouchableOpacity onPress={() => handleTaskDetailsNavigation(item)}>
      <TaskItem
        title={item.title}
        description={item.description}
        categories={item.categories}
        isCompleted={item.isCompleted}
        task={item}
        onToggleComplete={() => handleToggleTaskComplete(item.id)}
      />
    </TouchableOpacity>
  ), [handleTaskDetailsNavigation, handleToggleTaskComplete]);

  // Função para extrair a chave única de um item da tarefa
  const keyExtractorTask = useCallback((item: Task) => item.id, []);

  // Aplica os filtros e ordenação à lista de tarefas
  useEffect(() => {
    let tempTasks = [...tasks];

    if (selectedTags.length > 0) {
      tempTasks = tempTasks.filter(task =>
        selectedTags.every(tag => task.categories.includes(tag))
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

        return selectedPriority === 'lowToHigh'
          ? priorityA - priorityB
          : priorityB - priorityA;
      });
    }

    setFilteredTasks(tempTasks);
  }, [tasks, selectedPriority, selectedTags, selectedDate]);

  // Recarrega as tarefas quando a tela volta ao foco
  useFocusEffect(
    useCallback(() => {
      const loadUpdatedTasks = async () => {
        try {
          const storedTasks = await getTasks();
          if (storedTasks) {
            setTasks(storedTasks);
          }
        } catch (error) {
          console.error('Erro ao recarregar tarefas ao voltar para Home:', error);
        }
      };
      loadUpdatedTasks();
    }, [setTasks])
  );

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
