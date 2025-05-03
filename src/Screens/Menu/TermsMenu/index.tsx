//TermsMenu

import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview'; 
import BackButton from '../../../components/BackButton'; 
import Fonts from '../../../Theme/fonts';


type Props = {
  navigation: any;
};

const TermosPage = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com o botão Voltar e o título "Termos e Regulamentos" */}
      <View style={styles.header}>
        {/* Utilizando o BackButton aqui */}
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Termos e regulamentos</Text>
      </View>

      {/* Barra de Separação */}
      <View style={styles.separator} />

      {/* Carregar conteúdo da URL diretamente no WebView */}
      <WebView
        originWhitelist={['*']} // Permite carregar qualquer conteúdo
        source={{ uri: 'https://sobreuol.noticias.uol.com.br/normas-de-seguranca-e-privacidade/en/' }} 
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginTop:40,
    marginHorizontal:32,

  },
  title: {
    ...Fonts.Roboto40016,
    color: '#000000',
  },
  separator: {
    height: 1,
    backgroundColor: '#000000',
    marginVertical: 14,
  },
  webview: {
    flex: 1,
    marginTop:30,
    marginHorizontal:8,
    alignItems:'center',
    justifyContent:'center',
  },
});

export default TermosPage;
