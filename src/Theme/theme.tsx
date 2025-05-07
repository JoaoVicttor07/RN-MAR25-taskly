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
}

export const LightTheme: ThemeType = {
  background: '#FFFFFF',
  text: '#000000',
  primaryButton: '#6200EE',
  settingButtonBackground: '#F5F5F5',
  confirmButton: '#03DAC6',
  backButton: '#BB86FC',
  secondaryText: '#757575',
  buttonBackground: '#E0E0E0',
  buttonText: '#000000',
  modal1: '#F0F0F0',
  primary: '#6200EE',
  ModalTitlecolor: '#F0F0F0', // Exemplo: cor clara para título em tema claro
  card: '#FFFFFF',           // Exemplo: branco para fundo de card em tema claro
  shadow: 'none',           // Exemplo: sem sombra em tema claro
  primaryText: '#000000',    // Exemplo: preto para texto primário em tema claro
  separator: '#E0E0E0',      // Exemplo: cinza claro para separador em tema claro
  modalBackground: '#F0F0F0', // Exemplo: cinza claro para fundo de modal em tema claro
  cardBorder: '#D3D3D3',     // Exemplo: cinza claro para borda de card em tema claro
};

export const DarkTheme: ThemeType = {
  background: '#121212',
  text: '#FFFFFF',
  primaryButton: '#BB86FC',
  settingButtonBackground: '#1F1F1F',
  confirmButton: '#03DAC6',
  backButton: '#6200EE',
  secondaryText: '#B3B3B3',
  buttonBackground: '#333333',
  buttonText: '#FFFFFF',
  modal1: '#1E1E1E',
  primary: '#BB86FC',
  ModalTitlecolor: '#FFFFFF', // Exemplo: cor escura para título em tema escuro
  card: '#1E1E1E',           // Exemplo: cinza escuro para fundo de card em tema escuro
  shadow: 'none',           // Exemplo: sem sombra em tema escuro
  primaryText: '#FFFFFF',    // Exemplo: branco para texto primário em tema escuro
  separator: '#333333',      // Exemplo: cinza escuro para separador em tema escuro
  modalBackground: '#1E1E1E', // Exemplo: cinza escuro para fundo de modal em tema escuro
  cardBorder: '#2C2C2C',     // Exemplo: cinza mais claro para borda de card em tema escuro
};
