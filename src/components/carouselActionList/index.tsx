import {FlatList, View} from 'react-native';
import {CarouselActionItem} from '../carouselActionItem';
import userIcon from '../../assets/icons/User.png';
import biometryIcon from '../../assets/icons/FingerprintSimple.png';
import deleteIcon from '../../assets/icons/Trash.png';
import logoutIcon from '../../assets/icons/SignOut.png';
import styles from './style';

const actions = [
  {id: '1', title: 'Editar Informações Pessoais', icon: userIcon},
  {id: '2', title: 'Mudar Biometria', icon: biometryIcon},
  {id: '3', title: 'Sair da Conta', icon: logoutIcon},
  {id: '4', title: 'Excluir Conta', icon: deleteIcon},
];

export function CarouselActionList() {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={actions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingBottom: 12,    
        }}
        renderItem={({item}) => (
          <CarouselActionItem
            title={item.title}
            icon={item.icon}
          //  onPress={item.onPress}
          />
        )}
      />
    </View>
  );
}
