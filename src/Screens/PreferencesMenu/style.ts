import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';

const styles = (theme: any) => StyleSheet.create({
    container: {
        paddingHorizontal: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 30,


    },
    textPreferences: {
        ...Fonts.Roboto40016,
        color: theme.text,


    },
});

export default styles;
