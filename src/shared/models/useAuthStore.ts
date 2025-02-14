import { getAccesToken } from '@/shared/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('authStore', () => {
  const isAuth = ref(!!getAccesToken());
  const serverError = ref<string | null>(null);

  const setAuth = () => {
    isAuth.value = true;
  };

  const setServerError = (error: string | null) => {
    serverError.value = error;
  };

  function logout() {
    isAuth.value = false;
  }

  function isLoggedIn() {
    return isAuth.value;
  }

  return {
    isAuth,
    serverError,
    setAuth,
    setServerError,
    logout,
    isLoggedIn,
  };
});
