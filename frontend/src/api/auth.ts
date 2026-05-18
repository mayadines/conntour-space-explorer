import axios from 'axios';

export interface User {
  id: number;
  user_name: string;
}

export const login = async (userName: string, password: string): Promise<string> => {
  const { data } = await axios.post<{ access_token: string }>('/api/auth/login', {
    user_name: userName,
    user_password: password,
  });
  localStorage.setItem('access_token', data.access_token);
  return data.access_token;
};

export const register = async (userName: string, password: string): Promise<User> => {
  const { data } = await axios.post<User>('/api/users', {
    user_name: userName,
    user_password: password,
  });
  return data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
};
