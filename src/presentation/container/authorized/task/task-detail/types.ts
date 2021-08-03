import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {WOProject} from '@data';

export type TaskDetailNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<AuthorizedStoryboardParamList, 'TaskDetail'>,
  StackNavigationProp<AuthorizedStoryboardParamList, 'TaskDetail'>
>;

export type TaskDetailRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'TaskDetail'
>;

export type TaskDetailProps = {
  navigation: TaskDetailNavigationProps;
  route: TaskDetailRouteProp;
};
export type TaskInfoProps = {item: WOProject};
export type TaskFeedBackProps = {item: WOProject};
