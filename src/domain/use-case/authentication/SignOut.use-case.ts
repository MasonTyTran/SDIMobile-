import {inject, injectable} from 'tsyringe';
import {Observable, concat} from 'rxjs';

import {UseCase} from '@core';

import {AuthenticationRepository} from '../../repository';

@injectable()
export class SignOutUseCase implements UseCase<any, any> {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  call(): Observable<any> {
    return concat(
      // this.authenticationRepository.signOut(),
      this.authenticationRepository.deleteToken(),
    );
  }
}
