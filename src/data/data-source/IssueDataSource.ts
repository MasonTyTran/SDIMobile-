import { Observable } from 'rxjs';
import { container } from 'tsyringe';
import { RxRemoteProvider } from '@core';
import { AppDependencies } from '@di';
import {
    CreateIssueRequest,
    CreateIssueResponse,
    IssueListRequest,
    IssueListResponse,
} from '../model';
import { map } from 'rxjs/operators';

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
        return this.provider
            .post<CreateIssueResponse>('asset/incident_add', data)
            .pipe(map((x) => x.data));
    }

}

export const IssueDataSource = new _IssueDataSource();
