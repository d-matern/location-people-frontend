import axiosInstance from '@/api';
import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(localStorage.getItem('token'));
  const user = ref<{ id: number; username: string; age: number } | null>(null);

  const isAuth = computed(() => !!token.value);

  const register = async (username: string, password: string, age: number) => {
    await axiosInstance.post('/auth/register', { username, password, age });
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

  onMounted(() => {
    if (token.value) {
      fetchUser();
    }
  });

  return {
    user,
    token,
    isAuth,
    register,
    login,
    fetchUser,
    logout,
  };
});
