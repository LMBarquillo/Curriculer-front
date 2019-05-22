import {Injectable} from '@angular/core';
import {AuthHttpService} from './auth-http.service';
import {Observable} from 'rxjs/Observable';
import {TrainingModel} from '../models/training.model';
import {EP_TRAININGS} from '../utiles/constants.interface';

@Injectable()
export class TrainingsService {

  constructor(private http: AuthHttpService) { }

  public getTrainings(): Observable<TrainingModel[]> {
    return this.http.get(EP_TRAININGS);
  }

  public insertTraining(model: TrainingModel): Observable<TrainingModel> {
    return this.http.post(EP_TRAININGS, model);
  }

  public updateTraining(model: TrainingModel): Observable<TrainingModel> {
    return this.http.put(EP_TRAININGS, model);
  }

  public deleteTraining(id: number): Observable<number> {
    return this.http.delete(EP_TRAININGS + '/' + id);
  }

}
