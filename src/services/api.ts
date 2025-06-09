import axios from 'axios';
import { getToken } from '../Utils/authUtils';

const API_BASE_URL = 'http://3.144.143.20:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async config => {
  if (config.url === '/auth/register') {
    return config;
  }

  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;