/**
 * Интерфейс, описывающий данные для передачи информации о локации пользователя,
 * а также userId и socketId для логики на backend
 */
export interface UserLocationDto {
  userId: number;
  lat: number;
  lng: number;
  radius: number;
}
