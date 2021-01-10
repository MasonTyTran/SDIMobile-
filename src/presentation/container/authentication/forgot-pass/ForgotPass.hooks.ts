import {ApiAuthenticationDataSource} from '@data';
import {AppDependencies} from '@di';
import React from 'react';
import {container} from 'tsyringe';

import {ForgotPassHandle} from './types';

export function useForgotPass(handle: ForgotPassHandle) {
  const {onForgotPassFailed, onForgotPassSuccess} = handle;

  const [username, setUsername] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const submit = (_: any) => {
    const source = container.resolve<ApiAuthenticationDataSource>(
      AppDependencies.RemoteAuthenticationDataSource,
    );
    setLoading(true);
    source.forgotPass(username).subscribe({
      next: () => {
        setLoading(false);
        onForgotPassSuccess();
      },
      error: () => {
        setLoading(false);
        onForgotPassFailed();
      },
    });
  };

  return {submit, setUsername, isLoading};
}
