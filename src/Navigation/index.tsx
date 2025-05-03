import React from 'react';
import { View, TouchableOpacity, SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home/Index';
import Register from '../Screens/Register';
import Menu from '../Screens/Menu/MenuPrincipal'; // ✅ Importação da nova tela "Menu"

const Stack = createNativeStackNavigator();

const InitialScreen = ({ navigation }: any) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.containerTaskly}>
      <Text style={styles.taskly}>TASKLY</Text>
      <Text style={styles.cluster}>Cluster-2</Text>
    </View>
    <View style={styles.buttonsRow}>
      {/* 🔹 Botão para navegar para a tela "Home" (Página Inicial) */}
      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Pág. Inicial</Text>
      </TouchableOpacity>

      {/* 🔹 Botão para navegar para a tela "Register" (Cadastro) */}
      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>

      {/* 🔹 Botão para navegar para a nova tela "Menu" */}
      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>Menu</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="InitialScreen"
        screenOptions={{ headerShown: false }}>

        {/* 📌 Tela inicial com botões de navegação */}
        <Stack.Screen name="InitialScreen" component={InitialScreen} />

        {/* 📌 Tela de tarefas (Home) */}
        <Stack.Screen name="Home" component={Home} />

        {/* 📌 Tela de cadastro */}
        <Stack.Screen name="Register" component={Register} />

        {/* 📌 Tela de menu (recém adicionada) */}
        <Stack.Screen name="Menu" component={Menu} />
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
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonsRow: {
    flex:0.4,
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center', 
    justifyContent:'flex-start', 
  },
  containerButton: {
    marginVertical: 6,   
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

