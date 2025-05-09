import * as Keychain from 'react-native-keychain';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../hooks/useApi';

// Salvar o estado de ativação da biometria
export const setBiometryEnabled = async (enabled: boolean) => {
  try {
    await AsyncStorage.setItem('isBiometryEnabled', JSON.stringify(enabled));
    console.log(`Biometria ${enabled ? 'ativada' : 'desativada'}.`);
  } catch (error) {
    console.error('Erro ao salvar estado da biometria:', error);
  }
};

// Recuperar o estado de ativação da biometria
export const isBiometryEnabled = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem('isBiometryEnabled');
    return value ? JSON.parse(value) : false;
  } catch (error) {
    console.error('Erro ao recuperar estado da biometria:', error);
    return false;
  }
};

export const isBiometrySupported = async (): Promise<boolean> => {
  try {
    const biometryType = await Keychain.getSupportedBiometryType();
    return !!biometryType;
  } catch (error) {
    console.error('Erro ao verificar suporte à biometria:', error);
    return false;
  }
};

export const storeToken = async (idToken: string, refreshToken: string) => {
  try {
    if (!refreshToken) {
      throw new Error('O refreshToken é obrigatório para armazenar os tokens.');
    }

    await Keychain.setGenericPassword(refreshToken, idToken, {
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    });
    console.log('Tokens armazenados com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar os tokens:', error);
    throw error;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Erro ao recuperar token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Token removido com sucesso!');
  } catch (error) {
    console.error('Erro ao remover token:', error);
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    if (!token || token.split('.').length !== 3) {
      throw new Error('Token inválido ou malformado.');
    }

    const decoded: {exp: number} = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Erro ao verificar validade do token:', error);
    return true;
  }
};

export const refreshAuthToken = async (
  refreshToken: string,
): Promise<string> => {
  try {
    if (!refreshToken) {
      throw new Error('Refresh token não fornecido.');
    }

    const response = await api.post('/auth/refresh', {refreshToken});
    const {idToken, refreshToken: newRefreshToken} = response.data;

    await storeToken(idToken, newRefreshToken);
    return idToken;
  } catch (error) {
    console.error('Erro ao renovar o token:', error);

    await removeToken();
    throw error;
  }
};
