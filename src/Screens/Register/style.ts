import { StyleSheet } from "react-native";
import Fonts from "../../Theme/fonts";

const styles = StyleSheet.create({
    container: {
      padding: 30,
      backgroundColor: '#F4F4F4',
      alignItems: 'stretch',
    },
    form: {
      flex: 1,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 13,
      backgroundColor: '#AAAAAA',
      height: 50,
      width: 110,
      borderRadius: 10,
    },
    backText: {
      color: '#fff',
      ...Fonts.Roboto50018,
    },
    inputSpacing: {
      marginBottom: 40,
    },
    buttonSpacing: {
      marginTop: 16,
    },
    title: {
      ...Fonts.Roboto70024,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginVertical: 20,
      color: '#222',
    },
  });

export default styles