import React, {ReactNode} from 'react';
import {View, Text, Image} from 'react-native';
import {useUser} from '../../contexts/userContext';
import styles from './style';

interface DefaultHeaderProps {
  leftComponent?: ReactNode;
}

const bucketBaseUrl = 'https://taskly-avatares-usuario.s3.us-east-2.amazonaws.com/avatars/';

const avatarMap: Record<string, any> = {
  avatar_1: {uri: `${bucketBaseUrl}avatar_1.png`},
  avatar_2: {uri: `${bucketBaseUrl}avatar_2.png`},
  avatar_3: {uri: `${bucketBaseUrl}avatar_3.png`},
  avatar_4: {uri: `${bucketBaseUrl}avatar_4.png`},
  avatar_5: {uri: `${bucketBaseUrl}avatar_5.png`},
};

const DefaultHeader: React.FC<DefaultHeaderProps> = ({leftComponent}) => {
  const {user} = useUser();
  return (
    <View style={styles.header}>
      {leftComponent && (
        <View style={styles.leftContainer}>{leftComponent}</View>
      )}
      <Text style={styles.title}>TASKLY</Text>
      <Image
        source={
          user?.avatarUrl && avatarMap[user.avatarUrl]
            ? avatarMap[user.avatarUrl]
            : require('../../Assets/Images/Avatars/avatar_5.png')
        }
        style={styles.avatar}
      />
    </View>
  );
};

export default DefaultHeader;
