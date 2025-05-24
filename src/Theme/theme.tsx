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
  Habilitarbutton: string;
}

export const LightTheme: ThemeType = {
  background: '#F4F4F4',
  text: '#000000',
  primaryButton: '#5B3CC4',
  settingButtonBackground: '#F5F5F5',
  confirmButton: '#03DAC6',
  backButton: '#AAAAAA',  //Botão < Voltar 
  secondaryText: '#757575',
  buttonBackground: '#E0E0E0',
  buttonText: '#F4F4F4',
  modal1: '#F0F0F0',
  primary: '#6200EE',
  ModalTitlecolor: '#F0F0F0', 
  card: '#FFFFFF',           
  shadow: 'none',           
  primaryText: '#000000',    
  separator: '#E0E0E0',      
  modalBackground: '#F4F4F4', 
  cardBorder: '#D3D3D3',
  AvatarButton: '#5B3CC4',
  ModalButtonMenu: '#E63946',
  bottomTabBarBackground: '#FFFFFF', 
  tagTask: '#E6E0F7', 
  Habilitarbutton: '#FFFFFF' // botão que habilita o dark/light theme

};

export const DarkTheme: ThemeType = {
  background: '#282828',
  text: '#FFFFFF',
  primaryButton: '#BB86FC',
  settingButtonBackground: '#1F1F1F',
  confirmButton: '#03DAC6',
  backButton: '#D9D9D9',    //Botão < Voltar 
  secondaryText: '#B3B3B3',
  buttonBackground: '#333333',
  buttonText: '#1E1E1E',
  modal1: '#1E1E1E',
  primary: '#BB86FC',
  ModalTitlecolor: '#FFFFFF',
  card: '#1E1E1E',           
  shadow: 'none',           
  primaryText: '#FFFFFF',   
  separator: '#333333',      
  modalBackground: '#282828', 
  cardBorder: '#2C2C2C',
  AvatarButton: '#552DDC',
  ModalButtonMenu: '#E63946',
  bottomTabBarBackground:'#1E1E1E',
  tagTask: '#A393D1',
  Habilitarbutton:  '#1E1E1E' // botão que habilita o dark/light theme
};
