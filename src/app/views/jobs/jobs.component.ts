import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JobModel} from '../../models/job.model';
import {JobsService} from '../../services/jobs.service';
import {Swal} from '../../utiles/swal.utils';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../utiles/validators.utils';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {SectorModel} from '../../models/sector.model';
import {Formats} from '../../utiles/formats.utils';
import {Utilities} from '../../utiles/utilities.utils';
import {ActivityModel} from '../../models/activity.model';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  @ViewChild('activityfield') activityField: ElementRef;
  public jobs: JobModel[] = [];
  public sectors: SectorModel[] = [];
  public activities: ActivityModel[] = [];
  public formGroup: FormGroup;
  public formModal: boolean = false;
  public currentJob: boolean = false;
  public editing: number;

  constructor(private jobsService: JobsService) {
  }

  ngOnInit() {
    Swal.buildSwallWithoutButtons('Cargando', 'Obteniendo datos. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    forkJoin(this.jobsService.getJobs(),
      this.jobsService.getSectors()).subscribe(
      ([jobs, sectors]) => {
        this.jobs = jobs.sort((a, b) => Utilities.compareDate(a.to, b.to, true));
        this.sectors = sectors.sort((a, b) => Utilities.compareString(a.sector, b.sector, false));
        this.resetFormGroup();
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
    console.log("to: " + job.to);
    this.formGroup = new FormGroup(
      {
        employer: new FormControl(job.employer, Validators.required),
        city: new FormControl(job.city, Validators.required),
        from: new FormControl(this.dateToForm(job.from), CustomValidators.isValidDate),
        to: job.to ? new FormControl(this.dateToForm(job.to), CustomValidators.isValidDate) : new FormControl(''),
        sector: new FormControl(job.sector.id, Validators.required)
      }
    );
    this.activities = job.activities.slice(0);  // Para pasar por valor, en lugar de referencia
    this.editing = job.id;
    this.currentJob = job.to == null;
    this.formModal = true;
  }

  public saveJob(): void {
    Swal.buildSwallWithoutButtons('Guardando', 'Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    this.formModal = false;

    let job: JobModel = {
      id: 0,
      employer: this.formGroup.controls['employer'].value,
      city: this.formGroup.controls['city'].value,
      from: new Date(this.formGroup.controls['from'].value),
      to: null,
      sector: null,
      activities: this.activities
    };

    if (this.editing > 0) {

    } else {

    }
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
        employer: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        from: new FormControl(Formats.today(), CustomValidators.isValidDate),
        to: new FormControl(''),
        sector: new FormControl(this.sectors[0].id, Validators.required)
      }
    );
    this.activities = [];
    this.currentJob = false;
    this.editing = 0;
  }

  public addActivity(activity: string): void {
    if(activity.length > 0) this.activities.push({id: null, activity: activity});
    this.activityField.nativeElement.value = '';
  }

  public removeActivity(activity: ActivityModel): void {
    this.activities = this.activities.filter((value, index) => this.activities.findIndex(item => item.id == activity.id) !== index);
  }

  public getDate(date: string): string {
    return Formats.formatDate(date);
  }

  public dateToForm(date: string): string {
    return Formats.dateToForm(date);
  }

  public toggleDateTo(): void {
    if(this.currentJob) {
      this.currentJob = false;
      this.formGroup.controls['to'].validator = CustomValidators.isValidDate;
      this.formGroup.controls['to'].updateValueAndValidity();
    } else {
      this.currentJob = true;
      this.formGroup.controls['to'].setValue('');
      this.formGroup.controls['to'].clearValidators();
      this.formGroup.controls['to'].updateValueAndValidity();
    }
  }
}
