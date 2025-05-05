import React from 'react';
import AppNavigator from './src/Navigation'; // Importa a navegação principal
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';


const App: React.FC = () => {

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return <AppNavigator />;
};

export default App;

//Neiva
//Coloquei uma página de acesso para a partir dela acessar as outras páginas
//  Poderá ser acrescetado outros botões para as páginas login, cadastro, etc...
// Assim todos poderão ver o andamento do projeto acessando as páginas uns dos outros pelo botão de link.
// Isso pode ser feito na página navigation
// na página que você criar, coloca um botão de retorno à página navegação, se quiser
