import {Observable} from 'rxjs';
import {container} from 'tsyringe';
import {RxRemoteProvider} from '@core';
import {AppDependencies} from '@di';
import {
  CreateIssueRequest,
  CreateIssueResponse,
  GetOrganizationTypeResponse,
  GetPermissionResponse,
  IssueListRequest,
  IssueListResponse,
  ListIssueTypeData,
  ListIssueTypeResponse,
  Organization,
  OrgPermission,
} from '../model';
import {map, mapTo} from 'rxjs/operators';

class _IssueDataSource {
  get provider(): RxRemoteProvider {
    return container.resolve<RxRemoteProvider>(AppDependencies.ApiProvider);
  }

  listOpenIssue(data: IssueListRequest): Observable<IssueListResponse> {
    return this.provider
      .post<IssueListResponse>('asset/incident_incurred', data)
      .pipe(map((x) => x.data));
  }

  listClosedIssue(data: IssueListRequest): Observable<IssueListResponse> {
    return this.provider
      .post<IssueListResponse>('asset/incident_resolved', data)
      .pipe(map((x) => x.data));
  }

  searchIssue(data: IssueListRequest): Observable<IssueListResponse> {
    return this.provider
      .post<IssueListResponse>('asset/incident_search', data)
      .pipe(map((x) => x.data));
  }

  createIssue(data: CreateIssueRequest): Observable<CreateIssueResponse> {
    const form = new FormData();
    Object.keys(data).forEach((k) => data[k] && form.append(k, data[k]));
    console.log(form);
    return this.provider
      .post<CreateIssueResponse>('asset/incident_add', form, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .pipe(map((x) => x.data));
  }
  listIssueType(): Observable<ListIssueTypeData> {
    return this.provider
      .get<ListIssueTypeResponse>('incident/type_incident')
      .pipe(map((x) => x.data.Data));
  }

  getOrganizations(): Observable<Organization[]> {
    return this.provider
      .get<GetOrganizationTypeResponse>('organizations/list')
      .pipe(map((x) => x.data.Data));
  }
  getPermission(
    org: string,
    token: string,
  ): Observable<OrgPermission | undefined> {
    return this.provider
      .post<GetPermissionResponse>(`organizations/${org}/permission`, {token})
      .pipe(map((x) => (x.data.Data.length > 0 ? x.data.Data[0] : undefined)));
    // .pipe(
    //   mapTo({
    //     vidagis_organizationid: 'sdi_hue',
    //     job_order: '1',
    //     asset: '1',
    //     map: '0',
    //   }),
    //F );
  }
}

export const IssueDataSource = new _IssueDataSource();
