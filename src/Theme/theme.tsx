// Theme.tsx
// Define o tipo do tema para garantir que todas as propriedades sejam reconhecidas
export interface ThemeType {
  background: string;
  text: string;
  primaryButton: string;
  settingButtonBackground: string;
  confirmButton: string;
  backButton: string;
  secondaryText: string;
  buttonBackground: string;
  buttonText: string;
  modal1: string;
  primary: string;
  ModalTitlecolor: string;
  card: string; // Exemplo: cor para fundo de card
  shadow: string; // Exemplo: propriedade para sombra
  primaryText: string; // Exemplo: cor para texto primário
  separator: string; // Exemplo: cor para separador
  modalBackground: string; // Exemplo: cor para fundo de modal
  cardBorder: string; // Exemplo: cor para borda de card
  AvatarButton: string;
  ModalButtonMenu: string, // Exemplo: cor para botão de avatar
  bottomTabBarBackground: string; // Cor de fundo do BottomTabBar
  tagTask: string; // Exemplo: cor para tag de tarefa
}

export const LightTheme: ThemeType = {
  background: '#F4F4F4',
  text: '#000000',
  primaryButton: '#5B3CC4',
  settingButtonBackground: '#F5F5F5',
  confirmButton: '#03DAC6',
  backButton: '#AAAAAA',
  secondaryText: '#757575',
  buttonBackground: '#E0E0E0',
  buttonText: '#F4F4F4',
  modal1: '#F0F0F0',
  primary: '#6200EE',
  ModalTitlecolor: '#F0F0F0', // Exemplo: cor clara para título em tema claro
  card: '#FFFFFF',           // Exemplo: branco para fundo de card em tema claro
  shadow: 'none',           // Exemplo: sem sombra em tema claro
  primaryText: '#000000',    // Exemplo: preto para texto primário em tema claro
  separator: '#E0E0E0',      // Exemplo: cinza claro para separador em tema claro
  modalBackground: '#F4F4F4', // Exemplo: cinza claro para fundo de modal em tema claro
  cardBorder: '#D3D3D3',
  AvatarButton: '#5B3CC4',
  ModalButtonMenu: '#E63946',
  bottomTabBarBackground: '#FFFFFF', // Cor de fundo do BottomTabBar
  tagTask: '#E6E0F7', // Exemplo: cor para tag de tarefa

};

export const DarkTheme: ThemeType = {
  background: '#282828',
  text: '#FFFFFF',
  primaryButton: '#BB86FC',
  settingButtonBackground: '#1F1F1F',
  confirmButton: '#03DAC6',
  backButton: '#D9D9D9',
  secondaryText: '#B3B3B3',
  buttonBackground: '#333333',
  buttonText: '#1E1E1E',
  modal1: '#1E1E1E',
  primary: '#BB86FC',
  ModalTitlecolor: '#FFFFFF', // Exemplo: cor escura para título em tema escuro
  card: '#1E1E1E',           // Exemplo: cinza escuro para fundo de card em tema escuro
  shadow: 'none',           // Exemplo: sem sombra em tema escuro
  primaryText: '#FFFFFF',    // Exemplo: branco para texto primário em tema escuro
  separator: '#333333',      // Exemplo: cinza escuro para separador em tema escuro
  modalBackground: '#282828', // Exemplo: cinza escuro para fundo de modal em tema escuro
  cardBorder: '#2C2C2C',
  AvatarButton: '#552DDC',
  ModalButtonMenu: '#E63946',
  bottomTabBarBackground:'#1E1E1E',
  tagTask: '#A393D1', // Exemplo: cor para tag de tarefa
  // Exemplo: cinza mais claro para borda de card em tema escuro
};
