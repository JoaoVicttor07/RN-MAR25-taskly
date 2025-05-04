import React from 'react';
import AppNavigator from './src/Navigation'; // Importa a navegação principal
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';


const App: React.FC = () => {

  useEffect(() => {
    const init = async () => {
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);


  return <AppNavigator />;
};

export default App;
