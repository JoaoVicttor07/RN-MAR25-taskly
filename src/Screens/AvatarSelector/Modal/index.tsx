import React from 'react';
import {View, Text, Modal} from 'react-native';
import Button from '../../../components/button';
import { useTheme } from '../../../Theme/ThemeContext';

import getStyles from './style';

type ModalProps = {
  visible: boolean;
  title: string;
  description: string;
  confirmText: string;
  confirmColor?: string;
  onClose: () => void;
};

const ConfirmationModal = ({
  visible,
  title,
  description,
  confirmText,
  onClose,
}: ModalProps) => {

  const { theme } = useTheme();
  const themedStyles = getStyles(theme);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={themedStyles.overlay}>
        <View style={themedStyles.modalContainer}>
          <Text style={themedStyles.title}>{title}</Text>
          <Text style={themedStyles.description}>{description}</Text>
          <Button
            title={confirmText}
            fontFamily="Roboto50018"
            height={40}
            backgroundColor={theme.buttonBackground}
            onPress={() => {
              if (onClose) {
                onClose();
              }
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
