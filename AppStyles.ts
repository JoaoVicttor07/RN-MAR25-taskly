// stylesApp.ts
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const AppStyles = StyleSheet.create<{
  container: ViewStyle;
  text: TextStyle;
  equipe: TextStyle;
}>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    marginTop:100,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',

  },
  equipe:{
    fontSize:20,
    fontFamily: 'Times New Roman',
    textAlign:'center',
  },

});
