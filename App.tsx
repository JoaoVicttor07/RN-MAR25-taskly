import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import TaskItem from './src/components/TaskItem';

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
    description: 'bater o ponto pelo site do Kairos e depois sair para tomar café.',
    categories: ['TRABALHO', 'CASA', 'ESPORTE', 'ACADEMIA', 'LAZER'],
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Reunião com o cliente',
    description: 'preparar a apresentação e discutir o projeto X.',
    categories: ['TRABALHO', 'REUNIÃO', 'CLIENTE'],
    isCompleted: true,
  },
  {
    id: '3',
    title: 'Ir à academia',
    description: 'fazer treino de pernas.',
    categories: ['SAÚDE', 'ESPORTE', 'ACADEMIA'],
    isCompleted: false,
  },
    {
    id: '4',
    title: 'Passear com o cachorro',
    description: 'levar o cachorro para passear no parque.',
    categories: ['LAZER', 'PETS'],
    isCompleted: false,
  },
];

const App: React.FC = () => {
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
    backgroundColor: '#F0F0F0',
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
  },
});

export default App;