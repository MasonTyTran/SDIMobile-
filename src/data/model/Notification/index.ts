export interface Notification {
  message: string;
  createdate: Date;
  organization_id?: any;
  notifications_id: string;
  from_user: string;
  avatar_user: string;
  is_clicked: boolean;
  type: 'project' | 'asset' | 'ticket';
  code: string;
}

export interface NotificationListResponse {
  Data: {
    total_records: number;
    notifications: Notification[];
  };
}
