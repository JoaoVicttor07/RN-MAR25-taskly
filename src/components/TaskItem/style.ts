import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
  itemArea: {
    backgroundColor: theme.card,
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 12,
    marginVertical: 8,
    width: 342,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  headerTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...Fonts.Roboto60020,
    color: theme.text,
  },
  description: {
    ...Fonts.Roboto40016,
    color: theme.text,
  },
  categoriesContainer: {},
  carousel: {
    flexDirection: 'row',
    gap: 12,
  },
  tag: {
    backgroundColor: theme.tagTask,
    ...Fonts.Roboto40012,
    color: theme.text,
    padding: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  areaButton: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5B3CC4',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: 127,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    ...Fonts.Roboto40016,
  },
});

export default getStyles;

