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
import {SkillsService} from '../../services/skills.service';
import {DigitalSkillModel} from '../../models/digital-skill.model';
import {SkillModel} from '../../models/skill.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../utiles/validators.utils';
import {of} from 'rxjs/observable/of';
import {LanguageSkillModel} from '../../models/language-skill.model';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {
  public userData: UserModel;
  public trainings: TrainingModel[] = [];
  public jobs: JobModel[] = [];
  public languages: LanguageSkillModel[] = [];
  public digitalSkills: DigitalSkillModel;
  public otherSkills: SkillModel[] = [];
  public userForm: FormGroup;

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

        this.userForm = new FormGroup(
          {
            name: new FormControl(this.userData.name, Validators.required),
            surname: new FormControl(this.userData.surname, Validators.required),
            address: new FormControl(this.userData.address),
            city: new FormControl(this.userData.city),
            email: new FormControl(this.userData.email, [Validators.required, CustomValidators.isValidEmail]),
            nationality: new FormControl(this.userData.nationality),
            birthdate: new FormControl(this.userData.birthdate ? this.dateToForm(this.userData.birthdate) : "", CustomValidators.isValidDate)
          }
        );
        Swal.close();
      }, err => {
        console.log(err);
        Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
      }
    );
  }

  public saveProfile(): void {
    let userModel: UserModel =  {
      name: this.userForm.controls['name'].value,
      surname: this.userForm.controls['surname'].value,
      address: this.userForm.controls['address'].value,
      city: this.userForm.controls['city'].value,
      email: this.userForm.controls['email'].value,
      nationality: this.userForm.controls['nationality'].value,
      birthdate: new Date(this.userForm.controls['birthdate'].value),
      picture: this.userData.picture,
      id: this.userData.id
    };
    this.userInfoModal = false;
    this.userService.updateUserData(userModel).subscribe(
      ok => {
        this.userData = ok;
        Swal.buildSwalWithoutCancel('Usuario actualizado', 'Los datos se actualizaron correctamente.', 'success');
      }, err => {
        console.log(err);
        Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
      }
    );
  }

  public getDate(date: string): string {
    return Formats.formatDate(date);
  }

  public dateToForm(date: string): string {
    return Formats.dateToForm(date);
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
              Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
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
