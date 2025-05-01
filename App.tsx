import React from 'react';
import TaskItem from './src/components/TaskItem';
import {StyleSheet, View} from 'react-native';
// import AppNavigator from './src/navigation'; // Importa a navegação principal

const App: React.FC = () => {
  // return <AppNavigator />;
  return (
    <View style={styles.area}>
      <TaskItem />
    </View>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    backgroundColor: 'red'
  },
});

export default App;
