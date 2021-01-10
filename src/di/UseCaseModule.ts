import {container} from 'tsyringe';
import {SignInUseCase, SignOutUseCase} from '@domain';
import {AppDependencies} from './type';

export function registerUseCase() {
  container.register(AppDependencies.SignInUseCase, {
    useClass: SignInUseCase,
  });
  container.register(AppDependencies.SignOutUseCase, {
    useClass: SignOutUseCase,
  });
}
