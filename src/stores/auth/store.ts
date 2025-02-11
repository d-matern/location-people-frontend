import axiosInstance from '@/api';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { UserDto } from './user.dto';
import type { RegisterDto } from './register.dto';

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(localStorage.getItem('token'));
  const user = ref<UserDto | null>(null);

  const isAuth = computed(() => !!token.value);

  const register = async (payload: RegisterDto) => {
    await axiosInstance.post('/auth/register', payload);
  };

  const login = async (username: string, password: string) => {
    const { data } = await axiosInstance.post('/auth/login', { username, password });
    localStorage.setItem('token', data.token);
    token.value = data.token;
    await fetchUser();
  };

  const fetchUser = async () => {
    if (!token.value) {
      return;
    }

    try {
      const { data } = await axiosInstance.get('/users/profile', {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      user.value = data;
    } catch {
      logout();
    }
  };

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
  }

  function isLoggedIn() {
    return isAuth.value;
  }

  return {
    user,
    token,
    isAuth,
    register,
    login,
    fetchUser,
    logout,
    isLoggedIn,
  };
});
