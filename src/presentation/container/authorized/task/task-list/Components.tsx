import React from 'react';

import {TaskListTab} from './TasklistTab';
import {WODataSource} from '@data';
import {AuthorizedStoryboardParamList} from '@storyboards';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {User} from '@domain';

export const OpenTab = ({
  navigation,
  user,
  setTotalRecord,
}: {
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'TaskList'>;
  user: User;
  setTotalRecord: (value: number) => void;
}) => (
  <TaskListTab
    taskState="INIT"
    getData={(keyword, i) =>
      WODataSource.listOpenTask({
        keyword,
        page_num: i,
        page_size: 10,
        organization_id: user.organizationID,
        user_id: user.id,
      })
    }
    setTotalRecord={setTotalRecord}
    navigation={navigation}
  />
);

export const InprogressTab = ({
  navigation,
  user,
  setTotalRecord,
}: {
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'TaskList'>;
  user: User;
  setTotalRecord: (value: number) => void;
}) => (
  <TaskListTab
    taskState="PROGRESS"
    getData={(keyword, i) =>
      WODataSource.listInProgressTask({
        keyword,
        page_num: i,
        page_size: 10,
        organization_id: user.organizationID,
        user_id: user.id,
      })
    }
    setTotalRecord={setTotalRecord}
    navigation={navigation}
  />
);

export const CompletedTab = ({
  navigation,
  user,
  setTotalRecord,
}: {
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'TaskList'>;
  user: User;
  setTotalRecord: (value: number) => void;
}) => (
  <TaskListTab
    taskState="COMPLETED"
    getData={(keyword, i) =>
      WODataSource.listCompletedTask({
        keyword,
        page_num: i,
        page_size: 10,
        organization_id: user.organizationID,
        user_id: user.id,
      })
    }
    setTotalRecord={setTotalRecord}
    navigation={navigation}
  />
);
export const OverdueTab = ({
  navigation,
  user,
  setTotalRecord,
}: {
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'TaskList'>;
  user: User;
  setTotalRecord: (value: number) => void;
}) => (
  <TaskListTab
    taskState="OVERDUE"
    getData={(keyword, i) =>
      WODataSource.listOverdueTask({
        keyword,
        page_num: i,
        page_size: 10,
        organization_id: user.organizationID,
        user_id: user.id,
      })
    }
    setTotalRecord={setTotalRecord}
    navigation={navigation}
  />
);
