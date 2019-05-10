import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LanguageModel} from '../../models/language.model';
import {Swal} from '../../utiles/swal.utils';
import {LanguagesService} from '../../services/languages.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {
  public languages: LanguageModel[] = [];
  public formModal: boolean = false;
  public formGroup: FormGroup;
  public editing: number;

  constructor(private languageService: LanguagesService) { }

  ngOnInit() {
    Swal.buildSwallWithoutButtons('Cargando', 'Obteniendo datos. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    this.languageService.getLanguages().subscribe(
      languages => {
        this.languages = languages;
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

  public editLanguage(language: LanguageModel): void {
    this.formGroup = new FormGroup(
      {

      }
    );
    this.editing = language.id;
    this.formModal = true;
  }

  public deleteLanguage(language: LanguageModel): void {

  }



  public resetFormGroup(): void {
    this.formGroup = new FormGroup(
      {

      }
    );
    this.editing = 0;
  }
}
