// src/components/TaskItem/styles.ts
import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';

export const styles = StyleSheet.create({
  itemArea: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 12,
    marginVertical: 8,
  },
  headerTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...Fonts.Roboto60020,
  },
  description: {
    ...Fonts.Roboto40016,
  },
  categoriesContainer: {

  },
  carousel: {
    flexDirection: 'row',
    gap: 12,
  },
  tag: {
    backgroundColor: '#E6E0F7',
    ...Fonts.Roboto40012,
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