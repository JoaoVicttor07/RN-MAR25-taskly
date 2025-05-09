import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/types';
import { styles } from './style';
import DefaultHeader from '../../components/DefaultHeader';
import CategoryTag from '../../components/CategoryTag';
import SmallBackButton from '../../components/SmallBackButton';
import Input from '../../components/input';
import SubtaskList from '../../components/SubtaskList';
import { Task } from '../Home';

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

interface TaskDetailsProps {
  onTaskUpdated?: (updatedTask: Task) => void;
}

interface Subtask {
  id: string;
  text: string;
  isCompleted: boolean;
}

type PriorityLevel = 'ALTA' | 'MÉDIA' | 'BAIXA' | 'Sem prioridade';

const mapPriorityToString = (priority?: number): PriorityLevel => {
  switch (priority) {
    case 2:
      return 'ALTA';
    case 1:
      return 'MÉDIA';
    case 0:
      return 'BAIXA';
    default:
      return 'Sem prioridade';
  }
};

const TaskDetailsScreen: React.FC<TaskDetailsProps> = ({ onTaskUpdated }) => {
  const route = useRoute<TaskDetailsRouteProp>();
  const { task: initialTask } = route.params;
  const [task, setTask] = useState<Task>(initialTask);
  const [subtasks, setSubtasks] = useState<Subtask[]>(initialTask.subtasks || []);
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
      setSubtasks(initialTask.subtasks || []);
    }
  }, [initialTask]);

  const renderTagItem = useCallback(({ item }: { item: string }) => (
    <CategoryTag item={item} />
  ), []);

  const keyExtractorTag = useCallback((item: string, index: number) => index.toString(), []);

  const handleResolveTask = () => {
    console.log(`Tarefa "${task.title}" resolvida!`);
  };

  const handleShowAddSubtaskInput = () => {
    setShowInput(true);
    setNewSubtaskText('');
  };

  const handleAddSubtask = useCallback(() => {
    const text = newSubtaskText.trim();
    if (text) {
      const newSubtask: Subtask = {
        id: String(Date.now()),
        text: text,
        isCompleted: false,
      };
      const updatedSubtasks = [...subtasks, newSubtask];
      setSubtasks(updatedSubtasks);
      setNewSubtaskText('');
      setShowInput(false); // Adicione esta linha para esconder o input
      onTaskUpdated?.({ ...task, subtasks: updatedSubtasks });
    }
  }, [newSubtaskText, subtasks, task, onTaskUpdated]);

  const handleToggleSubtask = useCallback((id: string) => {
    const updatedSubtasks = subtasks.map(subtask =>
      subtask.id === id ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask
    );
    setSubtasks(updatedSubtasks);
    onTaskUpdated?.({ ...task, subtasks: updatedSubtasks });
  }, [subtasks, task, onTaskUpdated]);

  const handleEditSubtask = useCallback((id: string, newText: string) => {
    const updatedSubtasks = subtasks.map(subtask =>
      subtask.id === id ? { ...subtask, text: newText } : subtask
    );
    setSubtasks(updatedSubtasks);
    onTaskUpdated?.({ ...task, subtasks: updatedSubtasks });
  }, [subtasks, task, onTaskUpdated]);

  const priorityText = mapPriorityToString(task.priority);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContent}
      >
        <DefaultHeader leftComponent={<SmallBackButton />} />
        <View style={styles.taskDetailsContainer}>
          <View>
            <Text style={styles.title}>Título</Text>
            <Text style={styles.titleTag}>{task.title}</Text>
          </View>
          <View>
            <Text style={styles.title}>Descrição</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
          <View>
            <Text style={styles.title}>Tags</Text>
            <FlatList
              data={task.categories}
              renderItem={renderTagItem}
              keyExtractor={keyExtractorTag}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carousel}
            />
          </View>
          <View>
            <Text style={styles.title}>Prioridade</Text>
            <Text style={styles.priority}>{priorityText}</Text>
          </View>
          <TouchableOpacity style={styles.resolveButton} onPress={handleResolveTask}>
            <Text style={styles.resolveButtonText}>Resolver Tarefa</Text>
          </TouchableOpacity>
        </View>

        <SubtaskList
          subtasks={subtasks}
          onToggleSubtask={handleToggleSubtask}
          checkedImage={require('../../Assets/icons/CheckSquare-2.png')}
          uncheckedImage={require('../../Assets/icons/CheckSquare-1.png')}
          onEditSubtask={handleEditSubtask}
        />

        {showInput && (
          <View style={styles.addSubtaskInputContainer}>
            <Input
              style={styles.input}
              placeholder="Escreva sua subtarefa..."
              value={newSubtaskText}
              onChangeText={setNewSubtaskText}
              onFocus={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleAddSubtask}>
              <Image source={require('../../Assets/icons/arrowConfirm.png')} />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleShowAddSubtaskInput}>
          <Text style={styles.addButtonText}>ADICIONAR SUBTASK</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TaskDetailsScreen;

