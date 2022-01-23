import {UserModel} from './UserModel';

export interface SignInRequestData {
  vidagis_uid_emailaddress: string;
  vidagis_password: string;
  vidagis_org_id: string;
}

export interface SignInResponseData {
  access_token: string;
  user: UserModel;
}
export interface SignUpResponseData {}

export interface Organization {
  vidagis_organizationid: string;
  vidagis_organizationname: string;
  vidagis_url_map_mobile: string;
}
export interface GetOrganizationTypeResponse {
  Message: string;
  Code: number;
  Data: Organization[];
}
export interface GetOrganizationInfoResponse {
  Message: string;
  Code: number;
  Data: Organization;
}
export interface OrgPermission {
  vidagis_organizationid: string;
  job_order: string;
  asset: string;
  map: string;
}
export interface GetPermissionResponse {
  Message: string;
  Code: number;
  Data: OrgPermission[];
}
