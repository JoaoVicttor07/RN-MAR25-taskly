export interface ThemeType {
  background: string;
  text: string;
  backButton: string;
  Habilitarbutton: string;
  Bottomtab: string;
  activeCircle: string
  carouselItem: string
  carouselText: string
  cancelButton: string

}

export const LightTheme: ThemeType = {
  background: '#F4F4F4', //cor do fundo
  text: '#000000', // cor dos textos em geral
  backButton: '#AAAAAA',  //Botão < Voltar
  Habilitarbutton: '#FFFFFF',// botão que habilita o dark/light theme
  Bottomtab: '#FFFFFF', // cor dao fundo da Bottomtab
  carouselItem: '#FFFFFF', // Cor do fundo de cada item do carousel
  carouselText: '#000000', // Cor do texto de cada item do carousel
  activeCircle: '#5B3CC4', //Cor do circulo quando uma das opções da tabbar é selecionada
  cancelButton: '#5B3CC4', //cor do botão "Agora Não" dos modais

};

export const DarkTheme: ThemeType = {
  background: '#282828', //cor do fundo
  text: '#FFFFFF', //cor dos textos no geral
  backButton: '#D9D9D9',    // Botão < Voltar
  Habilitarbutton:  '#1E1E1E', // botão que habilita o dark/light theme
  Bottomtab: '#1E1E1E', // cor dao fundo da Bottomtab
  carouselItem: '#1E1E1E', // Cor do fundo de cada item do carousel
  carouselText: '#F0F0F0', // Cor do texto e do icone de cada item do carousel
  activeCircle: '#552DDC', //Cor do circulo quando uma das opções da tabbar é selecionada
  cancelButton: '#552DDC', //cor do botão "Agora Não" dos modais



};
