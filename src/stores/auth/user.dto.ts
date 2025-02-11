export interface UserDto {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
  age: number;
  lat: number;
  lng: number;
  avatar: string | null;
  phone: string | null;
  vk: string | null;
  instagram: string | null;
  telegram: string | null;
}
