<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue';
import { socket } from '@/shared/api/socket';
import NearbyUserPreview from './NearbyUserPreview.vue';
import { useNearbyUsersStore } from '../models/useNearbyUsersStore';
import { emitUpdateUserLocation } from '../api/emitUpdateUserLocation';
import { subscribeToNearbyUsers } from '../api/subscribeToNearbyUsers';
import { useUserStore } from '@/shared/models/useUserStore';

const userStore = useUserStore();
const nearbyUsersStore = useNearbyUsersStore();

watch(
  [() => userStore.currentUser, () => socket.connected],
  ([user, socketConnected]) => {
    if (user && socketConnected) {
      nearbyUsersStore.updateLocation(user.id, emitUpdateUserLocation);
    }
  },
  { immediate: true },
);

onMounted(() => {
  const unSubscribe = subscribeToNearbyUsers((data) => {
    nearbyUsersStore.setNearbyUsers(data);
  });

  onBeforeUnmount(() => {
    unSubscribe();
    nearbyUsersStore.clearWatchPosition();
  });
});
</script>

<template>
  <main class="p-5">
    <h3>Ближайшие пользователи в радиусе 500км:</h3>

    <ul v-if="userStore.currentUser">
      <li v-for="user in nearbyUsersStore.nearbyUsers" :key="user.id">
        <NearbyUserPreview
          :nearby-user="user"
          :current-user-position="{
            lat: userStore.currentUser.lat,
            lng: userStore.currentUser.lng,
          }"
        />
      </li>
    </ul>
  </main>
</template>
