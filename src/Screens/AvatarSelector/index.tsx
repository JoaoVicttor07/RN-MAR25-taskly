import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  BackHandler,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../Navigation/types';
import Button from '../../components/button';
import ProfileHeader from '../../components/ProfileHeader';
import ProgressBar from '../../components/ProgressBar';
import Modal from './Modal';
import { useTheme } from '../../Theme/ThemeContext';
import { ThemeType } from '../../Theme/theme';

import avatar1 from '../../Assets/Images/Avatars/avatar-1.jpg';

const AVATARS = [
  { id: '1', source: avatar1, borderColor: '#6C4AE4' },
  { id: '2', source: avatar1, borderColor: '#E4B14A' },
  { id: '3', source: avatar1, borderColor: '#4AE47B' },
  { id: '4', source: avatar1, borderColor: '#E44A4A' },
  { id: '5', source: avatar1, borderColor: '#B89B5B' },
];

const AVATAR_SIZE = 100;
const AVATAR_MARGIN = 12;
const GRAY_BORDER = '#D1D5DB';

const avatarTouchableStyle = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    margin: AVATAR_MARGIN / 2,
    padding: 0,
  },
  dimmedOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default function AvatarSelector() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { theme } = useTheme();
  const themedStyles = getStyles(theme);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, 'AvatarSelector'>>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'AvatarSelector'>
    >();
  const { isEditing = false } = route.params || {};

  useEffect(() => {
    const backAction = () => {
      if (!isEditing) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isEditing]);

  const handleConfirm = () => {
    if (!selectedId) {
      Alert.alert('Por favor, selecione um avatar antes de continuar.');
      return;
    }

    if (!isModalVisible) {
      setIsModalVisible(true);
    }
  };

  const handleModalClose = () => {
    if (!isModalVisible) {
      return;
    }

    setIsModalVisible(false);

    if (isEditing) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    }
  };

  const handleAvatarPress = (id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <View style={themedStyles.container}>
      {isEditing && (
        <View style={themedStyles.headerContainer}>
          <ProfileHeader
            title="EDIÇÃO DE PERFIL"
            onBackPress={() => navigation.goBack()}
          />
          <ProgressBar progress={1} />
        </View>
      )}
      <View style={themedStyles.content}>
        <Text style={themedStyles.textAvatar}>SELECIONE SEU AVATAR</Text>
        <Text style={themedStyles.textPick}>(Escolha somente um.)</Text>
      </View>
      <View style={themedStyles.avatarsRow}>
        {AVATARS.map((avatar) => {
          const isSelected = selectedId === avatar.id;
          const isDimmed = selectedId && !isSelected;
          return (
            <TouchableOpacity
              key={avatar.id}
              style={[
                avatarTouchableStyle.container,
                {
                  borderColor: selectedId
                    ? isSelected
                      ? avatar.borderColor
                      : GRAY_BORDER
                    : avatar.borderColor,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => handleAvatarPress(avatar.id)}
            >
              <Image
                source={avatar.source}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE / 2,
                }}
                resizeMode="cover"
              />
              {isDimmed && <View style={avatarTouchableStyle.dimmedOverlay} />}
            </TouchableOpacity>
          );
        })}
      </View>
      <Button
        title={isEditing ? 'CONFIRMAR EDIÇÃO' : 'CONFIRMAR SELEÇÃO'}
        fontFamily="Roboto60020"
        width={Dimensions.get('window').width * 0.9}
        style={themedStyles.confirmButton}
        backgroundColor={theme.confirmButton}
        onPress={handleConfirm}
      />
      <Modal
        visible={isModalVisible}
        title={
          isEditing ? 'Perfil atualizado' : 'Cadastro realizado com sucesso!'
        }
        description={
          isEditing
            ? 'Suas informações foram salvas com sucesso.'
            : 'Você será direcionado para a tela principal.'
        }
        confirmText="OK"
        confirmColor="#32C25B"
        onClose={handleModalClose}
      />
    </View>
  );
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  headerContainer: {
    paddingBottom: 20,
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  textAvatar: {
    fontSize: 20,
    fontFamily: 'Roboto70020',
    color: theme.text,
    marginBottom: 8,
  },
  textPick: {
    fontSize: 16,
    fontFamily: 'Roboto400',
    color: theme.secondaryText,
  },
  avatarsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: AVATAR_MARGIN / 2,
    marginTop: 20,
  },
  confirmButton: {
    marginTop: 40,
  },
});
