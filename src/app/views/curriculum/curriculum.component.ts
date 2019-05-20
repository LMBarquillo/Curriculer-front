import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {TrainingModel} from '../../models/training.model';
import {JobModel} from '../../models/job.model';
import {LanguageSkillModel} from '../../models/language-skill.model';
import {DigitalSkillModel} from '../../models/digital-skill.model';
import {SkillModel} from '../../models/skill.model';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Utilities} from '../../utiles/utilities.utils';
import {UserService} from '../../services/user.service';
import {TrainingsService} from '../../services/trainings.service';
import {JobsService} from '../../services/jobs.service';
import {LanguagesService} from '../../services/languages.service';
import {SkillsService} from '../../services/skills.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {
  public userData: UserModel;
  public trainings: TrainingModel[] = [];
  public jobs: JobModel[] = [];
  public languages: LanguageSkillModel[] = [];
  public digitalSkills: DigitalSkillModel;
  public otherSkills: SkillModel[] = [];

  constructor(private userService: UserService,
              private trainingService: TrainingsService,
              private jobService: JobsService,
              private languageService: LanguagesService,
              private skillService: SkillsService) { }

  ngOnInit() {
    // Si usamos los mismos endpoints que en el home, habría que permitirlos en el interceptor.
    // O bien podemos hacer un global y usarlo en ambos. --> Mejor opción hasta el momento.


    forkJoin(this.userService.getUserData(),
      this.trainingService.getTrainings(),
      this.jobService.getJobs(),
      this.languageService.getLanguageSkills(),
      this.skillService.getDigitalSkills().pipe(catchError(() => of(null))),
      this.skillService.getOtherSkills()).subscribe(
      ([user, trainings, jobs, languages, digitalSkills, otherSkills]) => {
        this.userData = user;
        this.trainings = trainings.sort((a, b) => Utilities.compareNumber(a.promotion, b.promotion, true));
        this.jobs = jobs.sort((a, b) => Utilities.compareDate(a.to, b.to, true));
        this.languages = languages;
        this.digitalSkills = digitalSkills;
        this.otherSkills = otherSkills;
      }
    );
  }

}
