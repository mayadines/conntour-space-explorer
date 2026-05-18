import axios from 'axios';
import { User } from '../types';

export const login = async (user_name: string, user_password: string): Promise<User> => {
  const { data } = await axios.post<User>('/api/auth/login', { user_name, user_password });
  return data;
};

export const register = async (user_name: string, user_password: string): Promise<User> => {
  const { data } = await axios.post<User>('/api/users', { user_name, user_password });
  return data;
};
