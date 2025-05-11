import React from 'react';
import { Modal, View, Text } from 'react-native';
import Button from '../button';
import getStyles from './style'; // Importe a função getStyles
import { useTheme } from '../../Theme/ThemeContext'; // Importe o hook useTheme

type Props = {
  visible: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmColor: string;
};

export default function ConfirmationModal({
  visible,
  title,
  description,
  confirmText,
  cancelText = 'Agora não',
  onCancel,
  onConfirm,
}: Props) {
  const { theme } = useTheme(); // Obtenha o objeto theme
  const styles = getStyles(theme); // Obtenha os estilos dinâmicos

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.buttonRow}>
            <Button
              title={cancelText}
              fontFamily="Roboto50018"
              style={styles.cancelButton}
              textStyle={styles.cancelButtonText}
              onPress={onCancel}
            />
            <Button
              title={confirmText}
              fontFamily="Roboto50018"
              style={styles.confirmButton}
              textStyle={styles.confirmButtonText}
              onPress={onConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
