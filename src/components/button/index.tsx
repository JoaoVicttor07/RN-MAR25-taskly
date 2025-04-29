import { TouchableOpacity, Text, View } from "react-native";
import styles from "./style";

interface ButtonProps {
    title?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    textColor?: string;
    onPress?: () => void;
}

export default function Button({
    title,
    backgroundColor = "#5B3CC4",
    borderColor = "#5B3CC4",
    borderWidth = 0,
    textColor = "#FFFFFF",
    onPress
}: ButtonProps) {
    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor, borderColor, borderWidth }
                ]}
                onPress={onPress}
            >
                <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}