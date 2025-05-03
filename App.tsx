import React from 'react';
import { StyleSheet, View } from 'react-native';
import TaskList from './src/components/TaskItem/TaskList'; 

const App: React.FC = () => {
  return (
    <View style={styles.area}>
      <TaskList />
    </View>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;