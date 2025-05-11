import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';


const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        backgroundColor: theme.background,
        flex: 1,
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

export default getStyles;
