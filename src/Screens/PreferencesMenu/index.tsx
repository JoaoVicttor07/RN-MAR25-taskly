import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import SettingCard from '../../components/SettingCard';
import ThemeModal from './Modal';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';

export default function PreferencesMenu() {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const { theme } = useTheme(); // Obtenha o tema
    const themedStyles = getStyles(theme); // Aplique o tema aos estilos

    return(
        <View style={themedStyles.container}>
            <View style={themedStyles.header}>

                <BackButton
                onPress={() => navigation.goBack()}
                />
                <Text style={themedStyles.textPreferences}>Preferências</Text>
            </View>
            <SettingCard onPress={() => setModalVisible(true)} />
            <ThemeModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    );
}
