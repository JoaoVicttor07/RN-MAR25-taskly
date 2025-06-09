import api from './api';

export const createTask = async (taskData: {
  title: string;
  description?: string;
  done: boolean;
  deadline?: string | null;
  priority?: number;
  subtasks?: {title: string; done: boolean}[];
  tags?: string[];
}) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    deadline?: string;
    priority?: number;
    done?: boolean;
    subtasks?: {title: string; done: boolean}[];
    tags?: string[];
  },
) => {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
};

export const fetchTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};
