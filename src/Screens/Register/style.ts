import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
      padding: 30,
      backgroundColor: theme.background,
      alignItems: 'center',
      flex: 1,
    },
    form: {
      flex: 1,
    },
    loading:{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -25 }, { translateY: -25 }],
      zIndex: 9999,

    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 13,
      backgroundColor: theme.backButton,
      height: 50,
      width: 110,
      borderRadius: 10,
    },
    backText: {
      color: theme.buttonText,
      ...Fonts.Roboto50018,
    },
    inputSpacing: {
      marginBottom: 40,
      width:329,
      height:47,
    },
    buttonSpacing: {
      marginTop: 16,

    },
    title: {
      ...Fonts.Roboto70024,
      ...Fonts.Roboto70024,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginVertical: 20,
      color: theme.text,
    },

    createButton: {
      backgroundColor: theme.AvatarButton,
      width: 329,
      height:47,
      marginTop:8,
    },

  });

export default getStyles;
