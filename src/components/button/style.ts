import { StyleSheet } from "react-native";
import Fonts from '../../theme/Font';

const styles = StyleSheet.create({
    button: {
        width:329,
        height: 47,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#FFFFFF',
        ...Fonts.Roboto600,
    }
})

export default styles