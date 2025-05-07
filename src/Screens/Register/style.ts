import { StyleSheet } from 'react-native';


const styles = (theme: any) => StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 30,
      backgroundColor: theme.background,
      alignItems: 'stretch',
    },
    form: {
      flex: 1,
    },
    inputSpacing: {
      marginBottom: 40,
      borderColor: 'theme.background',

    },
    buttonSpacing: {
      marginTop: 16,

    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginVertical: 20,
      color: theme.text,
    },
  });

export default styles;
