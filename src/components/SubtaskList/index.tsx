import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './style';

interface Subtask {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface SubtaskListProps {
  subtasks: Subtask[];
  onToggleSubtask: (id: string) => void;
}

const SubtaskList: React.FC<SubtaskListProps> = ({ subtasks, onToggleSubtask }) => {
  const renderSubtaskItem = useCallback(({ item }: { item: Subtask }) => (
    <View style={styles.subtaskItem}>
      <TouchableOpacity onPress={() => onToggleSubtask(item.id)}>
        <View style={[styles.checkbox, item.isCompleted && styles.checkboxChecked]} />
      </TouchableOpacity>
      <Text style={[styles.subtaskText, item.isCompleted && styles.subtaskTextCompleted]}>{item.text}</Text>
    </View>
  ), [onToggleSubtask]);

  const keyExtractorSubtask = useCallback((item: Subtask) => item.id, []);

  return (
    <FlatList
      data={subtasks}
      renderItem={renderSubtaskItem}
      keyExtractor={keyExtractorSubtask}
      nestedScrollEnabled={true}
    />
  );
};

export default SubtaskList;