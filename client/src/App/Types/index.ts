import { Dispatch, SetStateAction } from 'react';

export interface UserData {
  username: string;
  profileImage: string;
  creationDate: Date;
}

export interface AuthData extends UserData {
  token: string;
}

export type AuthContextType = {
  authData: AuthData | undefined;
  setAuthData: Dispatch<SetStateAction<AuthData | undefined>>;
}
