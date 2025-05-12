import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.modalBackground,
  },
});

export default getStyles;
