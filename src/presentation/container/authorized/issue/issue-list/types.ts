import { RouteProp } from '@react-navigation/native';

import { AuthorizedStoryboardParamList } from '@storyboards';
import { DrawerScreenProps } from '@react-navigation/drawer';

export type IssueListNavigationProps = DrawerScreenProps<
  AuthorizedStoryboardParamList,
  'IssueList'
>;

export type IssueListRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'IssueList'
>;

export type IssueListProps = IssueListNavigationProps;
