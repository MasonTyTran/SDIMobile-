import {AxiosResponse} from 'axios';
import {injectable, inject} from 'tsyringe';
import {Observable} from 'rxjs';

import {RxRemoteProvider} from '@core';
import {Credential} from '@domain';

import {SignInResponseData, SignInRequestData} from '../model';

export interface RemoteAuthenticationDataSource {
  /**
   * @method signIn
   *
   * @description Sign in user with phone
   */
  signIn(body: Credential): Observable<AxiosResponse<SignInResponseData>>;
  signOut(): Observable<any>;
  forgotPass(email: string): Observable<any>;
}

@injectable()
export class ApiAuthenticationDataSource
  implements RemoteAuthenticationDataSource {
  constructor(
    @inject('ApiProvider')
    private readonly provider: RxRemoteProvider,
  ) {}
  forgotPass(email: string): Observable<any> {
    return this.provider.post('user/forgotpass', {vidagis_emailaddress: email});
  }
  signIn(data: Credential): Observable<AxiosResponse<SignInResponseData>> {
    const body: SignInRequestData = {
      vidagis_branch_id: '',
      vidagis_password: data.password,
      vidagis_uid_emailaddress: data.username,
    };
    return this.provider.post<SignInResponseData>('user/login', body);
  }

  signOut(): Observable<any> {
    return this.provider.post('user/logout');
  }
}
