export interface SignInDto {
  username: string;
  password: string;
}

export interface SignUpDto extends SignInDto {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
}

export type AuthResponse = {
  token: string;
};

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
  age: number;
  lat: number;
  lng: number;
  isOnline: boolean;
  avatar: string | null;
  phone: string | null;
  vk: string | null;
  instagram: string | null;
  telegram: string | null;
}

export interface NearbyUser extends User {
  distance: number;
}
