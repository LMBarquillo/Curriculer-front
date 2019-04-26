import {Injectable} from '@angular/core';
import {AuthHttpService} from './auth-http.service';
import {Observable} from 'rxjs/Observable';
import {LanguageModel} from '../models/language.model';
import {EP_LANGUAGES} from '../utiles/constants.interface';

@Injectable()
export class LanguagesService {

  constructor(private http: AuthHttpService) { }

  public getLanguages(): Observable<LanguageModel[]> {
    return this.http.get(EP_LANGUAGES);
  }

}
