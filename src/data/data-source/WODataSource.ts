import {Observable} from 'rxjs';
import {container} from 'tsyringe';
import {RxRemoteProvider} from '@core';
import {AppDependencies} from '@di';
import {InProgressWOListRequest, InProgressWOListResponse} from '../model';
import {map} from 'rxjs/operators';

class _WODataSource {
  get provider(): RxRemoteProvider {
    return container.resolve<RxRemoteProvider>(AppDependencies.ApiProvider);
  }

  listInProgressTask(
    data: InProgressWOListRequest,
  ): Observable<InProgressWOListResponse> {
    return this.provider
      .post<InProgressWOListResponse>('projects/progess', data)
      .pipe(map((x) => x.data));
  }

  listCompletedTask(
    data: InProgressWOListRequest,
  ): Observable<InProgressWOListResponse> {
    return this.provider
      .post<InProgressWOListResponse>('projects/done', data)
      .pipe(map((x) => x.data));
  }
}

export const WODataSource = new _WODataSource();
