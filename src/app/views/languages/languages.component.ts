import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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

        console.log(languages);
        this.resetFormGroup();
        Swal.close();
      }, err => {
        console.log(err);
        Swal.buildSwalWithoutCancel('Error', 'No se pudo obtener la formación del usuario.', 'error');
      }
    );
  }

  public saveLanguage(): void {
    Swal.buildSwallWithoutButtons('Guardando', 'Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    this.formModal = false;

    // TODO: CONTINUAR POR AQUÍ.
  }

  public addLanguage(): void {
    this.resetFormGroup();
    this.formModal = true;
  }

  public editLanguage(language: LanguageSkillModel): void {
    this.formGroup = new FormGroup(
      {
        language: new FormControl(language.id, Validators.required),
        listening: new FormControl(language.listening.id, Validators.required),
        reading: new FormControl(language.reading.id, Validators.required),
        interaction: new FormControl(language.interaction.id, Validators.required),
        production: new FormControl(language.production.id, Validators.required),
        writing: new FormControl(language.writing.id, Validators.required)
      }
    );
    this.editing = language.id;
    this.formModal = true;
  }

  public deleteLanguage(language: LanguageSkillModel): void {
    Swal.buildSwal('Eliminar idioma', '¿Está seguro de que desea eliminar su conocimiento del idioma ' + language.language + '?', 'question', 'SI', 'NO').then(
      yes => {
        if (yes.value) {
          this.languageService.deleteLanguage(language.id).subscribe(
            ok => {
              this.languageSkills = this.languageSkills.filter((value, index) => this.languageSkills.findIndex(item => item.id == ok) !== index);
              Swal.buildSwalWithoutCancel('Idioma eliminado', 'Se eliminó el idioma correctamente.', 'success');
            }, err => {
              console.log(err);
              Swal.buildSwalWithoutCancel('Error', 'No se pudo eliminar el idioma.', 'error');
            }
          );
        }
      }
    )
  }

  public resetFormGroup(): void {
    this.formGroup = new FormGroup(
      {
        language: new FormControl(1, Validators.required),
        listening: new FormControl(1, Validators.required),
        reading: new FormControl(1, Validators.required),
        interaction: new FormControl(1, Validators.required),
        production: new FormControl(1, Validators.required),
        writing: new FormControl(1, Validators.required)
      }
    );
    this.editing = 0;
  }
}
