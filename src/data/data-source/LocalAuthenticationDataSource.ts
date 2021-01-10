import {injectable} from 'tsyringe';
import {Observable, Observer, from} from 'rxjs';

import * as Keychain from 'react-native-keychain';
import {LocalException} from '@core';
import {map} from 'rxjs/operators';

export interface LocalAuthenticationDataSource {
  saveToken(username: string, token: string): Observable<boolean>;

  deleteToken(): Observable<boolean>;

  getToken(): Observable<string>;
}

@injectable()
export class KeyChainAuthenticationDataSource
  implements LocalAuthenticationDataSource {
  deleteToken(): Observable<boolean> {
    return from(Keychain.resetGenericPassword());
  }
  saveToken(username: string, token: string): Observable<boolean> {
    return Observable.create(async (observer: Observer<boolean>) => {
      try {
        await Keychain.setGenericPassword(username, token);
        observer.next(true);
        observer.complete();
      } catch (error) {
        observer.error(new LocalException(error));
      }
    });
  }
  getToken(): Observable<string> {
    return from(Keychain.getGenericPassword()).pipe(
      map((x) => {
        if (!x) {
          throw new LocalException({});
        }
        return x.password;
      }),
    );
  }
}
