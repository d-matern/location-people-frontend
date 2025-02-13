export interface LocationDto {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
  age: number;
  lat: number;
  lng: number;
  distance: number;
  isOnline: boolean;
  avatar: string | null;
  vk: string | null;
  instagram: string | null;
  telegram: string | null;
}
