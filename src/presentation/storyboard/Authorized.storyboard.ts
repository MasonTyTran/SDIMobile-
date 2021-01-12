import {WOProject} from '@data';

export type AuthorizedStoryboardParamList = {
  Dashboard: undefined;
  TaskList: undefined;
  IssueMap: undefined;
  TaskDetail: {project: WOProject};
};
