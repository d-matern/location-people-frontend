<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth/store';
import { useLocationStore } from '@/stores/location/store';
import { socket } from '@/socket';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { nearbyUsers } = storeToRefs(useLocationStore());
const { connectSocket, disconnectSocket, bindEvents } = useLocationStore();

socket.off(); // удалить все существующие прослушиватели (в случае горячей перезагрузки)
bindEvents();

onMounted(() => {
  connectSocket();
});
onUnmounted(() => {
  disconnectSocket();
});
</script>

<template>
  <div class="p-5">
    <h3>Ближайшие пользователи в радиусе 500км:</h3>

    <ul>
      <li v-for="user in nearbyUsers" :key="user.id" class="p-3 rounded-sm shadow">
        <div v-if="user.isOnline" class="text-teal-600">
          <b>Онлайн</b>
        </div>
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
