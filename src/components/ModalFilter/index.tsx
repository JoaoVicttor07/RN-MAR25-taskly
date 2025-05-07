import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { Image } from 'react-native';
import Button from '../../components/button';
import Fonts from '../../Theme/fonts';
import Collapsible from 'react-native-collapsible';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
  const [isOrdenarOpen, setIsOrdenarOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isDataOpen, setIsDataOpen] = useState(false);

  const toggleOrdenar = () => {
    setIsOrdenarOpen(!isOrdenarOpen);
  };

  const toggleTags = () => {
    setIsTagsOpen(!isTagsOpen);
  };

  const toggleData = () => {
    setIsDataOpen(!isDataOpen);
  };

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

          <TouchableOpacity style={styles.accordionHeader} onPress={toggleOrdenar}>
            <Text>Ordenar por</Text>
            {/* Adicione um indicador visual (seta) para expandir/recolher */}
            <Text>{isOrdenarOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
          <Collapsible collapsed={!isOrdenarOpen}>
            <View style={styles.accordionContent}>
              <Text>Opção de ordenação 1</Text>
              <Text>Opção de ordenação 2</Text>
              {/* Adicione aqui as opções de ordenação */}
            </View>
          </Collapsible>

          <TouchableOpacity style={styles.accordionHeader} onPress={toggleTags}>
            <Text>Tags</Text>
            {/* Adicione um indicador visual (seta) para expandir/recolher */}
            <Text>{isTagsOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
          <Collapsible collapsed={!isTagsOpen}>
            <View style={styles.accordionContent}>
              <Text>Tag 1</Text>
              <Text>Tag 2</Text>
              {/* Adicione aqui as opções de tags */}
            </View>
          </Collapsible>

          <TouchableOpacity style={styles.accordionHeader} onPress={toggleData}>
            <Text>Data</Text>
            {/* Adicione um indicador visual (seta) para expandir/recolher */}
            <Text>{isDataOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
          <Collapsible collapsed={!isDataOpen}>
            <View style={styles.accordionContent}>
              <Text>Opção de data 1</Text>
              <Text>Opção de data 2</Text>
              {/* Adicione aqui as opções de data */}
            </View>
          </Collapsible>

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