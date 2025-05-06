import * as Keychain from 'react-native-keychain';

// Salvar token no Android Keystore
export const storeToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword('authToken', token);
  } catch (error) {
    console.error('Erro ao salvar o token:', error);
  }
};

// Recuperar token armazenado
export const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Erro ao recuperar token:', error);
    return null;
  }
};