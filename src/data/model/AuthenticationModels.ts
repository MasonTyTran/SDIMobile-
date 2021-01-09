import {UserModel} from './UserModel';

export interface SignInRequestData {
  vidagis_uid_emailaddress: string;
  vidagis_password: string;
  vidagis_branch_id: string;
}

export interface SignInResponseData {
  access_token: string;
  user: UserModel;
}
export interface SignUpResponseData {}
