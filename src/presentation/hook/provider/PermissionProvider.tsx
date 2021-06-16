import {RxRemoteProvider} from '@core';
import {IssueDataSource, OrgPermission} from '@data';
import {AppDependencies, container} from '@di';
import {RootStoreState} from '@shared-state';
import React from 'react';
import {useSelector} from 'react-redux';

export interface PermissionState {
  permission?: OrgPermission;
  refresh: () => void;
}
export const PermissionContext = React.createContext<PermissionState>({
  refresh: () => {},
});

export const usePermissionContext = () => React.useContext(PermissionContext);

export const PermissionProvider: React.FC = ({children}) => {
  const organizationID = useSelector<RootStoreState, string>(
    (state) => state.authentication.user?.organizationID ?? '',
  );
  const [orgPermission, setPermission] = React.useState<
    OrgPermission | undefined
  >();
  const refresh = React.useCallback(() => {
    const provider = container.resolve<RxRemoteProvider>(
      AppDependencies.ApiProvider,
    );
    IssueDataSource.getPermission(organizationID, provider.token!).subscribe({
      next: setPermission,
      complete: () => {},
    });
  }, [organizationID]);
  return (
    <PermissionContext.Provider value={{permission: orgPermission, refresh}}>
      {children}
    </PermissionContext.Provider>
  );
};
