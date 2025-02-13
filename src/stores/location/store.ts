import { defineStore } from 'pinia';
import { useAuthStore } from '../auth/store';
import { ref } from 'vue';

import { socket } from '@/socket';

import type { LocationDto } from './location.dto';

export const useLocationStore = defineStore('locationStore', () => {
  const authStore = useAuthStore();
  const nearbyUsers = ref<LocationDto[]>([]);
  const watchGeolocationId = ref<number | null>(null);
  const RADIUS = 500000; // радиус поиска в м

  const clearWatchGeolocation = () => {
    if (watchGeolocationId.value) {
      navigator.geolocation.clearWatch(watchGeolocationId.value);
      watchGeolocationId.value = null;
    }
  };

  const updatePosition = () => {
    if (!navigator.geolocation) {
      console.log('Нет navigator.geolocation');
      return;
    }

    watchGeolocationId.value = navigator.geolocation.watchPosition(
      ({ coords }) => {
        if (socket.id && authStore.user) {
          socket.emit('updateLocation', {
            userId: authStore.user.id,
            lat: coords.latitude,
            lng: coords.longitude,
            radius: RADIUS,
            socketId: socket.id,
          });
        }
      },
      (error) => console.error('Ошибка геолокации', error),
      { enableHighAccuracy: true },
    );
  };

  const bindEvents = () => {
    socket.on('nearbyUsers', (response: LocationDto[]) => {
      nearbyUsers.value = response;
    });
  };

  const connectSocket = () => {
    socket.connect();
    socket.on('connect', () => {
      console.log('Connect ws');
      updatePosition();
    });
  };

  const disconnectSocket = () => {
    console.log('Disconnect ws');
    clearWatchGeolocation();
    socket.disconnect();
  };

  return {
    nearbyUsers,
    bindEvents,
    connectSocket,
    disconnectSocket,
  };
});
