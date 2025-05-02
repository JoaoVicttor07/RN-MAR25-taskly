import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; 
import { useNavigation } from '@react-navigation/native'; 
import stylesHome from '../Home/style'; 
import styles from './style'; 
          

export default function Menu() {
  const navigation = useNavigation(); 

  const handleGoBack = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.area}>
      <Text style={styles.areaText}>Tela Menu</Text>

      {/* Botão para Voltar */}
      <View style={stylesHome.containerNoTask}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={stylesHome.buttonNavigation}
        >
          <Text style={stylesHome.buttonTextNavigation}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};