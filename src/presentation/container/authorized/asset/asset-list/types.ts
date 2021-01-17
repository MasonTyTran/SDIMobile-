import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type AssetListNavigationProps = DrawerScreenProps<
  AuthorizedStoryboardParamList,
  'AssetList'
>;

export type AssetListRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'AssetList'
>;

export type AssetListProps = AssetListNavigationProps;
