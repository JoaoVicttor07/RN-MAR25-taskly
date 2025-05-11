import { ViewStyle } from 'react-native';
import { ThemeType } from '../../Theme/theme';

interface TabNavigatorStyles {
  tabBarStyle: ViewStyle;
  tabBarActiveTintColor: string;
  tabBarInactiveTintColor: string;
  tabBarHideOnKeyboard: boolean;
  tabBarShowLabel: boolean;
  tabBarIconStyle: ViewStyle;
}

const getStyles = (theme: ThemeType): TabNavigatorStyles => ({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: theme.bottomTabBarBackground, // Cor de fundo do BottomTabBar
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    elevation: 0,
    height: 80,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tabBarActiveTintColor: theme.background, // Cor do ícone ativo
  tabBarInactiveTintColor: theme.primaryButton, // Cor do ícone inativo,
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  tabBarIconStyle: { marginTop: 20 },
});

export default getStyles;
