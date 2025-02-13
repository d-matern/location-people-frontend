import { io } from 'socket.io-client';

const URL = import.meta.env.PROD ? undefined : import.meta.env.VITE_APP_BASE_URL_WS;

export const socket = io(URL);
