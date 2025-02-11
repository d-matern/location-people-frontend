<script setup lang="ts">
import NearbyUsers from '@/components/NearbyUsers.vue';
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/profile">Мой профиль</RouterLink>
    </nav>
  </header>

  <NearbyUsers />
</template>
