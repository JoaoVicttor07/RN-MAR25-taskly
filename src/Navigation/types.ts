import { Task } from '../Screens/Home';

export type RootStackParamList = {
  InitialScreen: undefined;
  Home: undefined;
  Register: undefined;
  Menu: undefined;
  Regulamentos: undefined;
  AvatarSelector: { isEditing: boolean } | undefined;
  PreferencesMenu: undefined;
  EditPersonalInfo: undefined;
  Login: undefined;
  MainApp: undefined;
  TaskDetails: {
    task: Task;
    onTaskUpdated?: (updatedTask: Task) => void;
  };
};