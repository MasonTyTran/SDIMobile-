export interface ListAssetRequest {
  page_num: number;
  page_size: number;
  user_id: string;
  organization_id: string;
  keyword: string;
}
export interface Asset {
  gid: string;
  id: string;
  tableid: string;
  tableasset: string;
  type_geom: string;
  geom: string;
  datajson: string;
  fielddisplay: string;
  num_childnodes: number;
  total_record: number;
  is_asset: boolean;
  is_f: boolean;
  is_unlock: boolean;
  parent_id?: any;
  table_name?: any;
}

export interface ListAssetResponse {
  Message: string;
  Code: number;
  Data: {
    total_records: number;
    assets: Asset[];
  };
}
export interface AssetDataObject {
  name: string;
  type: number;
  value: string;
}
