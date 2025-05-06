import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    minHeight: 200,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default styles