import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type AssetMapNavigationProps = DrawerScreenProps<
  AuthorizedStoryboardParamList,
  'AssetMap'
>;

export type AssetMapRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'AssetMap'
>;

export type AssetMapProps = AssetMapNavigationProps;
