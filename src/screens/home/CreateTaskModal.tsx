import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './modal.styles'; // Importando os estilos do modal

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (task: { title: string; description: string; deadline: string }) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ visible, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string; deadline?: string }>({});

  const validateFields = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = 'Título é obrigatório';
    if (!description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!deadline.trim()) newErrors.deadline = 'Prazo é obrigatório';
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
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Criar tarefa</Text>

              <Text style={styles.label}>Título</Text>
              <TextInput
                placeholder="Ex. bater o ponto"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
              />
              {errors.title && <Text style={styles.error}>{errors.title}</Text>}

              <Text style={styles.label}>Descrição</Text>
              <TextInput
                placeholder="Digite a descrição"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, styles.textArea]}
                multiline
              />
              {errors.description && <Text style={styles.error}>{errors.description}</Text>}

              <Text style={styles.label}>Prazo</Text>
              <TextInput
                placeholder="Digite a data"
                value={deadline}
                onChangeText={setDeadline}
                style={styles.input}
              />
              {errors.deadline && <Text style={styles.error}>{errors.deadline}</Text>}

              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCreate} style={styles.createButton}>
                  <Text style={styles.createText}>Criar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateTaskModal;
