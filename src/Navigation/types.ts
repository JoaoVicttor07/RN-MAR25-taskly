import {RouteProp} from '@react-navigation/native';
import {Task} from '../interfaces/task';

export type RootStackParamList = {
  InitialScreen: undefined;
  Home: undefined;
  Register: undefined;
  Menu: undefined;
  Regulamentos: undefined;
  AvatarSelector: {isEditing: boolean} | undefined;
  PreferencesMenu: undefined;
  EditPersonalInfo: undefined;
  Login: undefined;
  MainApp: undefined;
  TaskDetails: {
    task: Task;
  };
};

export type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;
