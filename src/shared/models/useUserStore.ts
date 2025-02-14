import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../api';

export const useUserStore = defineStore('userStore', () => {
  const currentUser = ref<User | null>(null);

  const setCurrentUser = (data: User | null) => {
    currentUser.value = data;
  };

  return {
    currentUser,
    setCurrentUser,
  };
});
