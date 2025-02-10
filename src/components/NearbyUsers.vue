<script setup lang="ts">
import { useLocationStore } from '@/stores/location/store';

const locationStore = useLocationStore();
</script>

<template>
  <div>
    <h3>Ближайшие пользователи в радиусе 5км:</h3>

    <ul>
      <li v-for="user in locationStore.nearbyUsers" :key="user.id">
        <strong>username:</strong> {{ user.username }} <strong>age:</strong> {{ user.age }}
        <strong>location:</strong> ({{ user.lat.toFixed(4) }}, {{ user.lng.toFixed(4) }})
      </li>
    </ul>
  </div>
</template>
