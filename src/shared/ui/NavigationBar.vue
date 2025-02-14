<script setup lang="ts">
import LogoutButton from './LogoutButton.vue';
</script>

<template>
  <nav class="py-5 px-4 flex flex-row items-center justify-center gap-4">
    <RouterLink to="/profile" active-class="text-teal-500">Мой профиль</RouterLink>
    <RouterLink to="/nearby-users" active-class="text-teal-500">Люди рядом</RouterLink>
    <LogoutButton />
  </nav>
</template>
