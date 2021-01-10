import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type IssueMapNavigationProps = DrawerScreenProps<
  AuthorizedStoryboardParamList,
  'IssueMap'
>;

export type IssueMapRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'IssueMap'
>;

export type IssueMapProps = IssueMapNavigationProps;
