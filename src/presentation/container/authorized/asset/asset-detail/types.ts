import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {WOProject, Asset} from '@data';

export type AssetDetailNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<AuthorizedStoryboardParamList, 'AssetDetail'>,
  StackNavigationProp<AuthorizedStoryboardParamList, 'AssetDetail'>
>;

export type AssetDetailRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'AssetDetail'
>;

export type AssetDetailProps = {
  navigation: AssetDetailNavigationProps;
  route: AssetDetailRouteProp;
};
export type AssetInfoProps = {item: Asset};
export type AssetIssueProps = {item: Asset};
