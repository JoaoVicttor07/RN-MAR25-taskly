import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import TaskItem from '../index';

interface Task {
  id: string;
  title: string;
  description: string;
  categories: string[];
  isCompleted: boolean;
}

const taskData: Task[] = [
  {
    id: '1',
    title: 'Bater o ponto',
    description: 'bater o ponto pelo site do kairos e depois tenho que sair para tomar café.',
    categories: ['TRABALHO', 'CASA', 'ESPORTE', 'ACADEMIA', 'LAZER'],
    isCompleted: false,
  },
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(taskData);

  const handleToggleComplete = useCallback((taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      })
    );
  }, []);

  const renderItem: ListRenderItem<Task> = useCallback(({ item }) => {
    return (
      <TaskItem
        title={item.title}
        description={item.description}
        categories={item.categories}
        isCompleted={item.isCompleted}
        onToggleComplete={() => handleToggleComplete(item.id)}
      />
    );
  }, [handleToggleComplete]);

  const keyExtractor = useCallback((item: Task) => item.id, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 329,
  },
});

export default TaskList;
