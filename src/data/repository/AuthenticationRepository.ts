import {inject, injectable} from 'tsyringe';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AuthenticationRepository, Credential, SignInResult} from '@domain';

import {
  LocalAuthenticationDataSource,
  RemoteAuthenticationDataSource,
} from '../data-source';
import {parseUserModel} from '../model';

@injectable()
export class CombineAuthenticationRepository
  implements AuthenticationRepository {
  constructor(
    @inject('LocalAuthenticationDataSource')
    private readonly localDataSource: LocalAuthenticationDataSource,
    @inject('RemoteAuthenticationDataSource')
    private readonly remoteDataSource: RemoteAuthenticationDataSource,
  ) {}

  signIn(credential: Credential): Observable<SignInResult> {
    return this.remoteDataSource.signIn(credential).pipe(
      map(
        (result): SignInResult => {
          console.log(result);
          return {
            fromLocal: false,
            token: result.data.access_token,
            user: parseUserModel(result.data.user),
          };
        },
      ),
    );
  }
  getToken(): Observable<string> {
    return this.localDataSource.getToken();
  }
  saveToken(key: string, token: string): Observable<boolean> {
    return this.localDataSource?.saveToken(key, token);
  }
}
