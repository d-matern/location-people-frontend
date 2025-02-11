<script setup lang="ts">
import { useAuthStore } from '@/stores/auth/store';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<template>
  <button class="ml-3" @click="handleLogout">Выход</button>
</template>
