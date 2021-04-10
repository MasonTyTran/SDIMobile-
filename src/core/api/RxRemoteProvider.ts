import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import {Observable, Observer} from 'rxjs';
import {RemoteException} from '../error';

export interface RxRemoteProvider {
  token?: string;
  setToken(token: string): void;
  onUnAuthorized?: () => void;
  /**
   * @summary perform @POST request with config
   * @param url
   * @param data
   *
   * @returns Either Axios response with generic data: T or @RemoteException if failed
   */
  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>>;

  /**
   * @summary perform @GET request with config
   * @param url
   *
   * @returns Either Axios response with generic data: T or @RemoteException if failed
   */
  get<T>(url: string): Observable<AxiosResponse<T>>;

  /**
   * @summary perform @PUT request with config
   * @param url
   * @param data
   *
   * @returns Either Axios response with generic data: T or @RemoteException if failed
   */
  put<T>(url: string, data: any): Observable<AxiosResponse<T>>;

  /**
   * @summary perform @DELETE request with config
   * @param url
   *
   * @returns Either Axios response with generic data: T or @RemoteException if failed
   */
  delete<T>(url: string): Observable<AxiosResponse<T>>;
}

export class RxAxiosProviderException extends RemoteException<AxiosError> {}

export class BearerAuthorizationRxAxiosProvider<Result = any>
  implements RxRemoteProvider {
  private readonly axiosInstance: AxiosInstance;

  token?: string;

  onUnAuthorized?: () => void;

  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  setToken(token: string) {
    this.token = token;
    this.axiosInstance.defaults.headers.common.access_token = token;
  }

  request<T>(requestConfig: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    return Observable.create(async (observer: Observer<AxiosResponse<T>>) => {
      try {
        const result = await this.axiosInstance.request(requestConfig);
        console.log('result', result);
        observer.next(result);
        observer.complete();
      } catch (error) {
        console.log('response =====', error.response);
        const response = error.response as AxiosResponse;
        if (
          response &&
          response.data === 'Thông tin xác thực không chính xác' &&
          response.status === 403
        ) {
          // this.onUnAuthorized?.call(this);
        }
        console.log('Config =====', error.config);
        observer.error(new RxAxiosProviderException(error));
      }
    });
  }

  post<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {},
  ): Observable<AxiosResponse<T>> {
    return this.request({
      method: 'POST',
      data,
      url,
      ...config,
    });
  }
  get<T>(url: string): Observable<AxiosResponse<T>> {
    return this.request({
      method: 'GET',
      url,
    });
  }
  put<T>(url: string, data: any): Observable<AxiosResponse<T>> {
    return this.request({
      method: 'PUT',
      data,
      url,
    });
  }
  delete<T>(url: string): Observable<AxiosResponse<T>> {
    return this.request({
      method: 'DELETE',
      url,
    });
  }
}
