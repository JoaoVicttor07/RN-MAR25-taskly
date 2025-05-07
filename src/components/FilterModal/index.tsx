import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import Button from '../button';
import Fonts from '../../Theme/fonts';
import Collapsible from 'react-native-collapsible';
import AnimatedCheck from '../AnimatedCheck';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onPrioritySelect: (priority: 'lowToHigh' | 'highToLow' | null) => void;
  onTagSelect: (tags: string[]) => void;
  onDateSelect: (date: Date | null) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({visible, onClose, onPrioritySelect, onTagSelect, onDateSelect}) => {
  const [isOrdenarOpen, setIsOrdenarOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isDataOpen, setIsDataOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<'lowToHigh' | 'highToLow' | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const availableTags = ['TRABALHO', 'CASA', 'ACADEMIA'];
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | null>(null);

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

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prevTags => prevTags.filter(t => t !== tag));
    } else {
      setSelectedTags(prevTags => [...prevTags, tag]);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    hideDatePicker();
    setFilterDate(selectedDate);
  };

  const handleApplyFilter = () => {
    onPrioritySelect(selectedPriority);
    onTagSelect(selectedTags);
    onDateSelect(filterDate);
    onClose();
  };

  const handleClearFilter = () => {
    setSelectedPriority(null);
    setSelectedTags([]);
    setFilterDate(null);
    onPrioritySelect(null);
    onTagSelect([]);
    onDateSelect(null);
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
                <View style={[styles.itemAccordion, styles.lineDown]}>
                  <TouchableOpacity style={styles.selectionAreaItemAccordion} onPress={() => handlePrioritySelect('lowToHigh')}>
                    <AnimatedCheck
                      isCompleted={selectedPriority === 'lowToHigh'}
                      onToggle={() => handlePrioritySelect('lowToHigh')}
                      checkedImageSource={require('../../Assets/icons/checked-input.png')}
                      uncheckedImageSource={require('../../Assets/icons/uncheck-input.png')}
                    />
                    <Text style={styles.optionText}>Prioridade (de baixa para alta)</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.itemAccordion}>
                  <TouchableOpacity style={styles.selectionAreaItemAccordion} onPress={() => handlePrioritySelect('highToLow')}>
                    <AnimatedCheck
                      isCompleted={selectedPriority === 'highToLow'}
                      onToggle={() => handlePrioritySelect('highToLow')}
                      checkedImageSource={require('../../Assets/icons/checked-input.png')}
                      uncheckedImageSource={require('../../Assets/icons/uncheck-input.png')}
                    />
                    <Text style={styles.optionText}>Prioridade (de alta para baixa)</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Collapsible>

            <TouchableOpacity
              style={[styles.accordionHeader, styles.lineTop]}
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
              <View style={styles.tagsContainer}>
                {availableTags.map(tag => (
                  <View key={tag} style={[styles.itemAccordion, styles.tagItem]}>
                    <TouchableOpacity style={styles.selectionAreaItemAccordion} onPress={() => handleTagSelect(tag)}>
                      <AnimatedCheck
                        isCompleted={selectedTags.includes(tag)}
                        onToggle={() => handleTagSelect(tag)}
                        checkedImageSource={require('../../Assets/icons/CheckSquare-2.png')}
                        uncheckedImageSource={require('../../Assets/icons/CheckSquare-1.png')}
                      />
                      <Text style={styles.optionText}>{tag}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </Collapsible>

            <TouchableOpacity
              style={[styles.accordionHeader, styles.lineTop]}
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
              <View style={styles.dateFilterContainer}>
                <TouchableOpacity onPress={showDatePicker}>
                  <View style={styles.dateInput}>
                    <Text style={styles.dateText}>
                      {filterDate ? format(filterDate, 'dd/MM/yyyy', { locale: ptBR }) : 'Selecionar data'}
                    </Text>
                  </View>
                </TouchableOpacity>

                <DatePicker
                  modal
                  open={isDatePickerVisible}
                  date={filterDate || new Date()}
                  mode="date"
                  locale="pt-BR"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
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