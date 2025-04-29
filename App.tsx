import React from 'react';
import { SafeAreaView, FlatList, Text, ListRenderItemInfo } from 'react-native';
import { AppStyles } from './AppStyles';

const data: string[] = ['Amanda Meneghini', 'Jailson Neiva', 'João Victor', 'Diogo', 'Camila'];

const App: React.FC = () => {
  const renderItem = ({item}: ListRenderItemInfo<string>) => {
    return <Text style={AppStyles.equipe}>{item}</Text>;
  };
  return (
    <SafeAreaView style={AppStyles.container}>
      <Text style={AppStyles.text}>CLUSTER SQUAD</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default App;
