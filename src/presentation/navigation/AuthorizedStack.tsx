import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {AuthorizedStoryboardParamList} from '../storyboard/Authorized.storyboard';
import {Dashboard, IssueMap, TaskList} from '@containers';

const Stack = createStackNavigator<AuthorizedStoryboardParamList>();

export const AuthorizedNavigator: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="TaskList" component={TaskList} />
      <Stack.Screen name="IssueMap" component={IssueMap} />
    </Stack.Navigator>
  );
};
