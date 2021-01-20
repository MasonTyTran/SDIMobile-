import { RouteProp } from '@react-navigation/native';

import { AuthorizedStoryboardParamList } from '@storyboards';
import { DrawerScreenProps } from '@react-navigation/drawer';

export type IssueSearchResultNavigationProps = DrawerScreenProps<
    AuthorizedStoryboardParamList,
    'IssueSearchResult'
>;

export type IssueSearchResultRouteProp = RouteProp<
    AuthorizedStoryboardParamList,
    'IssueSearchResult'
>;

export type IssueSearchResultProps = IssueSearchResultNavigationProps;
