import {Component, OnInit} from '@angular/core';
import {JobModel} from '../../models/job.model';
import {JobsService} from '../../services/jobs.service';
import {Swal} from '../../utiles/swal.utils';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../utiles/validators.utils';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {SectorModel} from '../../models/sector.model';
import {Formats} from '../../utiles/formats.utils';
import {Utilities} from '../../utiles/utilities.utils';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  public jobs: JobModel[] = [];
  public sectors: SectorModel[] = [];
  public formGroup: FormGroup;
  public formModal: boolean = false;
  public editing: number;


  constructor(private jobsService: JobsService) {
  }

  ngOnInit() {
    Swal.buildSwallWithoutButtons('Cargando', 'Obteniendo datos. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    this.resetFormGroup();
    forkJoin(this.jobsService.getJobs(),
      this.jobsService.getSectors()).subscribe(
      ([jobs, sectors]) => {
        this.jobs = jobs.sort((a, b) => Utilities.compareDate(a.to, b.to, true));
        this.sectors = sectors.sort((a, b) => Utilities.compareString(a.sector, b.sector, false));
        Swal.close();
      }, err => {
        console.log(err);
        Swal.buildSwalWithoutCancel('Error', 'No se pudo obtener la experiencia laboral del usuario.', 'error');
      }
    );
  }

  public addJob(): void {
    this.resetFormGroup();
    this.formModal = true;
  }

  public editJob(job: JobModel): void {

  }

  public deleteJob(job: JobModel): void {
    Swal.buildSwal('Eliminar experiencia laboral', '¿Está seguro de que desea eliminar su trabajo en ' + job.employer + '?', 'question', 'SI', 'NO').then(
      yes => {
        if (yes.value) {
          this.jobsService.deleteJob(job.id).subscribe(
            ok => {
              this.jobs = this.jobs.filter((value, index) => this.jobs.findIndex(item => item.id == ok) !== index);
              Swal.buildSwalWithoutCancel('Experiencia laboral eliminada', 'Se eliminó el trabajo correctamente.', 'success');
            }, err => {
              console.log(err);
              Swal.buildSwalWithoutCancel('Error', 'No se pudo eliminar el trabajo del usuario.', 'error');
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

  public getDate(date: string): string {
    return Formats.formatDate(date);
  }
}
