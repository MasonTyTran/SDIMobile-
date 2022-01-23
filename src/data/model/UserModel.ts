import {User} from '@domain';

export interface UserModel {
  vidagis_userid: string;
  vidagis_organizationid: string;
  vidagis_organizationid_current: string;
  vidagis_organizationcompanyid: string;
  vidagis_displayname: string;
  vidagis_emailaddress: string;
  vidagis_username: string;
  vidagis_password: string;
  vidagis_branch_id: string;
  vidagis_language_id: string;
  role_ids: string[];
  permission_ids: string[];
  vidagis_image: string;
}

export function parseUserModel(model: UserModel): User {
  const user: User = {
    id: model.vidagis_userid,
    organizationID: model.vidagis_organizationid,
    currentOrganizationId: model.vidagis_organizationid_current,
    organizationCompanyID: model.vidagis_organizationcompanyid,
    displayName: model.vidagis_displayname,
    email: model.vidagis_emailaddress,
    username: model.vidagis_username,
    password: model.vidagis_password,
    branchID: model.vidagis_branch_id,
    languageID: model.vidagis_language_id,
    roleIDs: model.role_ids,
    permissionIDs: model.permission_ids,
    image: model.vidagis_image,
  };
  return user;
}
