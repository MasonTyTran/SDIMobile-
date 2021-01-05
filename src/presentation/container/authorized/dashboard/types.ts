import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type DashboardNavigationProps = DrawerScreenProps<
  AuthorizedStoryboardParamList,
  'Dashboard'
>;

export type DashboardRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'Dashboard'
>;

export type DashboardProps = DashboardNavigationProps;
