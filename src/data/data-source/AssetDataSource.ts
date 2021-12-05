import {Observable} from 'rxjs';
import {container} from 'tsyringe';
import {RxRemoteProvider} from '@core';
import {AppDependencies} from '@di';
import {
  AssetInfoRequest,
  AssetInfoResponse,
  ListAssetRequest,
  ListAssetResponse,
  OrganizationConfigResponse,
} from '../model';
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

  assetInfo(data: AssetInfoRequest): Observable<AssetInfoResponse> {
    return this.provider
      .post<AssetInfoResponse>('asset/id', data)
      .pipe(map((x) => x.data));
  }
  getOrgConfig(): Observable<OrganizationConfigResponse> {
    return this.provider
      .get<OrganizationConfigResponse>('organizations/config')
      .pipe(map((x) => x.data));
  }
}

export const AssetDataSource = new _AssetDataSource();
