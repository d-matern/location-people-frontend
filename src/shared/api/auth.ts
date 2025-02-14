import { AxiosError } from 'axios';
import axiosClient from './client';
import type { AuthResponse, SignInDto, SignUpDto } from './models';
import { socket } from './socket';

const TOKEN_KEY = 'token';

const setTokensToLocalStorage = (data: AuthResponse) => {
  localStorage.setItem(TOKEN_KEY, data.token);
};

export const getAccesToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const fetchSignUp = async (payload: SignUpDto) => {
  socket.disconnect();

  try {
    const { data } = await axiosClient.post<AuthResponse>('/auth/register', payload);
    setTokensToLocalStorage(data);
    socket.connect();
    return { success: data.token };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.message };
    }
    console.error('Ошибка регистрации:', error);
    return { error: 'Ошибка регистрации' };
  }
};

export const fetchSignIn = async (payload: SignInDto) => {
  socket.disconnect();

  try {
    const { data } = await axiosClient.post<AuthResponse>('/auth/login', payload);
    setTokensToLocalStorage(data);
    socket.connect();
    return { success: data.token };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.message };
    }
    console.error('Ошибка входа:', error);
    return { error: 'Ошибка входа' };
  }
};

export const logout = () => {
  socket.disconnect();
  localStorage.removeItem(TOKEN_KEY);
};
