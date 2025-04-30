import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        // sombra leve
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      icon: {
        width: 32,
        height: 32,
        marginBottom: 8,
      },
      title: {
        textAlign: 'center',
        fontSize: 14,
      },
})

export default styles