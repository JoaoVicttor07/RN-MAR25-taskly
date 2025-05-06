import {StyleSheet} from 'react-native';
import Fonts from '../../../Theme/fonts';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 8,
  },
  title: {
    ...Fonts.Roboto50018,
    fontWeight: 'bold',
    color: '#22223B',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    ...Fonts.Roboto40016,
    color: '#22223B',
    textAlign: 'left',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
});

export default styles