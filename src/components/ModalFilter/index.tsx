import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import Button from '../../components/button';
import Fonts from '../../Theme/fonts';
import Collapsible from 'react-native-collapsible';
import AnimatedCheck from '../AnimatedCheck';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onPrioritySelect: (priority: 'lowToHigh' | 'highToLow' | null) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({visible, onClose, onPrioritySelect}) => {
  const [isOrdenarOpen, setIsOrdenarOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isDataOpen, setIsDataOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<'lowToHigh' | 'highToLow' | null>(null);

  const toggleOrdenar = () => {
    setIsOrdenarOpen(!isOrdenarOpen);
  };

  const toggleTags = () => {
    setIsTagsOpen(!isTagsOpen);
  };

  const toggleData = () => {
    setIsDataOpen(!isDataOpen);
  };

  const handlePrioritySelect = (priority: 'lowToHigh' | 'highToLow') => {
    setSelectedPriority(prevPriority => (prevPriority === priority ? null : priority));
  };

  const handleApplyFilter = () => {
    onPrioritySelect(selectedPriority);
    onClose();
  };

  const handleClearFilter = () => {
    setSelectedPriority(null);
    onPrioritySelect(null);
    onClose();
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

          <View style={styles.accordionArea}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={toggleOrdenar}>
              <Text style={styles.accordionTitle}>Ordenar por</Text>
              <Image
                source={
                  isOrdenarOpen
                    ? require('../../Assets/icons/arrowUp.png')
                    : require('../../Assets/icons/arrowDown.png')
                }
              /> 
            </TouchableOpacity>
            <Collapsible collapsed={!isOrdenarOpen}>
              <View>
                <View style={[styles.itemAccordion, styles.line]}>
                  <TouchableOpacity style={styles.selectionAreaItemAccordion} onPress={() => handlePrioritySelect('lowToHigh')}>
                    <AnimatedCheck
                      isCompleted={selectedPriority === 'lowToHigh'}
                      onToggle={() => handlePrioritySelect('lowToHigh')}
                    />
                    <Text style={styles.optionText}>Prioridade (de baixa para alta)</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.itemAccordion}>
                  <TouchableOpacity style={styles.selectionAreaItemAccordion} onPress={() => handlePrioritySelect('highToLow')}>
                    <AnimatedCheck
                      isCompleted={selectedPriority === 'highToLow'}
                      onToggle={() => handlePrioritySelect('highToLow')}
                    />
                    <Text style={styles.optionText}>Prioridade (de alta para baixa)</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Collapsible>

            <TouchableOpacity
              style={[styles.accordionHeader, styles.line]}
              onPress={toggleTags}>
              <Text style={styles.accordionTitle}>Tags</Text>
              <Image
                source={
                  isTagsOpen
                    ? require('../../Assets/icons/arrowUp.png')
                    : require('../../Assets/icons/arrowDown.png')
                }
              />
            </TouchableOpacity>
            <Collapsible collapsed={!isTagsOpen}>
              <View>
                <Text>Tag 1</Text>
                <Text>Tag 2</Text>
              </View>
            </Collapsible>

            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={toggleData}>
              <Text style={styles.accordionTitle}>Data</Text>
              <Image
                source={
                  isDataOpen
                    ? require('../../Assets/icons/arrowUp.png')
                    : require('../../Assets/icons/arrowDown.png')
                }
              />
            </TouchableOpacity>
            <Collapsible collapsed={!isDataOpen}>
              <View>
                <Text>Opção de data 1</Text>
                <Text>Opção de data 2</Text>
              </View>
            </Collapsible>
          </View>

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
              onPress={handleApplyFilter}
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
              onPress={handleClearFilter}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
