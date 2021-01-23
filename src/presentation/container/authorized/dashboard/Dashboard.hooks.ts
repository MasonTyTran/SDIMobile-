import React from 'react';
import {} from 'react-native';
import {WODataSource} from '@data';

import {Selector, useSelector} from 'react-redux';
import {RootStoreState} from '@shared-state';
import {User} from '@domain';
import {zip} from 'rxjs';

export const dashboardSelector: Selector<RootStoreState, User> = (state) => {
  return state.authentication.user!;
};

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
  React.useEffect(loadData, [user]);
  return {totalInprogress, totalCompleted, refreshing, loadData};
}
