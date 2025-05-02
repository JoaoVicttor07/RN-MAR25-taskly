import {Text, StyleSheet, View, TouchableOpacity, Image, ScrollView, Animated} from 'react-native';
import Fonts from '../../Theme/fonts';
import { useState, useRef } from 'react';

export default function TaskItem() {
  const [isChecked, setIsChecked] = useState(false);
  const iconScaleValue = useRef(new Animated.Value(1)).current;
  const buttonScaleValue = useRef(new Animated.Value(1)).current;

  const animateScale = (animatedValue: Animated.Value, toValue: number, duration: number, callback?: () => void) => {
    Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start(callback);
  };

  const handleCheckPress = () => {
    animateScale(iconScaleValue, 0.8, 50, () => {
      animateScale(iconScaleValue, 1, 100);
      setIsChecked(!isChecked);
    });
  };

  const handleButtonPress = () => {
    animateScale(buttonScaleValue, 0.9, 50, () => {
      animateScale(buttonScaleValue, 1, 100);
    });
  };

  const animatedIconStyle = {
    transform: [{ scale: iconScaleValue }],
  };

  const animatedButtonStyle = {
    transform: [{ scale: buttonScaleValue }],
  };

  return (
    <View style={styles.itemArea}>
      <View style={styles.headerTask}>
        <Text style={{...Fonts.Roboto60020}}>Bater o ponto</Text>
        <TouchableOpacity onPress={handleCheckPress} style={animatedIconStyle}>
          <Image
            source={
              isChecked
                ? require('../../Assets/icons/checked-input.png')
                : require('../../Assets/icons/uncheck-input.png')
            }
          />
        </TouchableOpacity>
      </View>
      <Text style={Fonts.Roboto40016}>
        bater o ponto pelo site do kairos e depois tenho que sair para tomar
        café.
      </Text>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.carousel}>
            <Text style={styles.tag}>TRABALHO</Text>
            <Text style={styles.tag}>CASA</Text>
            <Text style={styles.tag}>ESPORTE</Text>
            <Text style={styles.tag}>ACADEMIA</Text>
            <Text style={styles.tag}>LAZER</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.areaButton}>
        <TouchableOpacity style={[styles.button, animatedButtonStyle]} onPress={handleButtonPress}>
          <Text style={[styles.buttonText, {...Fonts.Roboto40016}]}>
            VER DETALHES
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemArea: {
    backgroundColor: '#FFFFFF',
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    gap: 12,
  },
  areaButton: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5B3CC4',
    borderRadius: 8,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    width: 127,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  tag: {
    backgroundColor: '#E6E0F7',
    ...Fonts.Roboto40012,
    padding: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  headerTask: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  carousel:{
    flexDirection: 'row', gap: 12
  },
});