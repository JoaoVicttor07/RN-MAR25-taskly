import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  modalContent: {
    backgroundColor: '#F4F4F4',
    padding: 24,
    borderRadius: 8,
    height: 382,
    width: 329,
    justifyContent: 'space-between',
  },
  modalTitle: {
    ...Fonts.Roboto70024,
  },
  modalHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  accordionContent: {
    paddingVertical: 10,
    paddingLeft: 15,
  },
  buttonsContainer: {
    gap: 12,
  },
});

export default styles