import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';

const styles = (theme: any) => StyleSheet.create({
    container: {
        padding: 30,
        flex: 1, // Adicione flex: 1 para que a tela ocupe todo o espaço
        backgroundColor: theme.background, // Cor de fundo themable
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
