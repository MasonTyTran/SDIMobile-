import {Observable} from 'rxjs';
import {container} from 'tsyringe';
import {RxRemoteProvider} from '@core';
import {AppDependencies} from '@di';
import {
  CreateIssueRequest,
  CreateIssueResponse,
  IssueListRequest,
  IssueListResponse,
  ListIssueTypeData,
  ListIssueTypeResponse,
} from '../model';
import {map} from 'rxjs/operators';

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
}

export const IssueDataSource = new _IssueDataSource();
