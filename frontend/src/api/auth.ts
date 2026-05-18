import axios from 'axios';
import { User } from '../types';

export const login = async (user_name: string, user_password: string): Promise<string> => {
  const { data } = await axios.post<{ access_token: string }>('/api/auth/login', { user_name, user_password });
  localStorage.setItem('access_token', data.access_token);
  return data.access_token;
};

export const register = async (user_name: string, user_password: string): Promise<User> => {
  const { data } = await axios.post<User>('/api/users', { user_name, user_password });
  return data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
};
