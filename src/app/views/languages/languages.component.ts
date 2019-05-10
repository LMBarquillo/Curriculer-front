import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LanguageSkillModel} from '../../models/language-skill.model';
import {Swal} from '../../utiles/swal.utils';
import {LanguagesService} from '../../services/languages.service';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {SkillGradeModel} from '../../models/skill-grade.model';
import {LanguageModel} from '../../models/language.model';
import {Utilities} from '../../utiles/utilities.utils';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {
  public languageSkills: LanguageSkillModel[] = [];
  public languageGrades: SkillGradeModel[] = [];
  public languages: LanguageModel[] = [];
  public formModal: boolean = false;
  public formGroup: FormGroup;
  public editing: number;

  constructor(private languageService: LanguagesService) { }

  ngOnInit() {
    Swal.buildSwallWithoutButtons('Cargando', 'Obteniendo datos. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    forkJoin(this.languageService.getLanguageSkills(),
             this.languageService.getLanguageGrades(),
             this.languageService.getLanguages()).subscribe(
      ([skills, grades, languages]) => {
        this.languageSkills = skills;
        this.languages = languages.sort((a, b) => Utilities.compareNumber(a.id, b.id));
        this.languageGrades = grades.sort((a, b) => Utilities.compareNumber(a.id, b.id));
        this.resetFormGroup();
        Swal.close();
      }, err => {
        console.log(err);
        Swal.buildSwalWithoutCancel('Error', 'No se pudo obtener la formación del usuario.', 'error');
      }
    );
  }

  public addLanguage(): void {
    this.resetFormGroup();
    this.formModal = true;
  }

  public editLanguage(language: LanguageSkillModel): void {
    this.formGroup = new FormGroup(
      {

      }
    );
    this.editing = language.id;
    this.formModal = true;
  }

  public deleteLanguage(language: LanguageSkillModel): void {

  }



  public resetFormGroup(): void {
    this.formGroup = new FormGroup(
      {

      }
    );
    this.editing = 0;
  }
}
