import {Component, OnInit} from '@angular/core';
import {SkillsService} from '../../services/skills.service';
import {Swal} from '../../utiles/swal.utils';
import {Utilities} from '../../utiles/utilities.utils';
import {DigitalSkillModel} from '../../models/digital-skill.model';
import {SkillModel} from '../../models/skill.model';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  public digitalSkills: DigitalSkillModel;
  public otherSkills: SkillModel[];
  public skillModal: boolean;
  public skillGroup: FormGroup;
  public editing: number;

  constructor(private skillsService: SkillsService) {
  }

  ngOnInit() {
    Swal.buildSwallWithoutButtons('Cargando', 'Obteniendo datos. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    forkJoin(this.skillsService.getDigitalSkills(),
      this.skillsService.getOtherSkills()).subscribe(
      ([digitalSkills, otherSkills]) => {
        this.digitalSkills = digitalSkills;
        this.otherSkills = otherSkills;
        //this.resetFormGroup();
        Swal.close();
      }, err => {
        console.log(err);
        Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
      }
    );
  }

  public addSkill(): void {
    this.resetSkillFormGroup();
    this.skillModal = true;
  }

  public editSkill(skill: SkillModel): void {
    this.skillGroup = new FormGroup(
      {
        skill: new FormControl(skill.skill, Validators.required),
      }
    );
    this.editing = skill.id;
    this.skillModal = true;
  }

  public saveSkill(): void {
    Swal.buildSwallWithoutButtons('Guardando', 'Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    this.skillModal = false;
    let skill: SkillModel = {
      id: null,
      skill: this.skillGroup.controls['skill'].value
    };

    if (this.editing > 0) {
      skill.id = this.editing;
      this.skillsService.updateOtherSkill(skill).subscribe(
        ok => {
          let updated = this.otherSkills.find(item => item.id == ok.id);
          updated.skill = ok.skill;
          Swal.buildSwalWithoutCancel('Habilidad actualizada', 'Se actualizó la habilidad correctamente.', 'success');
        }, err => {
          Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
        }
      );
    } else {
      this.skillsService.insertOtherSkill(skill).subscribe(
        ok => {
          this.otherSkills.push(ok);
          Swal.buildSwalWithoutCancel('Habilidad añadida', 'Se añadió su habilidad correctamente.', 'success');
        }, err => {
          Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
        }
      );
    }
  }

  public deleteSkill(skill: SkillModel): void {
    Swal.buildSwal('Eliminar habilidad', '¿Está seguro de que desea borrar esta hablidad?', 'question', 'SI', 'NO').then(
      yes => {
        if (yes.value) {
          this.skillsService.deleteOtherSkill(skill.id).subscribe(
            ok => {
              this.otherSkills = this.otherSkills.filter((value, index) => this.otherSkills.findIndex(item => item.id == ok) !== index);
              Swal.buildSwalWithoutCancel('Formación eliminada', 'Se eliminó la habilidad correctamente.', 'success');
            }, err => {
              Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
            }
          );
        }
      }
    )
  }

  public resetSkillFormGroup(): void {
    this.skillGroup = new FormGroup(
      {
        skill: new FormControl('', Validators.required),
      }
    );
    this.editing = 0;
  }
}
