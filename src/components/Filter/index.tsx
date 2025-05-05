import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from './style';

export default function Filter() {
    return (
        <View style={styles.filterContainer}>
        <TouchableOpacity>
          <Image
            style={styles.filterIcon}
            source={require('../../Assets/icons/FilterIcon.png')}
          />
        </TouchableOpacity>
      </View>
    )
}