import { defineStore } from 'pinia';
import { ref } from 'vue';

import { socket } from '@/shared/api/socket';
import type { NearbyUser } from '@/shared/api';
import type { UserLocationDto } from './user.location.dto';

export const useNearbyUsersStore = defineStore('useNearbyUsersStore', () => {
  const nearbyUsers = ref<NearbyUser[]>([]);
  const watchPositionId = ref<number | null>(null);
  const RADIUS = 500000; // радиус поиска в м

  const setNearbyUsers = (data: NearbyUser[]) => {
    nearbyUsers.value = data;
  };

  const updateLocation = (currentUserId: number, callback: (payload: UserLocationDto) => void) => {
    if (!navigator.geolocation) {
      console.log('Нет navigator.geolocation');
      return;
    }

    watchPositionId.value = navigator.geolocation.watchPosition(
      ({ coords }) => {
        if (socket.id) {
          callback({
            userId: currentUserId,
            lat: coords.latitude,
            lng: coords.longitude,
            radius: RADIUS,
          });
        }
      },
      (error) => console.error('Ошибка геолокации', error),
      { enableHighAccuracy: true },
    );
  };

  const clearWatchPosition = () => {
    if (watchPositionId.value) {
      navigator.geolocation.clearWatch(watchPositionId.value);
      watchPositionId.value = null;
    }
  };

  return {
    nearbyUsers,
    setNearbyUsers,
    updateLocation,
    clearWatchPosition,
  };
});
