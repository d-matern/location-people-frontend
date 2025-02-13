<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth/store';
import { onBeforeMount } from 'vue';

const authStore = useAuthStore();

onBeforeMount(() => {
  authStore.fetchUser();
});
</script>

<template>
  <RouterView />
</template>
