/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import Button from '../../components/button';
import getStyles, { avatarStyles } from './style'; // Importe getStyles e avatarStyles
import { useTheme } from '../../Theme/ThemeContext';
import avatar1 from '../../Assets/Images/Avatars/avatar1.jpg'; // Importe a imagem do avatar

const AVATARS = [
  {id: '1', source: avatar1, borderColor: '#6C4AE4'},
  {id: '2', source: avatar1, borderColor: '#E4B14A'},
  {id: '3', source: avatar1, borderColor: '#4AE47B'},
  {id: '4', source: avatar1, borderColor: '#E44A4A'},
  {id: '5', source: avatar1, borderColor: '#B89B5B'},
];

const AVATAR_SIZE = 100;
const AVATAR_MARGIN = 12;
const GRAY_BORDER = '#D1D5DB';

export default function AvatarSelector() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { theme } = useTheme();
  const styles = getStyles(theme); // Obtém os estilos com base no tema

  const handleConfirm = () => {
    if (!selectedId) {
      Alert.alert('Selecione um avatar');
      return;
    }
    Alert.alert('Avatar selecionado!', `ID: ${selectedId}`);
  };

  const handleAvatarPress = (id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.textAvatar}>SELECIONE SEU AVATAR</Text>
        <Text style={styles.textPick}>(Escolha somente um.)</Text>
      </View>
      <View style={styles.avatarsRow}>
        {AVATARS.map(avatar => {
          const isSelected = selectedId === avatar.id;
          const isDimmed = selectedId && !isSelected;
          return (
            <TouchableOpacity
              key={avatar.id}
              style={[
                avatarStyles.avatarTouchable, // Aplica os estilos fixos dos avatares

                {
                  borderColor: selectedId
                    ? isSelected
                      ? avatar.borderColor
                      : GRAY_BORDER
                    : avatar.borderColor,
                  borderWidth: 3,
                  borderRadius: AVATAR_SIZE / 2,
                  overflow: 'hidden',
                  margin: AVATAR_MARGIN / 2,
                  padding: 0,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => handleAvatarPress(avatar.id)}>
              <Image
                source={avatar.source}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE / 2,
                }}
                resizeMode="cover"
              />
              {isDimmed && (
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE / 2,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <Button
        title="CONFIRMAR SELEÇÃO"
        fontFamily="Roboto60020"
        width={Dimensions.get('window').width * 0.9}
        style={styles.confirmButton}
        backgroundColor={theme.confirmButton} // Garanta que essa propriedade esteja no seu tema
        onPress={handleConfirm}
      />
    </View>
  );
}
