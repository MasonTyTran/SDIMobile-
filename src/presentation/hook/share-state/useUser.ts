import {Selector, useSelector} from 'react-redux';
import {RootStoreState} from '@shared-state';
import {User} from '@domain';
export const userSelector: Selector<RootStoreState, User> = (state) => {
  return state.authentication.user!;
};
export function useUser() {
  return useSelector(userSelector);
}
