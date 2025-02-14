import { io } from 'socket.io-client';
import { backendBaseWsDevUrl } from '../config';

const URL = import.meta.env.PROD ? undefined : backendBaseWsDevUrl;

export const socket = io(URL);
