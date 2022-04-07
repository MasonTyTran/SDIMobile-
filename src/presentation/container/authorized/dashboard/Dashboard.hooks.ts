import React from 'react';
import {} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import {Selector, useSelector} from 'react-redux';

import {NotificationDataSource, WODataSource} from '@data';

import {RootStoreState} from '@shared-state';
import {User} from '@domain';
import {zip} from 'rxjs';
import {usePermissionContext} from '@hooks';

export const dashboardSelector: Selector<RootStoreState, User> = (state) => {
  return state.authentication.user!;
};

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (!enabled) {
    return;
  }
  await messaging().registerDeviceForRemoteMessages();
}

export function useDashboardModel() {
  const user = useSelector(dashboardSelector);
  const [totalInprogress, setInProgress] = React.useState(0);
  const [totalCompleted, setCompleted] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const loadData = React.useCallback(() => {
    setRefreshing(true);
    zip(
      WODataSource.listInProgressTask({
        page_num: 1,
        page_size: 100,
        user_id: user.id,
        organization_id: user.organizationID,
        keyword: '',
      }),
      WODataSource.listCompletedTask({
        page_num: 1,
        page_size: 100,
        user_id: user.id,
        organization_id: user.organizationID,
        keyword: '',
      }),
    ).subscribe({
      next: ([inProgress, completed]) => {
        setInProgress(inProgress.Data.total_records);
        setCompleted(completed.Data.total_records);
        setRefreshing(false);
      },
      error: () => setRefreshing(false),
    });
  }, [user]);
  const {refresh, permission} = usePermissionContext();
  React.useEffect(() => {
    loadData();
    refresh();
  }, [loadData, refresh]);
  React.useEffect(() => {
    const registerDevice = async () => {
      await requestUserPermission();
      const token = await messaging().getToken();
      await NotificationDataSource.registerDevice(token).toPromise();
    };
    registerDevice();
  }, []);
  return {totalInprogress, totalCompleted, refreshing, loadData, permission};
}
