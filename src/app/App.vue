<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onBeforeMount } from 'vue';
import NavigationBar from '@/shared/ui/NavigationBar.vue';
import { useAuthStore } from '@/shared/models';
import { useUserStore } from '@/shared/models/useUserStore';
import { fetchCurrentUser, logout } from '@/shared/api';

const authStore = useAuthStore();
const userStore = useUserStore();

onBeforeMount(async () => {
  if (authStore.isAuth) {
    const responseCurrentUser = await fetchCurrentUser();
    if (responseCurrentUser.error) {
      logout();
      authStore.logout();
      userStore.setCurrentUser(null);
    }

    if (responseCurrentUser.success) {
      authStore.setAuth();
      userStore.setCurrentUser(responseCurrentUser.success);
    }
  }
});
</script>

<template>
  <NavigationBar v-if="authStore.isLoggedIn()" />
  <RouterView />
</template>
