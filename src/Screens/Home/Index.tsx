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
import {Task} from '../../interfaces/task';
import {useUser} from '../../contexts/userContext';
import {getProfile} from '../../services/authService';
import {createTask, fetchTasks} from '../../services/taskService';
import {getToken, refreshAuthToken, removeToken} from '../../Utils/authUtils';
import {Alert} from 'react-native';

const mapPriorityToApi = (priority: number | undefined) => {
  if (priority === 2) return 1;
  if (priority === 1) return 2;
  if (priority === 0) return 3;
  return 3;
};
const mapPriorityFromApi = (priority: number | undefined) => {
  if (priority === 1) return 2;
  if (priority === 2) return 1;
  if (priority === 3) return 0;
  return 0;
};

const bucketBaseUrl =
  'https://taskly-avatares-usuario.s3.us-east-2.amazonaws.com/avatars/';

const avatarMap: Record<string, any> = {
  avatar_1: {uri: `${bucketBaseUrl}avatar_1.png`},
  avatar_2: {uri: `${bucketBaseUrl}avatar_2.png`},
  avatar_3: {uri: `${bucketBaseUrl}avatar_3.png`},
  avatar_4: {uri: `${bucketBaseUrl}avatar_4.png`},
  avatar_5: {uri: `${bucketBaseUrl}avatar_5.png`},
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
        const apiTasks = await fetchTasks();
        const mappedTasks = apiTasks.map((t: any) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          isCompleted: t.done,
          categories: t.tags,
          priority: mapPriorityFromApi(t.priority),
          deadline: t.deadline,
          subtasks: (t.subtasks ?? []).map((s: any, idx: number) => ({
            id: String(idx),
            text: s.title,
            isCompleted: s.done,
          })),
          createdAt: new Date(t.createdAt).getTime(),
        }));
        setTasks(mappedTasks);
      } catch (error) {
        console.error('Erro ao carregar tarefas da API:', error);
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

  // Remova o saveTasks do asyncStorage
  // useEffect(() => {
  //   const saveTasksToStorage = async () => {
  //     try {
  //       await saveTasks(tasks);
  //     } catch (error) {
  //       console.error('Erro ao salvar tarefas:', error);
  //     }
  //   };
  //   if (tasks.length > 0) {
  //     saveTasksToStorage();
  //   }
  // }, [tasks]);

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

  // Atualize para criar tarefa via API
  const handleCreateTask = useCallback(
    async (taskData: {
      title: string;
      description?: string;
      deadline: string | null | undefined;
      priority?: number;
      subtasks?: {text: string; isCompleted: boolean}[];
      categories?: string[];
    }) => {
      // Validação das regras do endpoint
      if (
        !taskData.title ||
        typeof taskData.title !== 'string' ||
        !taskData.title.trim()
      ) {
        Alert.alert('Erro', 'O título é obrigatório.');
        return;
      }
      if (
        !taskData.deadline ||
        !/^\d{2}\/\d{2}\/\d{4}$/.test(taskData.deadline)
      ) {
        Alert.alert(
          'Erro',
          'A data é obrigatória e deve estar no formato dd/mm/yyyy.',
        );
        return;
      }
      const priority = mapPriorityToApi(taskData.priority);
      priority: 3;
      const tags = (taskData.categories ?? []).slice(0, 5);

      // Subtasks: adapte se vierem do modal como {text, isCompleted}
      const subtasks = (taskData.subtasks ?? []).map(st => ({
        title: st.text,
        done: st.isCompleted,
      }));

      try {
        await createTask({
          title: taskData.title.trim(),
          description: taskData.description,
          done: false,
          deadline: taskData.deadline,
          priority,
          subtasks,
          tags,
        });
        // Recarrega as tarefas da API após criar
        const apiTasks = await fetchTasks();
        const mappedTasks = apiTasks.map((t: any) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          isCompleted: t.done,
          categories: t.tags,
          priority: t.priority,
          deadline: t.deadline,
          subtasks: (t.subtasks ?? []).map((s: any, idx: number) => ({
            id: String(idx),
            text: s.title,
            isCompleted: s.done,
          })),
          createdAt: new Date(t.createdAt).getTime(),
        }));
        setTasks(mappedTasks);
        setIsModalVisible(false);
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        Alert.alert('Erro', 'Não foi possível criar a tarefa.');
      }
    },
    [],
  );

  //   const handleEditTask = useCallback(
  //   async (taskId: string, updatedData: {
  //     title?: string;
  //     description?: string;
  //     deadline?: string;
  //     priority?: number;
  //     done?: boolean;
  //     subtasks?: { text: string; isCompleted: boolean }[];
  //     categories?: string[];
  //   }) => {
  //     // Adapte os campos para o formato da API
  //     const dataToSend: any = {};
  //     if (updatedData.title) dataToSend.title = updatedData.title.trim();
  //     if (updatedData.description !== undefined) dataToSend.description = updatedData.description;
  //     if (updatedData.deadline) dataToSend.deadline = updatedData.deadline;
  //     if (updatedData.priority) dataToSend.priority = updatedData.priority;
  //     if (updatedData.done !== undefined) dataToSend.done = updatedData.done;
  //     if (updatedData.categories) dataToSend.tags = updatedData.categories.slice(0, 5);
  //     if (updatedData.subtasks) {
  //       dataToSend.subtasks = updatedData.subtasks.map(st => ({
  //         title: st.text,
  //         done: st.isCompleted,
  //       }));
  //     }

  //     try {
  //       await updateTask(taskId, dataToSend);
  //       // Recarregue as tarefas após editar
  //       const apiTasks = await fetchTasks();
  //       const mappedTasks = apiTasks.map((t: any) => ({
  //         id: t.id,
  //         title: t.title,
  //         description: t.description,
  //         isCompleted: t.done,
  //         categories: t.tags,
  //         priority: t.priority,
  //         deadline: t.deadline,
  //         subtasks: (t.subtasks ?? []).map((s: any, idx: number) => ({
  //           id: String(idx),
  //           text: s.title,
  //           isCompleted: s.done,
  //         })),
  //         createdAt: new Date(t.createdAt).getTime(),
  //       }));
  //       setTasks(mappedTasks);
  //     } catch (error) {
  //       Alert.alert('Erro', 'Não foi possível editar a tarefa.');
  //     }
  //   },
  //   [],
  // );

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

  // Atualize para marcar tarefa como concluída na API (exemplo: PATCH /tasks/:id)
  // Aqui mantemos apenas local, mas para produção, implemente na API também
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

  // Atualize para recarregar tarefas da API ao focar
  useFocusEffect(
    useCallback(() => {
      const loadUpdatedTasks = async () => {
        try {
          const apiTasks = await fetchTasks();
          const mappedTasks = apiTasks.map((t: any) => ({
            id: t.id,
            title: t.title,
            description: t.description,
            isCompleted: t.done,
            categories: t.tags,
            priority: t.priority,
            deadline: t.deadline,
            subtasks: (t.subtasks ?? []).map((s: any, idx: number) => ({
              id: String(idx),
              text: s.title,
              isCompleted: s.done,
            })),
            createdAt: new Date(t.createdAt).getTime(),
          }));
          setTasks(mappedTasks);
        } catch (error) {
          console.error('Erro ao recarregar tarefas da API:', error);
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
            // ? avatarMap[user.avatarUrl]
            // : require('../../Assets/Images/Avatars/avatar_5.png')
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
