import {StyleSheet} from 'react-native';

import Fonts from '../../Theme/fonts';

const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: 329,
  },
  title: {
    ...Fonts.Roboto70024,
    color: '#000',
    fontFamily: 'Arial',
  },
  avatar: {
    width: 50,
    height: 50,
  },

  containerNoTask: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    alignSelf: 'center',
  },

  smileSad: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },

  textNoTask: {
    color: '#AAAAAA',
    ...Fonts.Roboto40016, //importa todos argumentos de fonts
    marginBottom: 32,
  },

  button: {
    backgroundColor: '#5B3CC4',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: 329,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonNavigation: {
    backgroundColor: '#dd8880',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 100,
  },
  buttonTextNavigation: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default stylesHome;
