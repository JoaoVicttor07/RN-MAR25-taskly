import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, View } from 'react-native';
import Keychain from 'react-native-keychain';
import AppNavigator from './src/Navigation/index';
import { isTokenExpired, refreshAuthToken, storeToken, isBiometryEnabled, removeToken } from './src/Utils/authUtils';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const biometryEnabled = await isBiometryEnabled();
        console.log(`Biometria está ${biometryEnabled ? 'ativada' : 'desativada'}.`);

        if (biometryEnabled) {
          console.log('Verificando credenciais armazenadas...');
          const credentials = await Keychain.getGenericPassword();

          if (credentials) {
            const { password: storedToken, username: refreshToken } = credentials;

            if (!storedToken || isTokenExpired(storedToken)) {
              console.log('Token inválido ou expirado. Tentando renovar...');
              try {
                const newToken = await refreshAuthToken(refreshToken);
                await storeToken(newToken, refreshToken);
                setIsAuthenticated(true);
              } catch (error) {
                console.error('Erro ao renovar o token:', error);
                await removeToken(); // Remove tokens inválidos
                setIsAuthenticated(false);
              }
            } else {
              console.log('Token válido. Usuário autenticado.');
              setIsAuthenticated(true);
            }
          } else {
            console.log('Nenhuma credencial encontrada. Usuário deve fazer login manual.');
            setIsAuthenticated(false);
          }
        } else {
          console.log('Biometria desativada. Usuário deve fazer login manual.');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Erro ao inicializar o aplicativo:', error);
        Alert.alert('Erro', 'Não foi possível inicializar o aplicativo. Por favor, tente novamente.');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5B3CC4" />
      </View>
    );
  }

  return <AppNavigator isAuthenticated={isAuthenticated} />;
};

export default App;