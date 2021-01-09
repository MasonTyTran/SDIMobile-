import React from 'react';
import {} from 'react-native';
import {WODataSource} from '@data';

import {Selector, useSelector} from 'react-redux';
import {RootStoreState} from '@shared-state';
import {User} from '@domain';

export const dashboardSelector: Selector<RootStoreState, User> = (state) => {
  return state.authentication.user!;
};

export function useDashboardModel() {
  const user = useSelector(dashboardSelector);
  const [totalInprogress, setInProgress] = React.useState(0);
  const [totalCompleted, setCompleted] = React.useState(0);
  const loadData = React.useCallback(() => {
    WODataSource.listInProgressTask({
      page_num: 1,
      page_size: 100,
      user_id: '2',
      organization_id: user.organizationID,
      keyword: '',
    })
      .toPromise()
      .then((x) => setInProgress(x.Data.total_records));
    WODataSource.listCompletedTask({
      page_num: 1,
      page_size: 100,
      user_id: '2',
      organization_id: user.organizationID,
      keyword: '',
    })
      .toPromise()
      .then((x) => setCompleted(x.Data.total_records));
  }, [user]);
  React.useEffect(loadData, [user]);
  return {totalInprogress, totalCompleted};
}
