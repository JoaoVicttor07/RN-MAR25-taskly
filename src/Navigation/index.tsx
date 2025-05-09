import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home/Index';
import Register from '../Screens/Register';
import Menu from '../Screens/Menu/MainMenu';
import TermosPage from '../Screens/Menu/TermsMenu';
import AvatarSelector from '../Screens/AvatarSelector';
import PreferencesMenu from '../Screens/PreferencesMenu';
import EditPersonalInfoScreen from '../Screens/EditPersonalInfo/EditPersonalInfoScreen';
import Login from '../Screens/Login/index';
import BottomTabNavigator from '../components/BottomTabNavigator';
import SplashScreen from '../Screens/SplashScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        {/* Splash Screen */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />

        {/* Tela de Login */}
        <Stack.Screen name="Login" component={Login} />

        {/* Tela principal após autenticação */}
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />

        {/* Outras telas */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Regulamentos" component={TermosPage} />
        <Stack.Screen name="AvatarSelector" component={AvatarSelector} />
        <Stack.Screen name="PreferencesMenu" component={PreferencesMenu} />
        <Stack.Screen name="EditPersonalInfo" component={EditPersonalInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
