import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {Swal} from '../../utiles/swal.utils';
import {Formats} from '../../utiles/formats.utils';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {TrainingsService} from '../../services/trainings.service';
import {TrainingModel} from '../../models/training.model';
import {catchError} from 'rxjs/operators';
import {Utilities} from '../../utiles/utilities.utils';
import {JobsService} from '../../services/jobs.service';
import {JobModel} from '../../models/job.model';
import {LanguagesService} from '../../services/languages.service';
import {LanguageModel} from '../../models/language.model';
import {SkillsService} from '../../services/skills.service';
import {DigitalSkillModel} from '../../models/digital-skill.model';
import {SkillModel} from '../../models/skill.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../utiles/validators.utils';
import {BS_CONFIG} from '../../utiles/constants.interface';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {
  public userData: UserModel;
  public trainings: TrainingModel[] = [];
  public jobs: JobModel[] = [];
  public languages: LanguageModel[] = [];
  public digitalSkills: DigitalSkillModel;
  public otherSkills: SkillModel[] = [];
  public userForm: FormGroup;
  public bsConfig = BS_CONFIG;

  public userInfoModal: boolean = false;

  constructor(private userService: UserService,
              private trainingService: TrainingsService,
              private jobService: JobsService,
              private languageService: LanguagesService,
              private skillService: SkillsService) {
  }

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    Swal.buildSwallWithoutButtons('Cargando', 'Obteniendo datos. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    forkJoin(this.userService.getUserData(),
             this.trainingService.getTrainings().pipe(catchError(() => [])),
             this.jobService.getJobs().pipe(catchError(() => [])),
             this.languageService.getLanguages().pipe(catchError(() => [])),
             this.skillService.getDigitalSkills().pipe(catchError(() => [])),
             this.skillService.getOtherSkills().pipe(catchError(() => []))).subscribe(
      ([user, trainings, jobs, languages, digitalSkills, otherSkills]) => {
        this.userData = user;
        this.trainings = trainings.sort((a, b) => Utilities.compare(a.promotion, b.promotion, true));
        this.jobs = jobs.sort((a, b) => Utilities.compare(a.from, b.from, true));
        this.languages = languages;
        this.digitalSkills = digitalSkills;
        this.otherSkills = otherSkills;

        this.userForm = new FormGroup(
          {
            name: new FormControl(this.userData.name, Validators.required),
            surname: new FormControl(this.userData.surname, Validators.required),
            address: new FormControl(this.userData.address, Validators.required),
            city: new FormControl(this.userData.city, Validators.required),
            email: new FormControl(this.userData.email, CustomValidators.checkMail),
            birthdate: new FormControl(this.userData.birthdate, CustomValidators.checkDate)
          }
        );
        Swal.close();
      }, () => {
        Swal.buildSwalWithoutCancel('Error', 'No se pudo obtener los datos del usuario.', 'error');
      }
    );
  }

  public getDate(date: string): string {
    return Formats.formatDate(date);
  }

  public getUser(): string {
    return Utilities.getUser();
  }

  public openFileLoader(): void {
    let fileloader = document.getElementById('fileloader');
    fileloader.click();
  }

  public loadImage(event): void {
    let imageType = /image.*/;
    let file = event.target.files[0];

    if (file.type.match(imageType)) {
      Swal.buildSwallWithoutButtons('Cargando', 'Actualizando avatar. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if(reader.result.length <= 1000000) {
          this.userService.updateAvatar(reader.result).subscribe(
            () => {
              this.userData.picture = reader.result;
              Swal.close();
            }, (err) => {
              console.log(err);
              Swal.buildSwalWithoutCancel('Error', 'No se pudo actualizar el avatar del usuario.', 'error');
            }
          );
        } else {
          Swal.buildSwalWithoutCancel('Imagen demasiado grande','Por favor, escoja otra imagen más pequeña','error');
        }
      }
    } else {
      Swal.buildSwalWithoutCancel('Archivo incorrecto', 'Por favor, seleccione solo archivos de imagen', 'error');
    }
  }

}
