import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!visible) {
      resetModalInputs();
    }
  }, [visible]);

  const validateTitle = (text: string) => {
    if (!text.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, title: 'Título é obrigatório' }));
    } else if (errors.title) {
      setErrors(prevErrors => ({ ...prevErrors, title: undefined }));
    }
    setTitle(text);
  };

  const validateDescription = (text: string) => {
    if (!text.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, description: 'Descrição é obrigatória' }));
    } else if (errors.description) {
      setErrors(prevErrors => ({ ...prevErrors, description: undefined }));
    }
    setDescription(text);
  };

  const validateDeadline = (text: string) => {
    if (!text.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, deadline: 'Prazo é obrigatório' }));
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(text.trim())) {
      setErrors(prevErrors => ({ ...prevErrors, deadline: 'Formato inválido. Use dd/mm/aaaa' }));
    } else if (!isValidDate(text.trim())) {
      setErrors(prevErrors => ({ ...prevErrors, deadline: 'Data inválida' }));
    } else if (errors.deadline) {
      setErrors(prevErrors => ({ ...prevErrors, deadline: undefined }));
    }
    setDeadline(text);
  };

  const handleCreate = () => {
    const isTitleValid = !errors.title && title.trim();
    const isDescriptionValid = !errors.description && description.trim();
    const isDeadlineValid = !errors.deadline && deadline.trim() && /^\d{2}\/\d{2}\/\d{4}$/.test(deadline.trim()) && isValidDate(deadline.trim());

    if (isTitleValid && isDescriptionValid && isDeadlineValid) {
      onCreate({ title, description, deadline });
      resetModalInputs();
    } else {
      if (!title.trim()) {
        setErrors(prevErrors => ({ ...prevErrors, title: 'Título é obrigatório' }));
      }
      if (!description.trim()) {
        setErrors(prevErrors => ({ ...prevErrors, description: 'Descrição é obrigatória' }));
      }
      if (!deadline.trim()) {
        setErrors(prevErrors => ({ ...prevErrors, deadline: 'Prazo é obrigatório' }));
      } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(deadline.trim())) {
        setErrors(prevErrors => ({ ...prevErrors, deadline: 'Formato inválido. Use dd/mm/aaaa' }));
      } else if (!isValidDate(deadline.trim())) {
        setErrors(prevErrors => ({ ...prevErrors, deadline: 'Data inválida' }));
      }
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
                onChangeText={validateTitle}
              />

              <View style={styles.textinputArea}>
                <Input
                  label="Descrição"
                  error={errors.description}
                  width={281}
                  multiline={true}
                  height={81}
                  value={description}
                  onChangeText={validateDescription}
                  textAlignVertical="top"
                />
              </View>

              <Input
                label="Prazo"
                error={errors.deadline}
                width={281}
                placeholder="04/28/2025"
                value={deadline}
                onChangeText={validateDeadline}
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