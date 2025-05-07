import { StyleSheet } from 'react-native';
import Fonts from '../../../Theme/fonts';


const styles = (theme: any) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    marginHorizontal: 1,
    backgroundColor: theme.background,
    borderRadius: 12,
    padding: 24,
  },
  modalTitle: {
    ...Fonts.Roboto50018,
    textAlign: 'left',
    color: theme.text,
  },
  label: {
    marginTop: 12,
    ...Fonts.Roboto40012,
    color: theme.text,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    color: theme.text,
    backgroundColor: theme.inputBackground || theme.background,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    color: theme.text,
  },
  error: {
    color: '#E63946',
    ...Fonts.Roboto40012,
    marginTop: 7,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: theme.background,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.primaryButton,
    width: 134.5,
    height: 37,
    alignItems: 'center',
    justifyContent:'center',
  },
  cancelText: {
    color: theme.primaryButton,
    ...Fonts.Roboto50018,
  },
  createButton: {
    backgroundColor: theme.background,
    borderRadius: 8,
    width: 134.5,
    height: 37,
    alignItems: 'center',
    justifyContent:'center',
  },
  createText: {
    color: theme.buttonText,
    ...Fonts.Roboto50018,
  },
});

export default styles;
