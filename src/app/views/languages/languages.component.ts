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

  constructor(private languageService: LanguagesService) {
  }

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
        Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
      }
    );
  }

  public saveLanguage(): void {
    Swal.buildSwallWithoutButtons('Guardando', 'Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    this.formModal = false;

    let language: LanguageSkillModel = {
      id: null,
      language: this.languages.filter(value => value.id == parseInt(this.formGroup.controls['language'].value))[0],
      listening: this.languageGrades.filter(value => value.id == parseInt(this.formGroup.controls['listening'].value))[0],
      reading: this.languageGrades.filter(value => value.id == parseInt(this.formGroup.controls['reading'].value))[0],
      interaction: this.languageGrades.filter(value => value.id == parseInt(this.formGroup.controls['interaction'].value))[0],
      production: this.languageGrades.filter(value => value.id == parseInt(this.formGroup.controls['production'].value))[0],
      writing: this.languageGrades.filter(value => value.id == parseInt(this.formGroup.controls['writing'].value))[0]
    };

    if (this.editing > 0) {
      language.id = this.editing;
      this.languageService.updateLanguage(language).subscribe(
        ok => {
          let updated = this.languageSkills.find(item => item.id == ok.id);
          updated.language = ok.language;
          updated.listening = ok.listening;
          updated.reading = ok.reading;
          updated.interaction = ok.interaction;
          updated.production = ok.production;
          updated.writing = ok.writing;

          Swal.buildSwalWithoutCancel('Idioma actualizado', 'Se actualizó correctamente su conocimiento del idioma ' + ok.language.language, 'success');
        }, err => {
          Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
        }
      );
    } else {
      this.languageService.insertLanguage(language).subscribe(
        ok => {
          this.languageSkills.push(ok);
          Swal.buildSwalWithoutCancel('Nuevo idioma añadido', 'Se añadió el idioma ' + ok.language.language + ' a su listado.', 'success');
        }, err => {
          Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
        }
      );
    }
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
    Swal.buildSwal('Eliminar idioma', '¿Está seguro de que desea eliminar su conocimiento del idioma ' + language.language.language + '?', 'question', 'SI', 'NO').then(
      yes => {
        if (yes.value) {
          this.languageService.deleteLanguage(language.id).subscribe(
            ok => {
              this.languageSkills = this.languageSkills.filter((value, index) => this.languageSkills.findIndex(item => item.id == ok) !== index);
              Swal.buildSwalWithoutCancel('Idioma eliminado', 'Se eliminó el idioma correctamente.', 'success');
            }, err => {
              Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
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
