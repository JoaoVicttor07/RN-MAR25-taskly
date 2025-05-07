import React from 'react';
import { Modal, View, Text, TouchableOpacity} from 'react-native';
import styles from './style';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filtros</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
