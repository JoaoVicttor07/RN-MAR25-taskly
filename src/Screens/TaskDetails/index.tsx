import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/types';
import { styles } from './style';
import DefaultHeader from '../../components/DefaultHeader';
import CategoryTag from '../../components/CategoryTag';
import SmallBackButton from '../../components/SmallBackButton';

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

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

const TaskDetailsScreen = () => {
  const route = useRoute<TaskDetailsRouteProp>();
  const { task } = route.params;

  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtaskText, setNewSubtaskText] = useState('');

  const renderTagItem = useCallback(({ item }: { item: string }) => (
    <CategoryTag item={item} />
  ), []);

  const keyExtractorTag = useCallback((item: string, index: number) => index.toString(), []);

  const handleResolveTask = () => {
    console.log(`Tarefa "${task.title}" resolvida!`);
  };

  const handleAddSubtask = useCallback(() => {
    if (newSubtaskText.trim()) {
      const newSubtask: Subtask = {
        id: String(Date.now()),
        text: newSubtaskText.trim(),
        isCompleted: false,
      };
      setSubtasks(prevSubtasks => [...prevSubtasks, newSubtask]);
      setNewSubtaskText('');
    }
  }, [newSubtaskText, setSubtasks]);

  const renderSubtaskItem = useCallback(({ item }: { item: Subtask }) => (
    <View style={styles.subtaskItem}>
      <TouchableOpacity onPress={() => {
        setSubtasks(prevSubtasks =>
          prevSubtasks.map(subtask =>
            subtask.id === item.id ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask
          )
        );
      }}>
        <View style={[styles.checkbox, item.isCompleted && styles.checkboxChecked]} />
      </TouchableOpacity>
      <Text style={[styles.subtaskText, item.isCompleted && styles.subtaskTextCompleted]}>{item.text}</Text>
    </View>
  ), [setSubtasks]);

  const keyExtractorSubtask = useCallback((item: Subtask) => item.id, []);

  const priorityText = mapPriorityToString(task.priority);

  return (
    <View style={styles.container}>
      <DefaultHeader
        leftComponent={<SmallBackButton />}
      />
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
          <View>
            <FlatList
              data={task.categories}
              renderItem={renderTagItem}
              keyExtractor={keyExtractorTag}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carousel}
            />
          </View>
        </View>

        <View>
          <Text style={styles.title}>Prioridade</Text>
          <Text style={styles.priority}>{priorityText}</Text>
        </View>

        <TouchableOpacity style={styles.resolveButton} onPress={handleResolveTask}>
          <Text style={styles.resolveButtonText}>Resolver Tarefa</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={subtasks}
        renderItem={renderSubtaskItem}
        keyExtractor={keyExtractorSubtask}
      />
      <View style={styles.addSubtaskContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escreva sua subtarefa..."
          value={newSubtaskText}
          onChangeText={setNewSubtaskText}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddSubtask}>
        <Text style={styles.addButtonText}>ADICIONAR SUBTASK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskDetailsScreen;