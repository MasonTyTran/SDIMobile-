import {Observable} from 'rxjs';
import {container} from 'tsyringe';
import {RxRemoteProvider} from '@core';
import {AppDependencies} from '@di';
import {WOListRequest, WOListResponse} from '../model';
import {map} from 'rxjs/operators';

class _WODataSource {
  get provider(): RxRemoteProvider {
    return container.resolve<RxRemoteProvider>(AppDependencies.ApiProvider);
  }

  listOpenTask(data: WOListRequest): Observable<WOListResponse> {
    console.log('listOpenTask', data.keyword);
    return this.provider
      .post<WOListResponse>('projects/yetprogress', data)
      .pipe(map((x) => x.data));
  }

  listInProgressTask(data: WOListRequest): Observable<WOListResponse> {
    return this.provider
      .post<WOListResponse>('projects/progess', data)
      .pipe(map((x) => x.data));
  }

  listCompletedTask(data: WOListRequest): Observable<WOListResponse> {
    return this.provider
      .post<WOListResponse>('projects/done', data)
      .pipe(map((x) => x.data));
  }

  listOverdueTask(data: WOListRequest): Observable<WOListResponse> {
    return this.provider
      .post<WOListResponse>('projects/expired', data)
      .pipe(map((x) => x.data));
  }
}

export const WODataSource = new _WODataSource();
