import { TouchableOpacity, Text, View } from "react-native";

import styles from "./style";

export default function Button() {
    return (
        <View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}