<script setup lang="ts">
import type { NearbyUser } from '@/shared/api';
import type { UserCoords } from '../models/user.coords.type';
defineProps<{
  nearbyUser: NearbyUser;
  currentUserPosition: UserCoords;
}>();
</script>

<template>
  <div class="p-3 rounded-sm shadow">
    <div v-if="nearbyUser.isOnline" class="text-teal-600">
      <b>Онлайн</b>
    </div>
    <div><b>username:</b> {{ nearbyUser.username }}</div>
    <div><b>Имя:</b> {{ nearbyUser.firstName }}</div>
    <div><b>Фамилия:</b> {{ nearbyUser.lastName }}</div>
    <div><b>Пол:</b> {{ nearbyUser.gender === 'male' ? 'Мужской' : 'Женский' }}</div>
    <div><b>Возраст:</b> {{ nearbyUser.age }}</div>
    <div><b>Расстояние:</b> {{ nearbyUser.distance.toFixed(2) }} м</div>
    <div>
      <b>Местоположение:</b>
      <a
        :href="`https://yandex.by/maps/?ll=${currentUserPosition.lng}%2C${currentUserPosition.lat}&mode=routes&rtext=${currentUserPosition.lat}%2C${currentUserPosition.lng}~${nearbyUser.lat}%2C${nearbyUser.lng}&rtt=auto&ruri=~&z=10`"
        target="_blank"
        rel="noopener noreferrer"
      >
        Yandex карты
      </a>
    </div>
  </div>
</template>
