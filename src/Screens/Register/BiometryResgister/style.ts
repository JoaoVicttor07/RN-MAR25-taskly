// src/Screens/Register/BiometryModal/style.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftButton: {
    backgroundColor: '#B0B0B0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  rightButton: {
    backgroundColor: '#5B3CC4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  leftButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  rightButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  openModalButton: {
    marginTop: 20,
    backgroundColor: '#5B3CC4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 16,
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default styles;
