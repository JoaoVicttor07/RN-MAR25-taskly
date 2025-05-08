import React from 'react';
import AppNavigator from './src/Navigation/index'; // Importa a navegação principal
import { ThemeProvider } from './src/Theme/ThemeContext'; // Importa o provedor de tema

const App: React.FC = () => {

  return (
    <ThemeProvider> {/* Envolve o aplicativo com o provedor de tema n */}
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;

//npm install react-native-keychain
// npm install --save-dev @types/react-native-keychain
