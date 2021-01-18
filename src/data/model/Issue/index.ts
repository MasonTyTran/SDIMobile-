export type IssueListRequest = {
    user_id: string;
    organization_id: string;
    page_num: number,
    page_size: number
};
export type IssueListResponse = {
    Message: string;
    Code: number;
    Data: {
        total_records: number;
        incidents: Issue[];
    };
};

export interface Issue {
    "oid": number
    "vidagis_id": string
    "vidagis_tableid": string
    "vidagis_incident_name": string
    "vidagis_type_incident": string
    "vidagis_type_incident_name": string
    "vidagis_incurred_incident": string
    "vidagis_handling_incident"?: any
    "vidagis_reason_incident"?: any
    "vidagis_notes"?: any
    "vidagis_userid"?: any
    "vidagis_organnizationid"?: string
    "vidagis_organizationcompanyid"?: any
    "vidagis_createdate"?: any
    "vidagis_modifieddate"?: any
    "vidagis_status": string
    "vidagis_is_use": boolean
    "vidagis_is_delete": boolean
    "vidagis_incident_id": string
    "project_id"?: any
    "project_name"?: any
    "vidagis_images"?: any
    "vidagis_path_image"?: any
    "vidagis_list_path_image"?: any
    "size_width": number
    "size_height": number
    "layer_id"?: any
    "geo_type": "point",
    "incurred_incident_str": string
    "handling_incident_str": string
    "reason_incident_sub"?: any
    "vidagis_name"?: any
    "geom"?: any
    "vidagis_warning_id"?: any
    "project_status"?: any
}