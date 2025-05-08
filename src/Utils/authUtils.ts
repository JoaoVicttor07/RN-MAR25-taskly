import * as Keychain from 'react-native-keychain';

// Salvar token no Android Keystore
export const storeToken = async (token: string) => {
  try {
    // O primeiro parâmetro é o nome de usuário (pode ser qualquer string)
    await Keychain.setGenericPassword('user', token);
    console.log('Token salvo com sucesso!');
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

// import * as Keychain from 'react-native-keychain';

// const testKeychain = async () => {
//   try {
//     await Keychain.setGenericPassword('testUser', 'testPassword');
//     const credentials = await Keychain.getGenericPassword();
//     if (credentials) {
//       console.log('Credenciais recuperadas:', credentials);
//     } else {
//       console.log('Nenhuma credencial encontrada.');
//     }
//   } catch (error) {
//     console.error('Erro ao testar o Keychain:', error);
//   }
// };

// testKeychain();