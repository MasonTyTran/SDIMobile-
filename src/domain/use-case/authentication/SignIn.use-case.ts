import {container, inject, injectable} from 'tsyringe';
import {Observable} from 'rxjs';
import {map, mergeMap, mapTo} from 'rxjs/operators';

import {RxRemoteProvider, UseCase} from '@core';

import {AuthenticationRepository} from '../../repository';
import {Credential, SignInResult} from '../../entity';
import {AppDependencies} from '@di';

@injectable()
export class SignInUseCase implements UseCase<SignInResult, Credential> {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  call(param?: Credential): Observable<SignInResult> {
    if (typeof param === 'undefined') {
      return this.localSignIn();
    }
    return this.remoteSignIn(param);
  }

  private localSignIn(): Observable<SignInResult> {
    return this.authenticationRepository.getToken().pipe(
      map(
        (token): SignInResult => {
          container
            .resolve<RxRemoteProvider>(AppDependencies.ApiProvider)
            .setToken(token);
          return {
            fromLocal: true,
            token,
            user: {
              branchID: null,
              currentOrganizationId: null,
              displayName: 'Tran Van Quang ',
              email: 'quangtran1012@gmail.com',
              id: '1608567668808',
              languageID: 'vn',
              organizationCompanyID: null,
              organizationID: 'sdi_hue',
              password: null,
              permissionIDs: null,
              roleIDs: null,
              username: 'quangtv',
            },
          };
        },
      ),
    );
  }

  private remoteSignIn(param: Credential): Observable<SignInResult> {
    return this.authenticationRepository
      .signIn(param)
      .pipe(mergeMap(this.onRemoteSignInSuccess));
  }

  onRemoteSignInSuccess = (result: SignInResult): Observable<SignInResult> => {
    container
      .resolve<RxRemoteProvider>(AppDependencies.ApiProvider)
      .setToken(result.token);
    return this.authenticationRepository
      .saveToken(result.user.username, result.token)
      .pipe(mapTo(result));
  };
}
