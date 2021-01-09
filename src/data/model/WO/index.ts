export type InProgressWOListRequest = {
  page_num: number;
  page_size: number;
  user_id: string;
  organization_id: string;
  keyword: string;
};
export type InProgressWOListResponse = {
  Message: string;
  Code: number;
  Data: {
    total_records: number;
    projects: any[];
  };
};
