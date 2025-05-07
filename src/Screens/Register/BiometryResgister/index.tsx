// src/Screens/Register/BiometryModal/index.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from './style'; // Importando os estilos

interface BiometryModalProps {
  visible: boolean;
  title: string;
  description: string;
  buttonLeftText: string;
  buttonRightText: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  buttonLeftStyle?: object; // Estilo opcional para o botão esquerdo
  buttonRightStyle?: object; // Estilo opcional para o botão direito
  modalStyle?: object; // Estilo opcional para o modal
}

const BiometryModal: React.FC<BiometryModalProps> = ({
  visible,
  title,
  description,
  buttonLeftText,
  buttonRightText,
  onPressLeft,
  onPressRight,
  buttonLeftStyle,
  buttonRightStyle,
  modalStyle,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onPressLeft} // Fecha o modal quando o botão de voltar é pressionado
    >
      <View style={[styles.overlay, modalStyle]}> {/* Estilo do fundo semitransparente */}
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.leftButton, buttonLeftStyle]} // Usando o estilo do botão esquerdo
              onPress={onPressLeft}
            >
              <Text style={styles.leftButtonText}>{buttonLeftText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.rightButton, buttonRightStyle]} // Usando o estilo do botão direito
              onPress={onPressRight}
            >
              <Text style={styles.rightButtonText}>{buttonRightText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BiometryModal;
