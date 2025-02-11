import { defineStore } from 'pinia';
import { useAuthStore } from '../auth/store';
import { onMounted, onUnmounted, ref } from 'vue';
import { io, Socket } from 'socket.io-client';
import type { LocationDto } from './location.dto';

interface Position {
  lat: number;
  lng: number;
}

export const useLocationStore = defineStore('locationStore', () => {
  const auth = useAuthStore();
  const position = ref<Position | null>(null);
  const nearbyUsers = ref<LocationDto[]>([]);
  const socket = ref<Socket | null>(null);
  const RADIUS = 500000; // радиус поиска в м

  const updateLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        position.value = { lat: coords.latitude, lng: coords.latitude };

        if (socket.value && auth.user) {
          console.log('Обновил геолокацию', coords.latitude, coords.longitude);

          socket.value.emit('updateLocation', {
            userId: auth.user.id,
            lat: coords.latitude,
            lng: coords.longitude,
          });
        }
      },
      (error) => console.error('Ошибка геолокации', error),
      { enableHighAccuracy: true },
    );
  };

  const connectSocket = () => {
    if (!auth.isAuth) {
      console.log('Не аутентифицирован');
      return;
    }

    socket.value = io(import.meta.env.VITE_APP_BASE_URL_WS);

    socket.value.on('connect', () => {
      console.log('Connected');

      if (auth.user?.id) {
        socket.value?.emit(
          'nearbyUsers',
          { userId: auth.user.id, radius: RADIUS },
          (response: LocationDto[]) => {
            console.log(response);
            nearbyUsers.value = response;
          },
        );
      }
    });

    setInterval(updateLocation, 5000);
  };

  onMounted(() => {
    connectSocket();
  });

  onUnmounted(() => {
    if (socket.value) {
      socket.value.disconnect();
    }
  });

  return {
    position,
    nearbyUsers,
  };
});
