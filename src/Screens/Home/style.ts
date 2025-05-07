import {StyleSheet} from 'react-native';

import Fonts from '../../Theme/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    width: 329,
  },
  title: {
    ...Fonts.Roboto70024,
    color: '#000',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  containerNoTask: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  taskListContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#5B3CC4',
    borderRadius: 8,
    alignItems: 'center',
    width: 329,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
