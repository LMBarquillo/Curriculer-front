import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GlobalModel} from '../models/global.model';
import {EP_CURRICULUM} from '../utiles/constants.interface';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CurriculumService {

  constructor(private http: HttpClient) {
  }

  public getCurriculum(user: string): Observable<GlobalModel> {
    return this.http.get<GlobalModel>(EP_CURRICULUM + '?user=' + user);
  }
}
