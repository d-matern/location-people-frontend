import { socket } from '@/shared/api';
import type { UserLocationDto } from '../models/user.location.dto';

export const emitUpdateUserLocation = (payload: UserLocationDto) => {
  socket.emit('updateLocation', payload);
};
