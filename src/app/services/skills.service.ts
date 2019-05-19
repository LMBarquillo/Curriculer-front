import {Injectable} from '@angular/core';
import {AuthHttpService} from './auth-http.service';
import {Observable} from 'rxjs/Observable';
import {DigitalSkillModel} from '../models/digital-skill.model';
import {EP_DIGITAL_SKILLS, EP_OTHER_SKILLS} from '../utiles/constants.interface';
import {SkillModel} from '../models/skill.model';

@Injectable()
export class SkillsService {

  constructor(private http: AuthHttpService) { }

  public getDigitalSkills(): Observable<DigitalSkillModel> {
    return this.http.get(EP_DIGITAL_SKILLS);
  }

  public getOtherSkills(): Observable<SkillModel[]> {
    return this.http.get(EP_OTHER_SKILLS);
  }

  public insertOtherSkill(skill: SkillModel): Observable<SkillModel> {
    return this.http.post(EP_OTHER_SKILLS, skill);
  }

  public updateOtherSkill(skill: SkillModel): Observable<SkillModel> {
    return this.http.put(EP_OTHER_SKILLS, skill);
  }

  public deleteOtherSkill(id: number): Observable<number> {
    return this.http.delete(EP_OTHER_SKILLS + '/' + id);
  }
}
