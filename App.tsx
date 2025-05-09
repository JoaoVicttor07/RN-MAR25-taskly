import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import Keychain from 'react-native-keychain';
import { isTokenExpired, refreshAuthToken, removeToken } from './src/Utils/authUtils';
import AppNavigator from './src/Navigation/index';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Inicia a verificação de autenticação após a SplashScreen
  useEffect(() => {
  const initializeApp = async () => {
    try {
      console.log('Inicializando o aplicativo...');
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const { password: storedToken, username: refreshToken } = credentials;

        if (!storedToken || isTokenExpired(storedToken)) {
          console.log('Token inválido ou expirado. Tentando renovar...');
          try {
            const newToken = await refreshAuthToken(refreshToken);
            await Keychain.setGenericPassword(refreshToken, newToken);
            console.log('Token renovado com sucesso!');
          } catch (error) {
            console.error('Erro ao renovar o token:', error);
            await removeToken();
          }
        } else {
          console.log('Token válido encontrado.');
        }
      } else {
        console.log('Nenhum token encontrado.');
      }
    } catch (error) {
      console.error('Erro ao inicializar o aplicativo:', error);
      Alert.alert('Erro', 'Não foi possível inicializar o aplicativo. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  initializeApp();
}, []);

  // Enquanto a autenticação não é verificada, exibe um carregando
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5B3CC4" />
      </View>
    );
  }

  return <AppNavigator />; 
}
export default App;
