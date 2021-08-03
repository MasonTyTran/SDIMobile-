import {WOProject, Asset} from '@data';
export type TaskState = 'INIT' | 'PROGRESS' | 'COMPLETED' | 'OVERDUE';

export type AuthorizedStoryboardParamList = {
  Dashboard: undefined;
  TaskList: undefined;
  IssueMap: undefined;
  IssueList: {id: string; tableId: string};
  IssueSearchResult: undefined;
  TaskDetail: {project: WOProject};
  AssetDetail: {asset: Asset};
  AssetList: undefined;
  AssetMap: undefined;
  NotificationList: undefined;
};
