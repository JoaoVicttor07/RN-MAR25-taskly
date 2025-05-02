import React, { useRef, useCallback } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Animated } from 'react-native';
import { TaskItemProps } from './types';
import { styles } from './style';

const TaskItem: React.FC<TaskItemProps> = ({ title, description, categories, isCompleted, onToggleComplete }) => {
  const iconScaleValue = useRef(new Animated.Value(1)).current;
  const buttonScaleValue = useRef(new Animated.Value(1)).current;

  const animateScale = useCallback(
    (animatedValue: Animated.Value, toValue: number, duration: number, callback?: () => void) => {
      Animated.timing(animatedValue, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start(callback);
    },
    []
  );

  const handleCheckPress = () => {
    animateScale(iconScaleValue, 0.8, 50, () => {
      animateScale(iconScaleValue, 1, 100);
      onToggleComplete();
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

  const renderCategoryItem = useCallback(({ item }: { item: string }) => (
    <Text style={styles.tag}>{item}</Text>
  ), []);

  const keyExtractorCategory = useCallback((item: string, index: number) => index.toString(), []);

  return (
    <View style={styles.itemArea}>
      <View style={styles.headerTask}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleCheckPress} style={animatedIconStyle}>
          <Image
            source={
              isCompleted
                ? require('../../Assets/icons/checked-input.png')
                : require('../../Assets/icons/uncheck-input.png')
            }
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={keyExtractorCategory}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        />
      </View>
      <View style={styles.areaButton}>
        <TouchableOpacity style={[styles.button, animatedButtonStyle]} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>VER DETALHES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskItem;