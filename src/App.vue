<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth/store';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
  authStore.fetchUser();
});
</script>

<template>
  <RouterView />
</template>
