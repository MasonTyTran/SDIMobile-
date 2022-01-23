export interface User {
  id: string;
  organizationID: string;
  currentOrganizationId: string | null;
  organizationCompanyID: string | null;
  displayName: string;
  email: string;
  username: string;
  password: string | null;
  branchID: string | null;
  languageID: string;
  roleIDs: string[] | null;
  permissionIDs: string[] | null;
  image?: string;
}
