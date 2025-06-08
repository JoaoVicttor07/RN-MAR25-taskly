import api from './api';

export const registerUser = async (data: {
  email: string;
  password: string;
  name: string;
  phone_number: string;
}) => {
  try {
    const response = await api.post('/auth/register', data);
    return response;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

export const loginUser = async (data: {email: string; password: string}) => {
  try {
    const response = await api.post('/auth/login', data);
    return response;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }
};

export const updateAvatar = async (avatar: string, token: string) => {
  return api.put(
    '/profile',
    { picture: avatar },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
};

export const getProfile = async (token: string) => {
  return api.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (
  data: { name: string; phone_number: string; picture: string },
  token: string
) => {
  return api.put(
    '/profile',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
};

export const deleteAccount = async (token: string) => {
  return api.delete('/profile/delete-account', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const refreshTokenRequest = async (refreshToken: string) => {
  return api.post('/refresh', { refreshToken });
};
