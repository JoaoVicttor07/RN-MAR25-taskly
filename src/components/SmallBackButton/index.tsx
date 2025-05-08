import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface SmallBackButtonProps {
    onPress?: () => void;
}

const SmallBackButton: React.FC<SmallBackButtonProps> = ({ onPress }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image source={require('../../Assets/icons/VectorBack.png')} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: '#AAAAAA',
        padding: 15.37,
        borderRadius: 12,
        maxWidth: 48,
    },
});

export default SmallBackButton;