import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import TaskItem from '../index';
import { useTheme } from '../../../Theme/ThemeContext'; // Import useTheme
import getStyles from './style'; // Import getStyles

interface Task {
  id: string;
  title: string;
  description: string;
  categories: string[];
  isCompleted: boolean;
  deadline: string;
}

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {

  const { theme } = useTheme(); // Use the theme context
  const styles = getStyles(theme); // Get themed styles

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
