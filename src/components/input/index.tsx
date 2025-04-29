import { View, TextInput, Text } from "react-native";
import styles from "./style";

export default function Input() {
    return (
        <View style={styles.container}>
            <Text>texto</Text>
            <TextInput style={styles.input} 
                placeholder="Digite seu e-mail"
            />
            <Text style={styles.erro}>Error aqui</Text>
        </View>
    )
}