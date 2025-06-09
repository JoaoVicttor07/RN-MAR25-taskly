import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Navigation/types';
import styles from './style';
import DefaultHeader from '../../components/DefaultHeader';
import CategoryTag from '../../components/CategoryTag';
import SmallBackButton from '../../components/SmallBackButton';
import Input from '../../components/input';
import SubtaskList from '../../components/SubtaskList';
import DateInput from '../../components/DateInput';
import {Task, Subtask} from '../../interfaces/task';
import {updateTask} from '../../services/taskService';
import ArrowConfirmIcon from '../../Assets/icons/arrowConfirm.png';
import CheckedIcon from '../../Assets/icons/CheckSquare-2.png';
import UncheckedIcon from '../../Assets/icons/CheckSquare-1.png';
import GoldPencilIcon from '../../Assets/icons/GoldPencil.png';
import XCircle from '../../Assets/icons/XCircle.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {format, isValid, isBefore, startOfDay} from 'date-fns';
import {parse} from 'date-fns';

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

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

interface TaskDetailsProps {
  onTaskUpdated?: (updatedTask: Task) => void;
}

type PriorityLevel = 'ALTA' | 'MÉDIA' | 'BAIXA';

const mapPriorityToString = (priority?: number): PriorityLevel => {
  switch (priority) {
    case 2:
      return 'ALTA';
    case 1:
      return 'MÉDIA';
    case 0:
    default:
      return 'BAIXA';
  }
};

const TaskDetailsScreen: React.FC<TaskDetailsProps> = ({onTaskUpdated}) => {
  const route = useRoute<TaskDetailsRouteProp>();
  const [deadlineError, setDeadlineError] = useState('');
  const {task: initialTask} = route.params;
  const [task, setTask] = useState<Task>(initialTask);
  const [newTag, setNewTag] = useState('');
  const [subtasks, setSubtasks] = useState<Subtask[]>(
    initialTask.subtasks || [],
  );
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(initialTask.title);
  const [editedDescription, setEditedDescription] = useState(
    initialTask.description,
  );
  const [editedCategories, setEditedCategories] = useState<string[]>(
    initialTask.categories || [],
  );
  const [editedPriority, setEditedPriority] = useState<number | undefined>(
    mapPriorityFromApi(initialTask.priority),
  );
  const [editedDeadline, setEditedDeadline] = useState<Date | null>(null);
  const [tagError, setTagError] = useState('');

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'TaskDetails'>>();

  useEffect(() => {
    if (initialTask?.deadline) {
      const parsedDate = parse(initialTask.deadline, 'dd/MM/yyyy', new Date());
      if (isValid(parsedDate)) {
        setEditedDeadline(parsedDate);
      } else {
        setEditedDeadline(null);
        console.error('Data de prazo inicial inválida:', initialTask.deadline);
      }
    } else {
      setEditedDeadline(null);
    }
    setTask(initialTask);
    setSubtasks(initialTask.subtasks || []);
  }, [initialTask]);

  useEffect(() => {
    console.log('Valor de editedDeadline:', editedDeadline);
  }, [editedDeadline]);

  const handleResolveTask = async (): Promise<void> => {
    const updatedTask = {...task, isCompleted: true};
    setTask(updatedTask);
    await handleUpdateTask(updatedTask);

    navigation.navigate('MainApp', {
      screen: 'Home',
      params: {scrollToTaskId: updatedTask.id},
    });
  };

  const handleReopenTask = async (): Promise<void> => {
    const updatedTask = {...task, isCompleted: false};
    setTask(updatedTask);
    await handleUpdateTask(updatedTask);

    navigation.navigate('MainApp', {
      screen: 'Home',
      params: {scrollToTaskId: updatedTask.id},
    });
  };

  const handleShowAddSubtaskInput = (): void => {
    setShowInput(true);
    setNewSubtaskText('');
  };

  const handleUpdateTask = useCallback(
    async (updatedTask: Task): Promise<void> => {
      try {
        await updateTask(updatedTask.id, {
          title: updatedTask.title,
          description: updatedTask.description,
          deadline: updatedTask.deadline ?? undefined,
          priority: updatedTask.priority,
          done: updatedTask.isCompleted,
          subtasks: updatedTask.subtasks?.map(st => ({
            title: st.text,
            done: st.isCompleted,
          })),
          tags: updatedTask.categories,
        });
        if (onTaskUpdated) {
          onTaskUpdated(updatedTask);
        }
      } catch (error: any) {
        console.error('Erro ao atualizar a tarefa:', error);
      }
    },
    [onTaskUpdated],
  );

  const handleAddSubtask = useCallback((): void => {
    const text = newSubtaskText.trim();
    if (text) {
      const newSubtask: Subtask = {
        id: String(Date.now()),
        text: text,
        isCompleted: false,
      };
      const updatedSubtasks = [...subtasks, newSubtask];
      setSubtasks(updatedSubtasks);

      const updatedTask = {...task, subtasks: updatedSubtasks};
      handleUpdateTask(updatedTask);
      setNewSubtaskText('');
      setShowInput(false);
    }
  }, [newSubtaskText, subtasks, task, handleUpdateTask]);

  const handleToggleSubtask = useCallback(
    (id: string): void => {
      const updatedSubtasks = subtasks.map(subtask =>
        subtask.id === id
          ? {...subtask, isCompleted: !subtask.isCompleted}
          : subtask,
      );
      setSubtasks(updatedSubtasks);

      const updatedTask = {...task, subtasks: updatedSubtasks};
      handleUpdateTask(updatedTask);
    },
    [subtasks, task, handleUpdateTask],
  );

  const handleEditSubtask = useCallback(
    (id: string, newText: string): void => {
      const updatedSubtasks = subtasks.map(subtask =>
        subtask.id === id ? {...subtask, text: newText} : subtask,
      );
      setSubtasks(updatedSubtasks);

      const updatedTask = {...task, subtasks: updatedSubtasks};
      handleUpdateTask(updatedTask);
    },
    [subtasks, task, handleUpdateTask],
  );

  const priorityText = mapPriorityToString(task.priority);

  const handleEditTask = (): void => {
    setIsEditing(true);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedCategories(task.categories || []);
    setEditedPriority(task.priority);
    setEditedDeadline(
      task.deadline ? parse(task.deadline, 'dd/MM/yyyy', new Date()) : null,
    );
  };

  const handleCancelEdit = (): void => {
    setIsEditing(false);
  };

  const handleConfirmEdit = async (): Promise<void> => {
    setDeadlineError('');

    if (
      editedDeadline &&
      isValid(editedDeadline) &&
      isBefore(startOfDay(editedDeadline), startOfDay(new Date()))
    ) {
      setDeadlineError('O prazo não pode ser anterior à data de hoje.');
      return;
    }

    const deadlineToSave =
      editedDeadline && isValid(editedDeadline)
        ? format(editedDeadline, 'dd/MM/yyyy')
        : task.deadline || format(new Date(), 'dd/MM/yyyy');

    const subtasksToSend = subtasks.map(st => ({
      title: st.text,
      done: st.isCompleted,
    }));

    const updatedData = {
      title: editedTitle,
      description: editedDescription,
      deadline: deadlineToSave,
      priority: mapPriorityToApi(editedPriority) || 3,
      tags: editedCategories.slice(0, 5),
      subtasks: subtasksToSend,
      done: task.isCompleted,
    };
    console.log('Payload enviado para updateTask:', updatedData);

    try {
      await updateTask(task.id, updatedData);
      setTask({...task, ...updatedData, subtasks, deadline: deadlineToSave});
      setIsEditing(false);
      if (onTaskUpdated)
        onTaskUpdated({
          ...task,
          ...updatedData,
          subtasks,
          deadline: deadlineToSave,
        });
    } catch (error) {
      console.error('Erro ao atualizar a tarefa:', error);
    }
  };

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();

    if (!trimmedTag) {
      setTagError('');
      return;
    }

    if (trimmedTag.includes(' ')) {
      setTagError('Por favor, insira apenas uma palavra por tag.');
      return;
    }

    if (editedCategories.includes(trimmedTag)) {
      setTagError('Tag já adicionada.');
      return;
    }

    const updatedTags = [...editedCategories, trimmedTag];
    setEditedCategories(updatedTags);
    setNewTag('');
    setTagError(''); // limpa erro ao adicionar com sucesso
  };

  const handleRemoveTag = (tagToRemove: string): void => {
    setEditedCategories(editedCategories.filter(tag => tag !== tagToRemove));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContent}>
        <DefaultHeader leftComponent={<SmallBackButton />} />
        <View style={styles.taskDetailsContainer}>
          {!isEditing ? (
            <>
              <View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEditTask}>
                  <Image source={GoldPencilIcon} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.title}>Título</Text>
                <Text style={styles.titleTag}>{task.title}</Text>
              </View>
              <View>
                <Text style={styles.title}>Descrição</Text>
                <Text style={styles.description}>{task.description}</Text>
              </View>
              <View>
                <View>
                  <Text style={styles.title}>Tags</Text>
                  <View style={styles.carousel}>
                    {task.categories && task.categories.length > 0 ? (
                      task.categories.map((tag, index) => (
                        <CategoryTag key={index} item={tag} />
                      ))
                    ) : (
                      <Text>No tags available</Text> // Caso não haja categorias
                    )}
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.title}>Prioridade</Text>
                <Text style={styles.priority}>{priorityText}</Text>
              </View>
              <TouchableOpacity
                style={
                  task.isCompleted ? styles.reopenButton : styles.resolveButton
                }
                onPress={
                  task.isCompleted ? handleReopenTask : handleResolveTask
                }>
                <Text
                  style={
                    task.isCompleted
                      ? styles.reopenButtonText
                      : styles.resolveButtonText
                  }>
                  {task.isCompleted ? 'Reabrir Tarefa' : 'Resolver Tarefa'}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.containerEdit}>
              <View>
                <Text style={styles.title}>Título</Text>
                <Input
                  value={editedTitle}
                  onChangeText={setEditedTitle}
                  containerStyle={styles.zeroedBottomInput}
                />
              </View>
              <View>
                <Text style={styles.title}>Descrição</Text>
                <Input
                  value={editedDescription}
                  multiline={true}
                  height={81}
                  textAlignVertical="top"
                  onChangeText={setEditedDescription}
                  containerStyle={styles.descriptionInput}
                />
              </View>

              <View>
                <View>
                  <Text style={styles.title}>Tags</Text>
                  <View>
                    <Input
                      placeholder="Adicionar tag"
                      value={newTag}
                      onChangeText={text => {
                        setNewTag(text);
                        setTagError('');
                      }}
                      onSubmitEditing={event => {
                        handleAddTag(event.nativeEvent.text);
                      }}
                      containerStyle={
                        tagError ? styles.tagsInputError : styles.tagsInput
                      }
                      error={tagError}
                    />

                    <TouchableOpacity
                      style={styles.confirmButtonCircle}
                      onPress={() => handleAddTag(newTag)}>
                      <Image source={ArrowConfirmIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.carousel}>
                  {editedCategories.map((item, index) => (
                    <View key={index.toString()} style={styles.tagItem}>
                      <Text style={styles.tagText}>{item}</Text>
                      <TouchableOpacity onPress={() => handleRemoveTag(item)}>
                        <Image source={XCircle} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>

              <View>
                <Text style={styles.title}>Prioridade</Text>
                <View style={styles.priorityContainer}>
                  <TouchableOpacity
                    style={[
                      styles.priorityButton,
                      editedPriority === 2 && styles.priorityButtonActive,
                    ]}
                    onPress={() => setEditedPriority(2)}>
                    <Text
                      style={[
                        styles.priorityText,
                        editedPriority === 2 && styles.priorityTextActive,
                      ]}>
                      Alta
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.priorityButton,
                      editedPriority === 1 && styles.priorityButtonActive,
                    ]}
                    onPress={() => setEditedPriority(1)}>
                    <Text
                      style={[
                        styles.priorityText,
                        editedPriority === 1 && styles.priorityTextActive,
                      ]}>
                      Média
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.priorityButton,
                      editedPriority === 0 && styles.priorityButtonActive,
                    ]}
                    onPress={() => setEditedPriority(0)}>
                    <Text
                      style={[
                        styles.priorityText,
                        editedPriority === 0 && styles.priorityTextActive,
                      ]}>
                      Baixa
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text style={styles.title}>Prazo</Text>
                <DateInput
                  initialDate={
                    isValid(editedDeadline) ? editedDeadline : new Date()
                  }
                  onDateChange={date => {
                    if (date instanceof Date && isValid(date)) {
                      setEditedDeadline(date);
                      setDeadlineError('');
                    } else {
                      setEditedDeadline(null);
                    }
                  }}
                  containerStyle={styles.zeroedBottomInput}
                  error={deadlineError}
                />
              </View>
            </View>
          )}
        </View>
        {!isEditing ? (
          <>
            <SubtaskList
              subtasks={subtasks}
              onToggleSubtask={handleToggleSubtask}
              checkedImage={CheckedIcon}
              uncheckedImage={UncheckedIcon}
              onEditSubtask={handleEditSubtask}
            />

            {showInput && (
              <View style={styles.addSubtaskInputContainer}>
                <Input
                  placeholder="Escreva sua subtarefa..."
                  value={newSubtaskText}
                  onChangeText={setNewSubtaskText}
                  onFocus={() =>
                    scrollViewRef.current?.scrollToEnd({animated: true})
                  }
                />
                <TouchableOpacity
                  style={styles.confirmButtonCircle}
                  onPress={handleAddSubtask}>
                  <Image source={ArrowConfirmIcon} />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleShowAddSubtaskInput}>
              <Text style={styles.addButtonText}>ADICIONAR SUBTASK</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.editButtonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelEdit}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmEdit}>
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TaskDetailsScreen;
