import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface TabIconProps {
  focused: boolean;
  color: string;
  iconSource: string | ReturnType<typeof require>; 
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: '#5B3CC4',
    position: 'absolute',
    zIndex: -1,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

const TabIcon: React.FC<TabIconProps> = ({ focused, color, iconSource }) => {
  return (
    <View style={styles.iconContainer}>
      {focused && <View style={styles.activeCircle} />}
      <Image source={iconSource} style={[styles.icon, { tintColor: color }]} />
    </View>
  );
};

export default TabIcon;