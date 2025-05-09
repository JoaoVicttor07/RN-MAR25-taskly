import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigation/types'; // Importe seu tipo de navegação

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SplashScreen'>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>(); // Tipando corretamente

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');  // Usando replace após 2.5s
    }, 1500);

    return () => clearTimeout(timer);  // Limpa o timer ao desmontar o componente
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/Frame1.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
});

export default SplashScreen;
