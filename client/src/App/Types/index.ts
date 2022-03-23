import { Dispatch, SetStateAction } from 'react';

export interface AuthFormSchema {
  username: string;
  password: string;
  profileImage?: File;
}

export interface UserData {
  _id: string;
  username: string;
  profileImage: string;
  creationDate: string;
}

export interface AuthData extends UserData {
  token: string;
}

export interface AuthResponse {
  user: UserData;
  token: string;
}
export interface VerifyTokenResponse {
  data: UserData;
  iat: number;
  exp: number;
}

export type AuthContextType = {
  authData: AuthData | undefined;
  setAuthData: Dispatch<SetStateAction<AuthData | undefined>>;
}
