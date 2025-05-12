import React, { useRef, useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList, Animated } from 'react-native';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';
import AnimatedCheck from '../AnimatedCheck';

interface TaskItemProps {
  title: string;
  description: string;
  categories: string[];
  isCompleted: boolean;
  onToggleComplete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, description, categories, isCompleted, onToggleComplete }) => {

  const { theme } = useTheme();
  const styles = getStyles(theme);

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

  const handleButtonPress = () => {
    animateScale(buttonScaleValue, 0.9, 50, () => {
      animateScale(buttonScaleValue, 1, 100);
    });
  };

  const animatedButtonStyle = {
    transform: [{ scale: buttonScaleValue }],
  };

  const renderCategoryItem = useCallback(({ item }: { item: string }) => (
    <Text style={styles.tag}>{item}</Text>
  ), [styles.tag]);

  const keyExtractorCategory = useCallback((item: string, index: number) => index.toString(), []);

  return (
    <View style={styles.itemArea}>
      <View style={styles.headerTask}>
        <Text style={styles.title}>{title}</Text>
        <AnimatedCheck
          isCompleted={isCompleted}
          onToggle={onToggleComplete}
          checkedImageSource={require('../../Assets/icons/checked-input.png')}
          uncheckedImageSource={require('../../Assets/icons/uncheck-input.png')}
        />
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={keyExtractorCategory}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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
