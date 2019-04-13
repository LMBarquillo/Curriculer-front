import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {USERDATA} from '../utiles/constants.interface';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class AuthHttpService {

  constructor(private http: HttpClient) {
  }

  public get(url: string, params?: HttpParams): Observable<any> {
    return this.http.get(url, this.createOptions(params));
  }

  public post(url: string, body: any): Observable<any> {
    return this.http.post(url, body, this.createOptions());
  }

  public put(url: string, body: any): Observable<any> {
    return this.http.put(url, body, this.createOptions());
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(url, this.createOptions());
  }

  private createOptions(params?: HttpParams) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(USERDATA)
    });

    console.log(headers);
    return params ? {headers: headers, params: params} : {headers};
  }

}
