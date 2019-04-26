import {Injectable} from '@angular/core';
import {AuthHttpService} from './auth-http.service';
import {Observable} from 'rxjs/Observable';
import {DigitalSkillModel} from '../models/digital-skill.model';
import {EP_DIGITAL_SKILLS} from '../utiles/constants.interface';

@Injectable()
export class SkillsService {

  constructor(private http: AuthHttpService) { }

  public getDigitalSkills(): Observable<DigitalSkillModel> {
    return this.http.get(EP_DIGITAL_SKILLS);
  }

}
