import {Injectable} from '@angular/core';
import {AuthHttpService} from './auth-http.service';
import {Observable} from 'rxjs/Observable';
import {LanguageSkillModel} from '../models/language-skill.model';
import {EP_LANGUAGE_GRADES, EP_LANGUAGE_SKILLS, EP_LANGUAGES} from '../utiles/constants.interface';
import {LanguageModel} from '../models/language.model';
import {SkillGradeModel} from '../models/skill-grade.model';

@Injectable()
export class LanguagesService {

  constructor(private http: AuthHttpService) { }

  public getLanguageSkills(): Observable<LanguageSkillModel[]> {
    return this.http.get(EP_LANGUAGE_SKILLS);
  }

  public getLanguages(): Observable<LanguageModel[]> {
    return this.http.get(EP_LANGUAGES);
  }

  public getLanguageGrades(): Observable<SkillGradeModel[]> {
    return this.http.get(EP_LANGUAGE_GRADES);
  }

  public insertLanguage(model: LanguageSkillModel): Observable<LanguageSkillModel> {
    return this.http.post(EP_LANGUAGE_SKILLS, model);
  }

  public updateLanguage(model: LanguageSkillModel): Observable<LanguageSkillModel> {
    return this.http.put(EP_LANGUAGE_SKILLS, model);
  }

  public deleteLanguage(id: number): Observable<number> {
    return this.http.delete(EP_LANGUAGE_SKILLS + '/' + id);
  }
}
