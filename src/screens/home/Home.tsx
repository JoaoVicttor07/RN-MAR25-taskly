import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importando o hook de navegação
import styles from './home.styles';
import Button from '../../components/button';

const Home: React.FC = () => {
  const navigation = useNavigation(); // Obtendo o hook de navegação

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
          <Text style={styles.title}>TASKLY</Text>
          <Image
            source={require('../../assets/images/Ellipse1.png')}
            style={styles.avatar}
          />
      </View>

      {/* Smiles Sad */}
      <View style={styles.containerNoTask}>
          <Image
            source={require('../../assets/images/SmileySad.png')}
            style={styles.smileSad}
            resizeMode="contain"
          />
          <Text style={styles.textNoTask}>No momento você não possui tarefa</Text>

          {/* Botão para Criar Tarefa */}
          <Button
            title = 'Criar Tarefa'
            backgroundColor = "#5B3CC4"
            borderColor = "#5B3CC4"
            borderWidth={0}
            textColor = "#FFFFFF"
          />
      </View>

      {/* Link para Voltar */}
      <View style={styles.containerNoTask}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonNavigation}>
            <Text style={styles.buttonTextNavigation}>Voltar</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
