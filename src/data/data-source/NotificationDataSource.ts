import {Observable} from 'rxjs';
import {container} from 'tsyringe';
import {RxRemoteProvider} from '@core';
import {AppDependencies} from '@di';
import {NotificationListResponse} from '../model';
import {map} from 'rxjs/operators';

export interface NotificationListRequestBody {
  page_num: number;
  page_size: number;
}

class _NotificationDataSource {
  get provider(): RxRemoteProvider {
    return container.resolve<RxRemoteProvider>(AppDependencies.ApiProvider);
  }

  listNotification(
    data: NotificationListRequestBody,
  ): Observable<NotificationListResponse> {
    console.log(data.page_num);
    return this.provider
      .post<NotificationListResponse>('notifications', data)
      .pipe(map((x) => x.data));
  }
  registerDevice(token: string): Observable<any> {
    return this.provider
      .post('notifications/register_device', {device_token: token})
      .pipe(map((x) => x.data));
  }
  markSeen(id: string): Observable<any> {
    return this.provider
      .post('notifications/updatestatus', {notification_id: id})
      .pipe(map((x) => x.data));
  }
}

export const NotificationDataSource = new _NotificationDataSource();
