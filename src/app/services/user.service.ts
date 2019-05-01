import {Injectable} from '@angular/core';
import {AuthHttpService} from './auth-http.service';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs/Observable';
import {EP_AVATAR, EP_USER} from '../utiles/constants.interface';

@Injectable()
export class UserService {

  constructor(private authHttp: AuthHttpService) { }

  public getUserData(): Observable<UserModel> {
    return this.authHttp.get(EP_USER);
  }

  public updateAvatar(image: string): Observable<UserModel> {
    return this.authHttp.put(EP_AVATAR, image);
  }

  public updateUserData(data: UserModel): Observable<UserModel> {
    return this.authHttp.put(EP_USER, data);
  }
}
