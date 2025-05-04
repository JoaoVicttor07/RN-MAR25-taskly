import React, { useState, useEffect } from 'react'; // Importe useEffect
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './style';
import { isValidDate } from '../../Utils/validateDate';
import Input from '../../components/input';

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
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    deadline?: string;
  }>({});

  const resetModalInputs = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
    setErrors({});
  };

  // Use useEffect para resetar o formulário quando o modal for fechado
  useEffect(() => {
    if (!visible) {
      resetModalInputs();
    }
  }, [visible]);

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
      resetModalInputs();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <Text style={styles.modalTitle}>Criar tarefa</Text>

            <View style={styles.inputContainer}>
              <Input
                label="Título"
                error={errors.title}
                width={281}
                placeholder="Ex: bater o ponto"
                value={title}
                onChangeText={setTitle}
              />

              <View style={styles.textinputArea}>
                <Input
                  label="Descrição"
                  error={errors.description}
                  width={281}
                  multiline={true}
                  height={81}
                  value={description}
                  onChangeText={setDescription}
                  textAlignVertical="top"
                />
              </View>

              <Input
                label="Prazo"
                error={errors.deadline}
                width={281}
                placeholder="04/28/2025"
                value={deadline}
                onChangeText={setDeadline}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>CANCELAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreate}>
                <Text style={styles.createText}>CRIAR</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateTaskModal;