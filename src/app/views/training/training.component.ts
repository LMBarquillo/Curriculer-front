import {Component, OnInit} from '@angular/core';
import {TrainingsService} from '../../services/trainings.service';
import {TrainingModel} from '../../models/training.model';
import {Swal} from '../../utiles/swal.utils';
import {Utilities} from '../../utiles/utilities.utils';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  public trainings: TrainingModel[] = [];

  constructor(private trainingService: TrainingsService) { }

  ngOnInit() {
    Swal.buildSwallWithoutButtons('Cargando', 'Obteniendo datos. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    this.trainingService.getTrainings().subscribe(
      trainings => {
        this.trainings = trainings.sort((a, b) => Utilities.compare(a.promotion, b.promotion, true));
        Swal.close();
      }, err => {
        console.log(err);
        Swal.buildSwalWithoutCancel('Error', 'No se pudo obtener la formación del usuario.', 'error');
      }
    );
  }

}
