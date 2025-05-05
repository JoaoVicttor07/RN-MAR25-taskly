import React from 'react';
import { View, Text, Modal } from 'react-native';
import Button from '../../../components/button';
import styles from './style';


type ModalProps = {
  visible: boolean;
  title: string;
  description: string;
  confirmText: string;
  confirmColor: string;
  onClose: () => void;
};

const ConfirmationModal = ({
  visible,
  title,
  description,
  onClose,
}: ModalProps) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Button 
            title='FECHAR'
            fontFamily='Roboto50018'
            height={40}
            backgroundColor='#32C25B'
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};


export default ConfirmationModal;