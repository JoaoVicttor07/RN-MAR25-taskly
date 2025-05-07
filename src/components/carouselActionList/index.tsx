import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../Navigation/types';
import { CarouselActionItem } from '../carouselActionItem';
import userIcon from '../../Assets/icons/User.png';
import biometryIcon from '../../Assets/icons/FingerprintSimple.png';
import deleteIcon from '../../Assets/icons/Trash.png';
import logoutIcon from '../../Assets/icons/SignOut.png';
import ConfirmationModal from '../ConfirmationModal';
import styles from './style';

const actions = [
  { id: '1', title: 'Editar Informações Pessoais', icon: userIcon },
  { id: '2', title: 'Mudar Biometria', icon: biometryIcon },
  { id: '3', title: 'Sair da Conta', icon: logoutIcon },
  { id: '4', title: 'Excluir Conta', icon: deleteIcon },
];

const modalConfigs = {
  'Sair da Conta': {
    title: 'Deseja sair?',
    description: 'Tem certeza que deseja sair do aplicativo? Você poderá se conectar novamente a qualquer momento.',
    confirmText: 'SAIR',
    confirmColor: '#E23C44',
  },
  'Excluir Conta': {
    title: 'Excluir conta',
    description: 'Tem certeza que deseja excluir sua conta? Essa ação é permanente e todos os seus dados serão perdidos.',
    confirmText: 'EXCLUIR',
    confirmColor: '#E23C44',
  },
  'Mudar Biometria': {
    title: 'Ativar biometria',
    description: 'Deseja ativar a autenticação por biometria? Isso permitirá um acesso mais rápido e seguro ao app.',
    confirmText: 'HABILITAR',
    confirmColor: '#32C25B',
  },
};

export function CarouselActionList() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState<null | keyof typeof modalConfigs>(null);

  const handleAction = (title: string) => {
    if (title === 'Editar Informações Pessoais') {
      navigation.navigate('EditPersonalInfo'); 
      return;
    }

    if (modalConfigs[title as keyof typeof modalConfigs]) {
      setCurrentModal(title as keyof typeof modalConfigs);
      setModalVisible(true);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setCurrentModal(null);
  };

  const handleConfirm = () => {
    if (currentModal === 'Sair da Conta') {
      // 📌 Aqui será implementada a lógica de logout no futuro:
      // - Chamar o endpoint de logout da API
      // - Apagar o token do usuário do armazenamento local (AsyncStorage, SecureStore, etc.)
      console.log('Usuário deslogado');

      // Redireciona para a página de login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }

    setModalVisible(false);
    setCurrentModal(null);
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={actions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 12 }}
        renderItem={({ item }) => (
          <CarouselActionItem
            title={item.title}
            icon={item.icon}
            onPress={() => handleAction(item.title)}
          />
        )}
      />
      {currentModal && (
        <ConfirmationModal
          visible={modalVisible}
          title={modalConfigs[currentModal].title}
          description={modalConfigs[currentModal].description}
          confirmText={modalConfigs[currentModal].confirmText}
          confirmColor={modalConfigs[currentModal].confirmColor}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </View>
  );
}