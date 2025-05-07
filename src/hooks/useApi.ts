//useApi.ts

import axios from 'axios';

import {API_BASE_URL} from '../env';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUser = async (data: {
  email: string;
  password: string;
  name: string;
  phone_number: string;
}) => {
  return api.post('/auth/register', data);
};

export default api;
