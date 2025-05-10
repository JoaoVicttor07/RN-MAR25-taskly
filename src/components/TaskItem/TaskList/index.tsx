import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import TaskItem from '../index';
import { styles } from './style';
import { Task } from '../../../Screens/Home/Index';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const handleToggleComplete = useCallback((taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      })
    );
  }, [setTasks]);

  const renderItem: ListRenderItem<Task> = useCallback(({ item }) => {
    return (
      <TaskItem
        title={item.title}
        description={item.description}
        categories={item.categories || []}
        isCompleted={item.isCompleted}
        onToggleComplete={() => handleToggleComplete(item.id)}
        task={item}
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

export default TaskList;