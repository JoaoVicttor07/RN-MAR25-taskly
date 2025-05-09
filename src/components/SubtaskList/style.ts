import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({    
    subtaskItem: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 8,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#CCC',
      marginRight: 10,
    },
    checkboxChecked: {
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
    },
    subtaskText: {
      fontSize: 16,
      color: '#555',
      flexShrink: 1,
    },
    subtaskTextCompleted: {
      textDecorationLine: 'line-through',
      color: '#999',
    },
})