import { AxiosError } from 'axios';
import axiosClient from './client';
import type { User } from './models';

export const fetchCurrentUser = async () => {
  try {
    const { data } = await axiosClient.get<User>('/users/profile');
    return { success: data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.message };
    }
    console.error('Ошибка получения текущего пользователя', error);
    return { error: 'Ошибка получения текущего пользователя' };
  }
};

export const fetchDeleteUser = async () => {
  try {
    const { data } = await axiosClient.delete('/users/profile');
    console.log(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      return { error: error.message };
    }
    console.error('Ошибка удаления аккаунта', error);
    return { error: 'Ошибка удаления аккаунта' };
  }
};
