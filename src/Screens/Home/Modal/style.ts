import { StyleSheet } from 'react-native';
import Fonts from '../../../Theme/fonts';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    marginHorizontal: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
  },
  modalTitle: {
    ...Fonts.Roboto50018,
    textAlign: 'left',
  },
  label: {
    marginTop: 12,
    ...Fonts.Roboto40012,
    color: '#1E1E1E',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5B3CC4',
    width: 134.5,
    height: 37,
    alignItems: 'center',
    justifyContent:'center',
  },
  cancelText: {
    color: '#5B3CC4',
    ...Fonts.Roboto50018,
  },
  createButton: {
    backgroundColor: '#5B3CC4',
    borderRadius: 8,
    width: 134.5,
    height: 37,
    alignItems: 'center',
    justifyContent:'center',
  },
  createText: {
    color: '#fff',
    ...Fonts.Roboto50018,
  },
});

export default styles;
