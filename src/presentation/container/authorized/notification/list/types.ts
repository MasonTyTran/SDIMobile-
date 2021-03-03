import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type NotificationListNavigationProps = DrawerScreenProps<
  AuthorizedStoryboardParamList,
  'NotificationList'
>;

export type NotificationListRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'NotificationList'
>;

export type NotificationListProps = NotificationListNavigationProps;
