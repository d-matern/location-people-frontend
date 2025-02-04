import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('authStore', () => {
  const isAuth = ref(false);

  function login() {
    isAuth.value = true;
  }

  function logout() {
    isAuth.value = false;
  }

  return {
    isAuth,
    login,
    logout,
  };
});
