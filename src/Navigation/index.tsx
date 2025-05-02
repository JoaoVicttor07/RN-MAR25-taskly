import React from 'react';
import { View, TouchableOpacity, SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home/Index';
import Register from '../Screens/Register';

const Stack = createNativeStackNavigator();

const InitialScreen = ({ navigation }: any) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.containerTaskly}>
      <Text style={styles.taskly}>TASKLY</Text>
      <Text style={styles.cluster}>Cluster-2</Text>
    </View>
    <View style={styles.buttonsRow}>
      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Pág. Inicial</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>
      {/* aqui será adicionado outros botões apenas para nos ajudar a visualizar cada tela */}
    </View>
  </SafeAreaView>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="InitialScreen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InitialScreen" component={InitialScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  containerTaskly: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  containerButton: {
    marginHorizontal: 4,
  },
  buttonText: {
    backgroundColor: '#0f7892',
    color: '#fff',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 20,
    marginTop: 0,
  },
  taskly: {
    fontSize: 48,
    color: '#770086',
  },
  cluster: {
    fontSize: 24,
    color: '#007219',
  },
});