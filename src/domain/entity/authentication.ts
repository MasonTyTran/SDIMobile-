import {User} from './User';

export interface SignInResult {
  token: string;
  user: User;
  fromLocal: boolean;
}

export interface Credential {
  username: string;
  password: string;
}
