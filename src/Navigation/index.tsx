import React from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home/Index';
import Register from '../Screens/Register';
import Menu from '../Screens/Menu/MainMenu';
import TermosPage from '../Screens/Menu/TermsMenu';
import AvatarSelector from '../Screens/AvatarSelector';
import PreferencesMenu from '../Screens/PreferencesMenu';
import EditPersonalInfoScreen from '../Screens/EditPersonalInfo/EditPersonalInfoScreen';
import Login from '../Screens/Login/index';

const Stack = createNativeStackNavigator();

const InitialScreen = ({navigation}: any) => (
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

      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => navigation.navigate('AvatarSelector')}>
        <Text style={styles.buttonText}>Avatar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

    </View>
  </SafeAreaView>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="InitialScreen"
        screenOptions={{headerShown: false}}>
        {/* 📌 Tela inicial com botões de navegação */}
        <Stack.Screen name="InitialScreen" component={InitialScreen} />

        {/* 📌 Tela de tarefas (Home) */}
        <Stack.Screen name="Home" component={Home} />

        {/* 📌 Tela de cadastro */}
        <Stack.Screen name="Register" component={Register} />

        {/* 📌 Tela de menu */}
        <Stack.Screen name="Menu" component={Menu} />

        {/* 📌 Tela de Termos e Regulamentos */}

        <Stack.Screen name="Regulamentos" component={TermosPage} />

        {/* 📌 Tela de seleção de avatar */}
        <Stack.Screen name="AvatarSelector" component={AvatarSelector} />

        {/* 📌 Tela de seleção de preferencia de tema */}
        <Stack.Screen name="PreferencesMenu" component={PreferencesMenu} />


        {/* 📌 Tela de Login */}
        <Stack.Screen name="Login" component={Login} />


        <Stack.Screen
          name="EditPersonalInfo"
          component={EditPersonalInfoScreen}
        />

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
    flex: 0.8,
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
