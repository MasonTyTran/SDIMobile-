import {Observable} from 'rxjs';
import {container} from 'tsyringe';
import {RxRemoteProvider} from '@core';
import {AppDependencies} from '@di';
import {ListAssetRequest, ListAssetResponse} from '../model';
import {map} from 'rxjs/operators';

class _AssetDataSource {
  get provider(): RxRemoteProvider {
    return container.resolve<RxRemoteProvider>(AppDependencies.ApiProvider);
  }

  listAsset(data: ListAssetRequest): Observable<ListAssetResponse> {
    return this.provider
      .post<ListAssetResponse>('assets/search', data)
      .pipe(map((x) => x.data));
  }
}

export const AssetDataSource = new _AssetDataSource();
