import { TouchableOpacity, Text, View, TextStyle, DimensionValue } from "react-native";
import styles from "./style";

interface ButtonProps {
    title?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    textColor?: string;
    width?: DimensionValue;
    height?: DimensionValue;
    fontFamily?: string;
    fontWeight?: TextStyle["fontWeight"];
    onPress?: () => void;
}

export default function Button({
    title,
    backgroundColor = "#5B3CC4",
    borderColor = "#5B3CC4",
    borderWidth = 0,
    textColor = "#FFFFFF",
    width = 300,
    height = 50,
    fontFamily,
    fontWeight = 'bold',
    onPress
}: ButtonProps) {
    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor, borderColor, borderWidth, width, height }
                ]}
                onPress={onPress}
            >
                <Text style={[styles.text, { color: textColor, fontFamily, fontWeight }]}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}