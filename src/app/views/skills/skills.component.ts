import {Component, OnInit} from '@angular/core';
import {SkillsService} from '../../services/skills.service';
import {Swal} from '../../utiles/swal.utils';
import {Utilities} from '../../utiles/utilities.utils';
import {DigitalSkillModel} from '../../models/digital-skill.model';
import {SkillModel} from '../../models/skill.model';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SkillGradeModel} from '../../models/skill-grade.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  public skillGrades: SkillGradeModel[];
  public digitalSkills: DigitalSkillModel;
  public otherSkills: SkillModel[];
  public digitalSkillsModal: boolean = false;
  public skillModal: boolean = false;
  public digitalSkillGroup: FormGroup;
  public skillGroup: FormGroup;
  public editing: number;

  constructor(private skillsService: SkillsService) {
  }

  ngOnInit() {
    Swal.buildSwallWithoutButtons('Cargando', 'Obteniendo datos. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    forkJoin(this.skillsService.getDigitalSkills(),
      this.skillsService.getOtherSkills(),
      this.skillsService.getSkillGrades()).subscribe(
      ([digitalSkills, otherSkills, skillGrades]) => {
        this.digitalSkills = digitalSkills;
        this.otherSkills = otherSkills;
        this.skillGrades = skillGrades;
        this.resetDigitalSkillGroup();
        this.resetSkillFormGroup();
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

  public editDigitalSkills(): void {
    this.digitalSkillGroup = new FormGroup(
      {
        processing: new FormControl(this.digitalSkills.processing.id ? this.digitalSkills.processing.id : this.skillGrades[0].id, Validators.required),
        communication: new FormControl(this.digitalSkills.communication.id ? this.digitalSkills.communication.id : this.skillGrades[0].id, Validators.required),
        contents: new FormControl(this.digitalSkills.contents.id ? this.digitalSkills.contents.id : this.skillGrades[0].id, Validators.required),
        safety: new FormControl(this.digitalSkills.safety.id ? this.digitalSkills.safety.id : this.skillGrades[0].id, Validators.required),
        solving: new FormControl(this.digitalSkills.solving.id ? this.digitalSkills.solving.id : this.skillGrades[0].id, Validators.required)
      }
    );
    this.digitalSkillsModal = true;
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

  public saveDigitalSkills(): void {
    let skill: DigitalSkillModel = {
      processing: this.skillGrades.find(value => value.id == parseInt(this.digitalSkillGroup.controls['processing'].value)),
      communication: this.skillGrades.find(value => value.id == parseInt(this.digitalSkillGroup.controls['communication'].value)),
      contents: this.skillGrades.find(value => value.id == parseInt(this.digitalSkillGroup.controls['contents'].value)),
      safety: this.skillGrades.find(value => value.id == parseInt(this.digitalSkillGroup.controls['safety'].value)),
      solving: this.skillGrades.find(value => value.id == parseInt(this.digitalSkillGroup.controls['solving'].value))
    };

    // TODO: COMPROBAR PORQUÉ FALLA. SIEMPRE DEVUELVE EL ID 4.

    console.log(this.digitalSkillGroup.controls['processing'].value);
    console.log(parseInt(this.digitalSkillGroup.controls['processing'].value));

    console.log(skill);

    this.skillsService.saveDigitalSkills(skill).subscribe(
      ok => {
        this.digitalSkills = ok;
        this.digitalSkillsModal = false;
        Swal.buildSwalWithoutCancel('Habilidades digitales actualizadas', 'Se actualizó sus habilidades digitales correctamente.', 'success');
      }, err => {
        Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
      }
    );
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

  public resetDigitalSkillGroup(): void {
    this.digitalSkillGroup = new FormGroup(
      {
        processing: new FormControl(this.skillGrades[0], Validators.required),
        communication: new FormControl(this.skillGrades[0], Validators.required),
        contents: new FormControl(this.skillGrades[0], Validators.required),
        safety: new FormControl(this.skillGrades[0], Validators.required),
        solving: new FormControl(this.skillGrades[0], Validators.required)
      }
    );
  }

  public resetSkillFormGroup(): void {
    this.skillGroup = new FormGroup(
      {
        skill: new FormControl('', Validators.required)
      }
    );
    this.editing = 0;
  }
}
