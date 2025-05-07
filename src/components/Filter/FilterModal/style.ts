import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxWidth: 400,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
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

export default styles;