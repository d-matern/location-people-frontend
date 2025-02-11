<script setup lang="ts">
import { useAuthStore } from '@/stores/auth/store';
import { useLocationStore } from '@/stores/location/store';

const authStore = useAuthStore();
const locationStore = useLocationStore();
</script>

<template>
  <div class="p-5">
    <h3>Ближайшие пользователи в радиусе 500км:</h3>

    <ul>
      <li v-for="user in locationStore.nearbyUsers" :key="user.id" class="p-3 rounded-sm shadow">
        <div><b>username:</b> {{ user.username }}</div>
        <div><b>Имя:</b> {{ user.firstName }}</div>
        <div><b>Фамилия:</b> {{ user.lastName }}</div>
        <div><b>Пол:</b> {{ user.gender === 'male' ? 'Мужской' : 'Женский' }}</div>
        <div><b>Возраст:</b> {{ user.age }}</div>
        <div><b>Расстояние:</b> {{ user.distance.toFixed(2) }} м</div>
        <div>
          <b>Местоположение:</b>
          <a
            :href="`https://yandex.by/maps/?ll=${authStore.user?.lng}%2C${authStore.user?.lat}&mode=routes&rtext=${authStore.user?.lat}%2C${authStore.user?.lng}~${user.lat}%2C${user.lng}&rtt=auto&ruri=~&z=10`"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yandex карты
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
