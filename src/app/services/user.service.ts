import {Injectable} from '@angular/core';
import {AuthHttpService} from './auth-http.service';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs/Observable';
import {EP_USER} from '../utiles/constants.interface';

@Injectable()
export class UserService {

  constructor(private authHttp: AuthHttpService) { }

  public getUserData(): Observable<UserModel> {
    return this.authHttp.get(EP_USER);
  }
}
