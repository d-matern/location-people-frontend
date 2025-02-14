<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../models';
import { logout } from '../api';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  logout();
  authStore.logout();
  router.push('/');
};
</script>

<template>
  <button class="ml-3" @click="handleLogout">Выход</button>
</template>
