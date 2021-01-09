import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type TaskListNavigationProps = DrawerScreenProps<
  AuthorizedStoryboardParamList,
  'TaskList'
>;

export type TaskListRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'TaskList'
>;

export type TaskListProps = TaskListNavigationProps;
