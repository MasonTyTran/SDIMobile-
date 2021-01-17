import {WOProject, Asset} from '@data';

export type AuthorizedStoryboardParamList = {
  Dashboard: undefined;
  TaskList: undefined;
  IssueMap: undefined;
  TaskDetail: {project: WOProject};
  AssetDetail: {asset: Asset};
  AssetList: undefined;
  AssetMap: undefined;
};
