import {Injectable} from '@angular/core';
import {UserBasicModel} from '../models/user-basic.model';
import {Observable} from 'rxjs';
import {EP_LOGIN} from '../utiles/constants.interface';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(user: string, pass: string): Observable<UserBasicModel> {
    let loginModel = {
      user: user,
      pass: pass
    };

    return this.http.post<UserBasicModel>(EP_LOGIN, loginModel);
  }
}
