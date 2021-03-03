import React from 'react';

import {container} from 'tsyringe';
import {filter} from 'rxjs/operators';
import {useSelector, useDispatch} from 'react-redux';

import {AppDependencies} from '@di';
import {StoreContainer, signInFailed, signIn} from '@shared-state';

import {signInSelector} from './SignIn.redux-selector';
import {SignInHandle} from './types';

const DFUser = {
  user: __DEV__ ? 'admin' : '',
  pass: __DEV__ ? 'HueSDI@HueCIT' : '',
};

export function useSignIn(handle: SignInHandle) {
  const {onSignInFailed} = handle;
  const {isAuthenticating} = useSelector(signInSelector);
  const dispatch = useDispatch();

  const [username, setUsername] = React.useState(DFUser.user);
  const [password, setPassword] = React.useState(DFUser.pass);
  const submit = (_: any) => {
    dispatch(signIn({username, password}));
  };
  const {action$} = container.resolve<StoreContainer>(
    AppDependencies.StoreContainer,
  );
  React.useEffect(() => {
    const subscription = action$
      .pipe(filter(signInFailed.match))
      .subscribe(onSignInFailed);
    return () => {
      if (subscription.closed) {
        return;
      }
      subscription.unsubscribe();
    };
  }, [action$, onSignInFailed]);
  return {isAuthenticating, submit, setUsername, setPassword};
}
