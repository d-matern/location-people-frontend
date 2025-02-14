import { socket, type NearbyUser } from '@/shared/api';

export const subscribeToNearbyUsers = (callback: (data: NearbyUser[]) => void) => {
  socket.on('nearbyUsers', callback);

  return () => {
    socket.emit('unsubscribeNearbyUsers'); // отписка
  };
};
