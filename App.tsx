import React from 'react';
import AppNavigator from './src/Navigation/index'; // Importa a navegação principal
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { ThemeProvider } from './src/Theme/ThemeContext'; // Importa o provedor de tema

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

  return (
    <ThemeProvider> {/* Envolve o aplicativo com o provedor de tema */}
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;

