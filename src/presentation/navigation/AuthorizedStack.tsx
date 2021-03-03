import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AuthorizedStoryboardParamList } from '../storyboard/Authorized.storyboard';
import {
  AssetDetail,
  AssetList,
  AssetMap,
  Dashboard,
  IssueList,
  IssueMap,
  IssueSearchResult,
  TaskDetail,
  TaskList,
} from '@containers';
import { NotificationList } from '../container/authorized/notification';

const Stack = createStackNavigator<AuthorizedStoryboardParamList>();

export const AuthorizedNavigator: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="TaskList" component={TaskList} />
      <Stack.Screen name="IssueMap" component={IssueMap} />
      <Stack.Screen name="IssueList" component={IssueList} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
      <Stack.Screen name="AssetMap" component={AssetMap} />
      <Stack.Screen name="AssetList" component={AssetList} />
      <Stack.Screen name="IssueSearchResult" component={IssueSearchResult} />
      <Stack.Screen name="AssetDetail" component={AssetDetail} />
      <Stack.Screen name="NotificationList" component={NotificationList} />
    </Stack.Navigator>
  );
};
