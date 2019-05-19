import {Component, OnInit} from '@angular/core';
import {TrainingsService} from '../../services/trainings.service';
import {TrainingModel} from '../../models/training.model';
import {Swal} from '../../utiles/swal.utils';
import {Utilities} from '../../utiles/utilities.utils';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../utiles/validators.utils';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  public trainings: TrainingModel[] = [];
  public formModal: boolean = false;
  public formGroup: FormGroup;
  public editing: number;

  constructor(private trainingService: TrainingsService) {
  }

  ngOnInit() {
    Swal.buildSwallWithoutButtons('Cargando', 'Obteniendo datos. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    this.trainingService.getTrainings().subscribe(
      trainings => {
        this.trainings = trainings.sort((a, b) => Utilities.compareNumber(a.promotion, b.promotion, true));
        this.resetFormGroup();
        Swal.close();
      }, err => {
        console.log(err);
        Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
      }
    );
  }

  public addTraining(): void {
    this.resetFormGroup();
    this.formModal = true;
  }

  public editTraining(training: TrainingModel): void {
    this.formGroup = new FormGroup(
      {
        qualification: new FormControl(training.qualification, Validators.required),
        center: new FormControl(training.center, Validators.required),
        city: new FormControl(training.city, Validators.required),
        promotion: new FormControl(training.promotion, CustomValidators.isValidYear)
      }
    );
    this.editing = training.id;
    this.formModal = true;
  }

  public saveTraining(): void {
    Swal.buildSwallWithoutButtons('Guardando', 'Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    this.formModal = false;
    let training: TrainingModel = {
      id: null,
      qualification: this.formGroup.controls['qualification'].value,
      center: this.formGroup.controls['center'].value,
      city: this.formGroup.controls['city'].value,
      promotion: parseInt(this.formGroup.controls['promotion'].value)
    };

    if (this.editing > 0) {
      training.id = this.editing;
      this.trainingService.updateTraining(training).subscribe(
        ok => {
          let updated = this.trainings.find(item => item.id == ok.id);
          updated.promotion = ok.promotion;
          updated.center = ok.center;
          updated.city = ok.city;
          updated.qualification = ok.qualification;

          Swal.buildSwalWithoutCancel('Formación actualizada', 'Se actualizó la formación correctamente.', 'success');
        }, err => {
          Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
        }
      );
    } else {
      this.trainingService.insertTraining(training).subscribe(
        ok => {
          this.trainings.push(ok);
          setTimeout(() => this.trainings = this.trainings.sort((a, b) => Utilities.compareNumber(a.promotion, b.promotion, true)), 0);
          Swal.buildSwalWithoutCancel('Formación añadida', 'Se añadió la formación correctamente.', 'success');
        }, err => {
          Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
        }
      );
    }
  }

  public deleteTraining(training: TrainingModel): void {
    Swal.buildSwal('Eliminar formación', '¿Está seguro de que desea borrar el título de ' + training.qualification + '?', 'question', 'SI', 'NO').then(
      yes => {
        if (yes.value) {
          this.trainingService.deleteTraining(training.id).subscribe(
            ok => {
              this.trainings = this.trainings.filter((value, index) => this.trainings.findIndex(item => item.id == ok) !== index);
              Swal.buildSwalWithoutCancel('Formación eliminada', 'Se eliminó la formación correctamente.', 'success');
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
        qualification: new FormControl('', Validators.required),
        center: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        promotion: new FormControl('', CustomValidators.isValidYear)
      }
    );
    this.editing = 0;
  }
}
