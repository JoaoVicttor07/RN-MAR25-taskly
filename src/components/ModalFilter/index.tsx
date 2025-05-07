import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {Image} from 'react-native';
import Button from '../../components/button';
import Fonts from '../../Theme/fonts';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({visible, onClose}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtro</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={require('../../Assets/icons/X.png')} />
            </TouchableOpacity>
          </View>
          <Text>Ordernar por</Text>
          <Text>Tags</Text>
          <Text>Data</Text>
          <View style={styles.buttonsContainer}>
            <Button
              title="APLICAR"
              backgroundColor="#5B3CC4"
              textColor="#FFFFFF"
              fontFamily={Fonts.Roboto50018.fontFamily}
              fontWeight={500}
              fontSize={Fonts.Roboto50018.fontSize}
              width="100%"
              height={37}
            />
            <Button
              title="LIMPAR FILTRO"
              backgroundColor="#5B3CC4"
              textColor="#FFFFFF"
              fontFamily={Fonts.Roboto50018.fontFamily}
              fontWeight={500}
              fontSize={Fonts.Roboto50018.fontSize}
              width="100%"
              height={37}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
