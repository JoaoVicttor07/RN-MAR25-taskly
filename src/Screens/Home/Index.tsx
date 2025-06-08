import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, FlatList, TouchableOpacity, Text, Image} from 'react-native';
import styles from './style';
import Button from '../../components/button';
import CreateTaskModal from '../../components/ModalCreateTask/Index';
import EmptyState from '../../components/EmptyState';
import TaskItem from '../../components/TaskItem';
import Filter from '../../components/Filter';
import FilterModal from '../../components/FilterModal';
import Fonts from '../../Theme/fonts';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, BottomTabParamList} from '../../Navigation/types';
import {getTasks, saveTasks} from '../../Utils/asyncStorageUtils';
import {Task} from '../../interfaces/task';
import {useUser} from '../../contexts/userContext';
import {getProfile} from '../../services/authService';
import {getToken, refreshAuthToken, removeToken} from '../../Utils/authUtils';
import {Alert} from 'react-native';

const avatarMap: Record<string, any> = {
  avatar_1: require('../../Assets/Images/Avatars/avatar_1.png'),
  avatar_2: require('../../Assets/Images/Avatars/avatar_2.png'),
  avatar_3: require('../../Assets/Images/Avatars/avatar_3.png'),
  avatar_4: require('../../Assets/Images/Avatars/avatar_4.png'),
  avatar_5: require('../../Assets/Images/Avatars/avatar_5.png'),
};

type PriorityType = 'lowToHigh' | 'highToLow' | null;
type TagsType = string[];
type DateType = Date | null;

type HomeRouteProp = RouteProp<BottomTabParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<HomeRouteProp>();
  const flatListRef = useRef<FlatList<Task>>(null);
  const {user, setUser} = useUser();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>(null);
  const [selectedTags, setSelectedTags] = useState<TagsType>([]);
  const [selectedDate, setSelectedDate] = useState<DateType>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchUserProfile = async () => {
        try {
          const token = await getToken();
          if (!token)
            throw new Error('Token não encontrado. Faça login novamente.');

          const response = await getProfile(token);

          if (response.status === 200) {
            const data = response.data;
            setUser({
              name: data.name || 'Usuário',
              email: data.email || 'Email não disponível',
              phone: data.phone_number || 'Telefone não disponível',
              avatarUrl: data.picture || '',
            });
          } else if (response.status === 401) {
            try {
              const newToken = await refreshAuthToken();
              const retryResponse = await getProfile(newToken);
              if (retryResponse.status === 200) {
                const data = retryResponse.data;
                setUser({
                  name: data.name || 'Usuário',
                  email: data.email || 'Email não disponível',
                  phone: data.phone_number || 'Telefone não disponível',
                  avatarUrl: data.picture || '',
                });
              } else {
                throw new Error('Erro ao buscar perfil com novo token.');
              }
            } catch (refreshError) {
              Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
              await removeToken();
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            }
          } else {
            Alert.alert(
              'Erro',
              'Não foi possível carregar as informações do perfil.',
            );
          }
        } catch (error) {
          Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }
      };

      fetchUserProfile();
    }, [navigation, setUser]),
  );

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await getTasks();
        if (storedTasks && storedTasks.length > 0) {
          setTasks(storedTasks);
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const uniqueTags = new Set<string>();
    tasks.forEach(task => {
      (task.categories ?? []).forEach(tag => uniqueTags.add(tag));
    });
    setAllTags(Array.from(uniqueTags));
  }, [tasks]);

  useEffect(() => {
    const saveTasksToStorage = async () => {
      try {
        await saveTasks(tasks);
      } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
      }
    };
    if (tasks.length > 0) {
      saveTasksToStorage();
    }
  }, [tasks]);

  useEffect(() => {
    const scrollToTaskId = route.params?.scrollToTaskId;
    if (scrollToTaskId && filteredTasks.length > 0) {
      const index = filteredTasks.findIndex(task => task.id === scrollToTaskId);
      if (index !== -1 && flatListRef.current) {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({index, animated: true});
        }, 500);
      }
    }
  }, [route.params?.scrollToTaskId, filteredTasks]);

  const handleCreateTask = useCallback(
    async (taskData: {
      title: string;
      description: string;
      deadline: string | null | undefined;
    }) => {
      const newTask: Task = {
        ...taskData,
        id: String(Date.now()),
        categories: [],
        isCompleted: false,
        priority: 0,
        subtasks: [],
        createdAt: Date.now(),
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setIsModalVisible(false);
    },
    [],
  );

  const handleOpenCreateTaskModal = () => setIsModalVisible(true);
  const handleCloseCreateTaskModal = () => setIsModalVisible(false);
  const handleOpenFilterModal = () => setIsFilterModalVisible(true);
  const handleCloseFilterModal = () => setIsFilterModalVisible(false);

  const handlePrioritySelect = (priority: PriorityType) =>
    setSelectedPriority(priority);
  const handleTagSelect = (tags: TagsType) => setSelectedTags(tags);
  const handleDateSelect = (date: DateType) => setSelectedDate(date);

  const handleTaskDetailsNavigation = (taskItem: Task) => {
    navigation.navigate('TaskDetails', {task: taskItem});
  };

  const handleToggleTaskComplete = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? {...task, isCompleted: !task.isCompleted} : task,
      ),
    );
  };

  const renderTaskItem = ({item}: {item: Task}) => (
    <TouchableOpacity onPress={() => handleTaskDetailsNavigation(item)}>
      <TaskItem
        title={item.title}
        description={item.description ?? ''}
        categories={item.categories ?? []}
        isCompleted={item.isCompleted}
        task={item}
        onToggleComplete={() => handleToggleTaskComplete(item.id)}
      />
    </TouchableOpacity>
  );

  const keyExtractorTask = (item: Task) => item.id;

  useEffect(() => {
    let tempTasks = [...tasks];

    // Filtra por tags selecionadas
    if (selectedTags.length > 0) {
      tempTasks = tempTasks.filter(task =>
        selectedTags.every(tag => (task.categories ?? []).includes(tag)),
      );
    }

    // Filtra por data selecionada
    if (selectedDate) {
      const filterDateString = selectedDate.toISOString().split('T')[0];

      tempTasks = tempTasks.filter(task => {
        if (!task.deadline) return false;

        const taskDate = new Date(task.deadline);
        if (isNaN(taskDate.getTime())) return false;

        const taskDateString = taskDate.toISOString().split('T')[0];
        return taskDateString === filterDateString;
      });
    }

    // Ordena por prioridade
    if (selectedPriority) {
      tempTasks.sort((a, b) => {
        const priorityA = a.priority ?? -1;
        const priorityB = b.priority ?? -1;

        return selectedPriority === 'lowToHigh'
          ? priorityA - priorityB
          : priorityB - priorityA;
      });
    }

    setFilteredTasks(tempTasks);
  }, [tasks, selectedTags, selectedDate, selectedPriority]);

  useFocusEffect(
    useCallback(() => {
      const loadUpdatedTasks = async () => {
        try {
          const storedTasks = await getTasks();
          if (storedTasks) {
            setTasks(storedTasks);
          }
        } catch (error) {
          console.error('Erro ao recarregar tarefas:', error);
        }
      };
      loadUpdatedTasks();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TASKLY</Text>
        <Image
          source={
            user?.avatarUrl && avatarMap[user.avatarUrl]
              ? avatarMap[user.avatarUrl]
              : require('../../Assets/Images/Avatars/avatar_5.png')
          }
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
          <FlatList
            ref={flatListRef}
            data={filteredTasks}
            renderItem={renderTaskItem}
            keyExtractor={keyExtractorTask}
            showsVerticalScrollIndicator={false}
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
