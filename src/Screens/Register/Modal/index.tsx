import React from 'react';
import { Modal, View, Text } from 'react-native';
import styles from './style';
import Button from '../../../components/button';

interface BiometryModalProps {
  visible: boolean;
  onClose: () => void;
  onActivate: () => void;
}

export default function BiometryModal({ visible, onClose, onActivate }: BiometryModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Ative o Desbloqueio por Biometria</Text>
          <Text style={styles.description}>
            Use sua impressão digital para acessar seu app de tarefas com rapidez e segurança. Se preferir, você ainda poderá usar sua senha sempre que quiser.
          </Text>
          <View style={styles.buttonRow}>
            <Button
              title="Agora não"
              fontFamily="Roboto50018"
              width={140}
              height={40}
              backgroundColor="#FFF"
              textColor="#5B3CC4"
              borderColor="#5B3CC4"
              borderWidth={2}
              onPress={onClose}
            />
            <Button
              title="ATIVAR"
              fontFamily="Roboto50018"
              width={140}
              height={40}

              textColor="#FFF"
              onPress={onActivate}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}