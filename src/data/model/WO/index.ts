export type WOListRequest = {
  page_num: number;
  page_size: number;
  user_id: string;
  organization_id: string;
  keyword: string;
};
export type WOListResponse = {
  Message: string;
  Code: number;
  Data: {
    total_records: number;
    projects: WOProject[];
  };
};

export interface WOProject {
  oid: number;
  is_back_forward: boolean;
  is_complete: boolean;
  is_forward: boolean;
  is_update: boolean;
  total_records: number;
  total_ticket: number;
  total_ticket_complete: number;
  vidagis_name: string;
  vidagis_leader_id: string;
  vidagis_is_delete: boolean;
  vidagis_is_use: boolean;
  vidagis_code?: any;
  vidagis_startdate: Date;
  vidagis_enddate: Date;
  vidagis_bussinesssequence_id?: any;
  vidagis_register_group_id?: any;
  vidagis_status: number;
  vidagis_list_asset?: any;
  vidagis_user_rating?: any;
  vidagis_name_user_rating?: any;
  vidagis_list_user_rating?: any;
  vidagis_project_id: string;
  vidagis_project_end_time?: any;
  vidagis_project_total_time?: any;
  vidagis_avatar?: any;
  vidagis_path_avatar?: any;
  vidagis_bussinesssequence_name: string;
  vidagis_prioritize: number;
  vidagis_value_prioritize?: any;
  leader_name: string;
  step_name?: any;
  step_id?: any;
  check_user_id: boolean;
  vidagis_modifydate: Date;
  vidagis_organizationid?: any;
  vidagis_process?: any;
  vidagis_project_rating?: any;
  vidagis_project_type?: any;
  vidagis_rating_content?: any;
  vidagis_rating_file?: any;
  vidagis_link_id?: any;
  vidagis_scheme_id?: any;
  vidagis_startdate_str: string;
  vidagis_enddate_str: string;
  vidagis_status_des: string;
  vidagis_project_end_time_str: string;
  vidagis_prioritize_des: string;
  vidagis_size_width: number;
  vidagis_size_height: number;
  lst_user_rating?: any;
  vidagis_description?: any;
}

export interface WOStepRequest {
  project_id: string;
  user_id: string;
  project_datestart: string;
  project_dateend: string;
  total_time: number;
  organization_id: string;
}

export interface WOCompletedRequest {
  project_id: string;
  user_id: string;
  project_end_time: string;
  total_time: number;
  organization_id: string;
}
export interface PostResponse {
  Message: string;
  Code: number;
  Data?: any;
}
