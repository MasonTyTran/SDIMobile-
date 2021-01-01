import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';

export type DashboardNavigationProps = StackNavigationProp<
  AuthorizedStoryboardParamList,
  'Dashboard'
>;

export type DashboardRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'Dashboard'
>;

export type DashboardProps = {
  navigation: DashboardNavigationProps;
  route: DashboardRouteProp;
};
