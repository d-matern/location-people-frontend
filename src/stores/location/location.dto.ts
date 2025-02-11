export interface LocationDto {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
  age: number;
  lat: number;
  lng: number;
  distance: number;
  avatar: string | null;
  vk: string | null;
  instagram: string | null;
  telegram: string | null;
}
