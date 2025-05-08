import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      backgroundColor: '#F4F4F4',
    },
    taskDetailsContainer: {
      backgroundColor: '#FFFFFF',
      padding: 24,
      gap: 16,
      borderRadius: 12,
      width: 342,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 8,
      marginTop: 40,
      marginBottom: 32,
    },
    title: {
      ...Fonts.Roboto60020,
      color: '#AAAAAA',
      marginBottom: 4,
    },
    titleTag: {
      ...Fonts.Roboto50018,
      color: '#1E1E1E',
    },
    description: {
      ...Fonts.Roboto40016,
      color: '#1E1E1E',
    },
    priority: {
      ...Fonts.Roboto40016,
      color: '#FFFFFF',
      backgroundColor: '#32C25B',
      padding: 4,
      alignSelf: 'flex-start',
      borderRadius: 8,
      textTransform: 'uppercase',
    },
    carousel: {
      flexDirection: 'row',
      gap: 8,
    },
    resolveButton: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderColor: '#5B3CC4',
      borderRadius: 8,
      borderWidth: 2,
      paddingVertical: 2,
    },
    resolveButtonText: {
      ...Fonts.Roboto40016,
      color: '#5B3CC4',
      textTransform: 'uppercase',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      color: '#333',
    },
    addSubtaskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
    },
    addButton: {
      backgroundColor: '#5B3CC4',
      paddingVertical: 4,
      borderRadius: 8,
      alignItems: 'center',
    },
    addButtonText: {
      ...Fonts.Roboto40016,
      color: '#FFFFFF',
      textTransform: 'uppercase',
    },
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
  });