import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';

export const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 32,
      backgroundColor: '#F4F4F4',
      marginBottom: 20,
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
    addSubtaskInputContainer:{
      height: 70,
    },
    confirmButton: {
      position: 'absolute',
      right: 10,
      top: 13,
    },
    keyboardAvoidingView: {
      flex: 1,
      backgroundColor: '#F4F4F4',
    },
    scrollViewContent: {
      paddingBottom: 20,
    },
    bottomSpace: {
      height: 50
    },
  });