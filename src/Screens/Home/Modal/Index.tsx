import React, { useState } from 'react';
import {Modal, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import styles from './style';
import { isValidDate } from '../../../Utils/validateDate';
import { TextInputMask } from 'react-native-masked-text';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (task: {
    title: string;
    description: string;
    deadline: string;
  }) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string; deadline?: string }>({});

  const validateFields = () => {
    const newErrors: typeof errors = {};
  
    if (!title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }
  
    if (!description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
  
    if (!deadline.trim()) {
      newErrors.deadline = 'Prazo é obrigatório';
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(deadline.trim())) {
      newErrors.deadline = 'Formato inválido. Use dd/mm/aaaa';
    } else if (!isValidDate(deadline.trim())) {
      newErrors.deadline = 'Data inválida';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleCreate = () => {
    if (validateFields()) {
      onCreate({ title, description, deadline });
      setTitle('');
      setDescription('');
      setDeadline('');
      setErrors({});
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType='slide'
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar tarefa</Text>

            <Text style={styles.label}>Título</Text>
            <TextInput
              style={styles.input}
              placeholder='Ex. bater o ponto'
              value={title}
              onChangeText={setTitle}
            />
            {errors.title && <Text style={styles.error}>{errors.title}</Text>}

            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder='Digite a descrição'
              value={description}
              onChangeText={setDescription}
              multiline
            />
            {errors.description && <Text style={styles.error}>{errors.description}</Text>}

            <Text style={styles.label}>Prazo</Text>
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              style={styles.input}
              placeholder='DD/MM/AAAA'
              value={deadline}
              onChangeText={setDeadline}
            />
            {errors.deadline && <Text style={styles.error}>{errors.deadline}</Text>}


            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                <Text style={styles.createText}>Criar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateTaskModal;
